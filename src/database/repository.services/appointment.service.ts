import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { ApiError } from "../../common/api.error";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjsBusinessDays from 'dayjs-business-days2';

 ///////////////////////////////////////////////////////////////////////////

dayjs.extend(isSameOrBefore);
dayjs.extend(updateLocale);
dayjs.extend(dayjsBusinessDays);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class AppointmentService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:AppointmentService=null;
    public static getInstance():AppointmentService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record=await this.prisma.appointments.create({data:createModel});
            console.log(record);
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to book an appointment!',error)
        }
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.appointments.findUnique({where : {id : id}
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }
    };

    findAvailableSlots = async (filters, businessId , businessNodeId, businessServiceId, businessUserId) => {
        var business = await this.prisma.businesses.findUnique({where : { id : businessId}});
        if (business == null) {
            throw new ApiError('Invalid business id!', 400);
        }
        var node = await this.prisma.business_nodes.findUnique({where : { id : businessNodeId}});
        if (node == null) {
            throw new ApiError('Invalid business node id!', 400);
        }
        var businessService = await this.prisma.business_services.findUnique({where : { id : businessServiceId}});
        if (businessService == null) {
            throw new ApiError('Invalid business service id!', 400);
        }
        var nodeHours = await this.prisma.business_node_hours.findMany({where : { BusinessNodeId : businessNodeId}});
        if (nodeHours.length == 0) {
            throw new ApiError('Working hours are not specified for the business!', 400);
        }
        var numDaysForSlots = await this.parseDurationInDays(node.AllowFutureBookingFor)
        var timeZone = node.TimeZone;

        var startDate = dayjs.utc().startOf('day')
        if(filters.FromDate != null) {
            var dt = new Date(filters.FromDate)
            startDate = dayjs.utc(dt).startOf('day')
        }
        var maxAllowable = dayjs.utc().startOf('day').add(numDaysForSlots, 'days')
        var endDate = dayjs.utc().startOf('day').add(7, 'days')
        if(filters.ToDate != null) {
            var dt = new Date(filters.ToDate)
            endDate = dayjs.utc(dt).startOf("day")
            if(endDate.isAfter(maxAllowable)) {
                endDate = maxAllowable;
            }
        }
        var slots = [];
        if(filters.BusinessUserId != null) {
            var userHours = [];
            var user = await this.prisma.business_users.findUnique({ where : { id : businessUserId }});
            if(user == null) {
                throw new ApiError('Invalid business user id!', 400);
            }
            userHours = await this.prisma.business_user_hours.findMany({where : { BusinessUserId : businessUserId}});
            if(userHours.length == 0){
                throw new Error('Working hours are not specified for the business!');
            }
            var availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, businessUserId, business, businessNodeId)
            var userSlots = await this.transform(timeZone, availableSlotsByDate);
            var obj = {
                User           : user,
                AvailableSlots : userSlots
            }
            slots.push(obj);
        }
        else {
            //User is not specified, check all users performing this service
            var userServices = await this.prisma.business_user_services.findMany({where : { BusinessServiceId : businessServiceId}});
            if(userServices.length == 0){
                //Users for this service are not found, calculate slots based on only node hours
                var userHours = [];
                var availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, null, business, businessNodeId)
                slots = await this.transform(timeZone, availableSlotsByDate);
            }
            else {
                for await(var s of userServices) 
                {
                    businessUserId = s.BusinessUserId;
                    var userHours = [];
                    var user = await this.prisma.business_users.findUnique({where : {id : businessUserId}});
                    if (user == null)
                    {
                        throw new ApiError('Invalid business user id!', 400);
                    }
                    userHours = await this.prisma.business_user_hours.findMany({where : { BusinessUserId : businessUserId}});
                    if(userHours.length == 0){
                        throw new Error('Working hours are not specified for the business!');
                    }
                    var availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, businessUserId, businessService, businessNodeId)
                    const userSlots = await this.transform(timeZone, availableSlotsByDate);
                    const obj = {
                        User            : user,
                        AvailableSlots  : userSlots
                    }
                    slots.push(obj);
                }
            }
        }
        return slots;
    };

    parseDurationInDays = async(str : string) => {
        var durationInDays = 0;
        var tokens = str.toLowerCase().split(":");
        for (var i = 0; i < tokens.length; i++) {
    
            var x = tokens[i];
            if (x.includes("d")) {
                x = x.replace("d", "");
                var days = parseInt(x);
                durationInDays += (days * 24);
            }
            if (x.includes("w")) {
                x = x.replace("w", "");
                var weeks = parseInt(x);
                durationInDays += (weeks * 24 * 7);
            }
        }
        return durationInDays;
    };

   
    findSlotAvailability = async (timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, businessUserId, businessService, businessNodeId) => {
        var holidays = [];
        var businessHolidays = await this.getHolidays(nodeHours, numDaysForSlots);
        var userHolidays = await this.getHolidays(userHours, numDaysForSlots);
        holidays.push(...businessHolidays)
        holidays.push(...userHolidays)

        var weeklyWorkDays = await this.getWorkingWeekDays(nodeHours, businessUserId, userHours);
        dayjs.updateLocale('us', {
            holidays        : holidays,
            holidayFormat   : 'DD-MM-YYYY',
            workingWeekDays : weeklyWorkDays
        })
        var slotDuration = await this.parseDurationInMin(businessService.ServiceDuration);
        var priorBookingWindowMin = await this.parseDurationInMin(businessService.ServiceDuration);
        var slotsByDate = await this.getAllSlots(timeZone, startDate, endDate, slotDuration, priorBookingWindowMin, nodeHours, businessUserId, userHours);
        var availableSlotsByDate = await this.getAvailableSlots(timeZone, slotsByDate, businessNodeId, businessUserId, businessService.id, numDaysForSlots);
        return availableSlotsByDate;
    };

    getHolidays = async (workHours, numDayForSlots) => {
        var uptoDate = dayjs().add(numDayForSlots, 'days')
        var holidays = [];
        for(var i = 0; i < workHours.length; i++)
        {
            var nd = workHours[i];
            if(nd.Type != "WEEKDAY" && nd.Type != "WEEKEND") {
                if(nd.Date != null && nd.IsOpen == false) {
                    //No working hours and defined by date-not by day
                    var date = dayjs(nd.Date);
                    if(date.isSameOrBefore(uptoDate)) {
                        var dateStr = date.format("DD-MM-YYYY");
                        holidays.push(dateStr);
                    }
                }
            }
        }
        return holidays;
    };

    getWorkingWeekDays = async (nodeHours, businessUserId, userHours) => {
        var weeklyWorkDays = [];
        var businessWeekDays = await this.getWeekDays(nodeHours);

        if(businessUserId != null) {
            var userWeekDays = await this.getWeekDays(userHours);
            for(var i = 0; i < userWeekDays.length; i++)
            {
                var x = userWeekDays[i];
                if ((businessWeekDays).includes(x)) {
                    weeklyWorkDays.push(userWeekDays[i]);
                }
            }
        }
        else {
            weeklyWorkDays = businessWeekDays;
        }
        return weeklyWorkDays;
    };

    parseDurationInMin = async(str : string) => {
        var durationMin = 0;
        var tokens = str.toLowerCase().split(":");
        for (var i = 0; i < tokens.length; i++) {
    
            var x = tokens[i];
            if (x.includes("m")) {
                x = x.replace("m", "");
                var minutes = parseInt(x);
                durationMin += minutes;
            }
            if (x.includes("h")) {
                x = x.replace("h", "");
                var hours = parseInt(x);
                durationMin += (hours * 60);

            }
            if (x.includes("d")) {
                x = x.replace("d", "");
                var days = parseInt(x);
                durationMin += (days * 60 * 24);
            }
            if (x.includes("h")) {
                x = x.replace("h", "");
                var weeks = parseInt(x);
                durationMin += (weeks * 60 * 24 * 7);
            }
        }
        return durationMin;
    };

    getAllSlots =  async (timeZone, startDate, endDate, slotDuration, priorBookingWindowMin, nodeHours, businessUserId, userHours) => {

        var nodeWorkingDays = new Map()

        for (var j = 0; j < nodeHours.length; j++)
        {
            var nh = nodeHours[j];
            if (nh.Date == null) {
                nodeWorkingDays.set(nh.Day, {
                    startTime : nh.StartTime,
                    endDate   : nh.EndTime,
                    IsOpen    : nh.IsOpen
                })
            }
        }
        var nodeSlotsByDate = [];
        var numberOfDays = 0
        var currMoment = startDate.clone().utc();

        var spanStart = startDate.clone().utc();
        var spanEnd = endDate.clone().utc();

        if(spanStart.startOf("Day").isSame(spanEnd)) {
            numberOfDays = 1
        }
        else {
            var a = currMoment.clone();
            var b = spanEnd.clone();
            var diff = b.businessDiff(a);
            numberOfDays = Math.ceil(diff) + 1;
        }
        var { offsetHours, offsetMinutes } = await this.getTimezoneOffsets(timeZone);
        for( var i = 0; i < numberOfDays; i++) 
        {
            if(currMoment.isBusinessDay()) {
                var currentDay = currMoment.day()
                var wd = nodeWorkingDays.get(currentDay);
                var startTime = wd.StartTime;
                var endTime = wd.EndTime;

                var currDayStart = currMoment.clone().startOf("day").utc();

                var startTokens = startTime.split(":");
                var startHours = parseInt(startTokens[0]);
                var startMinutes = parseInt(startTokens[1]);
                var endTokens = endTime.split(":")
                var endHours = parseInt(endTokens[0]);
                var endMinutes = parseInt(endTokens[1]);

                var start = currDayStart.clone().utc().add(startHours, 'hours').add(startMinutes, 'minutes');
                var end = currDayStart.colne().utc().add(endHours, 'hours').add(endMinutes, 'minutes');

                nodeSlotsByDate.push({
                    CurrentMoment   : currDayStart.clone(),
                    Date            : currDayStart.clone().format(),
                    WeekDay         : currDayStart.clone().day(),
                    dayStartTime    : start.add(offsetHours, 'hours').add(offsetMinutes, 'minutes'),
                    dayEndTime      : end.add(offsetHours, 'hours').add(offsetMinutes, 'minutes'),
                    slots           : await this.calculateSlots(timeZone, currDayStart.clone(), startTime, endTime, slotDuration, priorBookingWindowMin)
                });
            }
            currMoment = currMoment.nextBusinessDay().startOf("day")
        }
        var slotsByDate = nodeSlotsByDate;
        //Filter the slots bsed on user's hours
        if(businessUserId != null) {
            var userWorkingDays = new Map()

            for (var j = 0; j < userHours.length; j++)
            {
                var uh = userHours[j];
                if (uh.Date != null) {
                    continue;
                }
                userWorkingDays.set(uh.Day, {
                    startTime : uh.StartTime,
                    endDate   : uh.EndTime,
                    IsOpen    : uh.IsOpen
                })
            }
            var userSlotsByDate = [];
            for(var k = 0; k < nodeSlotsByDate.length; k++) 
            {
                var nodeSlot = nodeSlotsByDate[k];
                var weekDay = nodeSlot.weekDay;
                var userCurrentDayStart = nodeSlot.currentMoment.clone().startOf("day").utc();
                var userSlotsForDay = [];

                if(userWorkingDays.has(weekDay)) {
                    var userWorkingDay = userWorkingDays.get(weekDay);
                    if(userWorkingDay.IsOpen) {
                        var startTime = userWorkingDay.StartTime;
                        var EndTime = userWorkingDay.EndTime;
                        
                        var startTokens = startTime.split(":");
                        var startHours = parseInt(startTokens[0]);
                        var startMinutes = parseInt(startTokens[1]);
                        var endTokens = endTime.split(":")
                        var endHours = parseInt(endTokens[0]);
                        var endMinutes = parseInt(endTokens[1]);

                        var start = currDayStart.clone().utc().add(startHours, 'hours').add(startMinutes, 'minutes');
                        var end = currDayStart.colne().utc().add(endHours, 'hours').add(endMinutes, 'minutes');

                        for (var p = 0; p < nodeSlot.slots.length; p++) {
                            var s = nodeSlot.slots[p];

                            if(s.slotStart.isSameOrAfter(start) && s.slotEnd.isSameOrBefore(end)) {
                                userSlotsForDay.push(s);
                            }
                        }
                        var userSlot = {
                            CurrentMoment   : userCurrentDayStart.clone(),
                            Date            : userCurrentDayStart.clone().format(),
                            WeekDay         : userCurrentDayStart.clone().day(),
                            dayStartTime    : null,
                            dayEndTime      : null,
                            userOffDay      : true,
                            slots           : []
                        }
                        userSlotsByDate.push()
                    }
                }
            }
            slotsByDate = userSlotsByDate;
        }
        return slotsByDate;
    };    

    getAvailableSlots = async (timeZone, slotsByDate, businessNodeId, businessUserId, businessServiceId, numDaysForSlots:number) => {
        var endDate = dayjs.utc().businessDaysAdd(numDaysForSlots);
        var appointments = await this.prisma.appointments.findMany({
            where : {
                BusinessNodeId      : businessNodeId,
                BusinessUserId      : businessUserId,
                BusinessServiceId   : businessServiceId,
                StartTime           : {
                    gte : dayjs.utc().toDate()
                },
                EndTime             : {
                    lte : dayjs.utc(endDate).toDate()
                },
                IsCancelled         : false,
                IsActive            : true
            },
        });

        for (var j = 0; j < slotsByDate.length; j++) {
            var sd = slotsByDate[j];
            var slotDay = sd.currentMoment;

            for(var i = 0; i < appointments.length; i++) {
                var appointment = appointments[i];
                var appointmentDay = dayjs.utc(appointment.StartTime).startOf("day");
                if(!appointmentDay.isSame(slotDay)) {
                    continue;
                }
                var start = dayjs.utc(appointment.StartTime);
                var end = dayjs.utc(appointment.EndTime)

                for(var k = 0; k < sd.slots.length; k++) 
                {
                    var slotStart = sd.slots[k].slotStart;
                    var slotEnd = sd.slots[k].slotEnd;

                    if(start.isSame(slotStart) && end.isSame(slotEnd)) {
                        slotsByDate[j].slots[k].available = false;
                    }
                }
            }
        }
        return slotsByDate;
    };

    calculateSlots = async (timeZone, dateMoment, startTime, endTime, timeSlotDurationMin, priorBookingWindowMinutes) => {
        var { offsetHours, offsetMinutes } = await this.getTimezoneOffsets(timeZone);
        //Filter the slots based on prior booking window (defined in minutes)
        var bookingWindowMoment = dayjs.utc().add(priorBookingWindowMinutes, 'minutes');
        var slots = [];
        var startTokens = startTime.split(":");
        var startHours = parseInt(startTokens[0]);
        var startMinutes = parseInt(startTokens[1]);
        var endTokens = endTime.split(":")
        var endHours = parseInt(endTokens[0]);
        var endMinutes = parseInt(endTokens[1]);

        var start = dateMoment.clone().utc().add({ hours : startHours, minutes : startMinutes }).add(offsetHours, 'hours').add(offsetMinutes, 'minutes');
        var end = dateMoment.colne().utc().add({ hours : endHours, minutes : endMinutes }).add(offsetHours, 'hours').add(offsetMinutes, 'minutes');

        var slotStart = start.clone();
        var slotEnd = start.clone().add(timeSlotDurationMin, 'minutes');
        while(slotEnd.isSameOrBefore(end)) {
            var available = true;
            if(slotStart.isBefore(bookingWindowMoment)) {
                available = false;
            }
            slots.push({
                SlotStart   : slotStart,
                SlotEnd     : slotEnd,
                Available   : available
            });
            slotStart = slotEnd.clone();
            slotEnd = slotStart.clone().add(timeSlotDurationMin, 'minutes');
        }
        return slots;
    }

    getTimezoneOffsets = async (timeZone) => {
        var offset = timeZone;
        if (timeZone.includes('+')) {
            offset = offset.replace('+', '-');
        }
        else if(!timeZone.includes('-')) {
            offset = offset.replace(' ', '')
            offset = '-' + offset;
        }
        else if (timeZone.includes('-')) {
            offset = offset.replace('-', '+');
        }
        if(timeZone.includes(':')){
            var tokens = offset.split(":");
            var offsetHours = parseInt(tokens[0]);
            var offsetMinutes = parseInt(tokens[1]);
            if(offsetHours < 0) {
                offsetMinutes = -1 * offsetMinutes;
            }
            return { offsetHours, offsetMinutes }
        }
        else {
            var len = offset.length;
            var min = offset.substring(len-2, len);
            var hr = offset.substring(0, len-2);
            var offsetHours = parseInt(hr);
            var offsetMinutes = parseInt(min);
            if(offsetHours < 0) {
                offsetMinutes = -1 * offsetMinutes;
            }
            return { offsetHours , offsetMinutes }
        }
    };

    transform = async (timeZone, slotsByDate) => {
        var slots = [];
        for(var i = 0; i < slotsByDate.length; i++) {
            var temp = slotsByDate[i];
            
            var daySlots = [];
            for(var j = 0; j < temp.slots.length; j++) {
                daySlots.push({
                    slotStart : dayjs.utc(temp.slots[j].slotStart).format(),
                    slotEnd : dayjs.utc(temp.slots[j].slotEnd).format(),
                    available : temp.slots[j].available
                })
            }
            var s = {
                Date         : temp.currentMoment.utc().format("YYYY-MM-DD"),
                WeekDayId    : temp.currentMoment.utc().day(),
                WeekDay      : temp.currentMoment.utc().format("dddd"),
                DayStartTime : temp.dayStartTime,
                DayEndTime   : temp.dayEndTime,
                slots        : daySlots
            }
            slots.push(s);
        }
        return slots;
    };

    getWeekDays = async (workHours) => {
        var weekDays = [];
        for (var j = 0; j < workHours.length; j++) {
            var wh = workHours[j];
            if (wh.IsOpen && wh.Date == null && wh.IsActive) {
                weekDays.push(workHours[j].Day);
            }
        }
        return weekDays;
    };

    getByDisplayId = async (Displayid) => {
        try {
            var record = await this.prisma.appointments.findUnique({where : {id : Displayid}
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }
    };
}