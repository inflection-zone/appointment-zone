import { ApiError } from "../../common/api.error";
import { AppointmentService } from "../../database/repository.services/appointment.service";
//import { AppointmentCreateModel, AppointmentDto, AppointmentSearchFilters, AppointmentSearchResults, AppointmentUpdateModel } from "../../domain.types/appointment/appointment.domain.types";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { BusinessService } from "../../database/repository.services/business.service";
import { BusinessServiceService } from "../../database/repository.services/business.service.service";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { ErrorHandler } from '../../common/error.handler';
import { TimeHelper as th} from '../../common/time.helper';
import { DurationType } from '../../domain.types/miscellaneous/time.types';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { CustomerService } from "../../database/repository.services/customer.service";
import { AppointmentValidator as validator} from "./appointment.validator";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { FindAvailableSlotsSearchFilters } from "../../domain.types/appointment/available.slot.search.filter";
import { BusinessNodeHourDto } from "../../domain.types/business.node.hour/business.node.hour.domain.types";
import { BusinessUserHourDto } from "../../domain.types/business/business.user.hour.domain.types";


dayjs.extend(utc);

export class AppointmentControllerDelegate {
    //#region member variables and constructors

    _service : AppointmentService = null;

    _businessService : BusinessService = null;

    _businessNodeService : BusinessNodeService = null;

    _businessServiceService : BusinessServiceService = null;

    _businessNodeHourService : BusinessNodeHourService = null;

    _businessUserService : BusinessUserService = null;

    _customerService : CustomerService = null;

    prisma = PrismaClientInit.instance().prisma();

    constructor() {
        this._service = new AppointmentService();
        this._businessService = new BusinessService();
        this._businessNodeService = new BusinessNodeService();
        this._businessServiceService = new BusinessServiceService();
        this._businessNodeHourService = new BusinessNodeHourService();
        this._businessUserService = new BusinessUserService();
        this._customerService = new CustomerService();
    }

    findAvailableSlots = async (query , businessId : uuid, businessNodeId : uuid, businessServiceId : uuid) => {
        await validator.validateSearchRequest(query);
        var filters = this.getSearchFilters(query);
        var business = await this._businessService.getById(businessId);
        if (business == null) {
            ErrorHandler.throwNotFoundError('Invalid business id!');
        }
        var node = await this._businessNodeService.getById(businessNodeId);
        if (node == null) {
            ErrorHandler.throwNotFoundError('Invalid business node id!');
        }
        var businessService = await this._businessServiceService.getById(businessServiceId);
        if (businessService == null) {
            ErrorHandler.throwNotFoundError('Invalid business service id!');
        }
        var nodeHours = await this.prisma.business_node_hours.findMany({where : { BusinessNodeId : businessNodeId}});
        if (nodeHours.length == 0) {
            ErrorHandler.throwNotFoundError('Working hours are not specified for the business!');
        }
        var numDaysForSlots = th.parseDurationInDays(node.AllowFutureBookingFor)
        var timeZone = node.TimeZone;

        var startDate = th.getStartOfDayUtc(startDate);
        if(filters.FromDate != null) {
            var dt = new Date(filters.FromDate);
            startDate = th.getStartOfDayUtc(dt);
        }
        var maxAllowable =th.addDuration(startDate, numDaysForSlots, DurationType.Day)
        var endDate = th.addDuration(endDate, 7, DurationType.Day);
        if(filters.ToDate != null) {
            var dt = new Date(filters.ToDate);
            endDate = th.getStartOfDayUtc(dt);
            if(th.isAfter(endDate, maxAllowable)) {
                endDate = maxAllowable;
            }
        }
        var slots = [];
        var businessUserId = filters.BusinessUserId;
        if(businessUserId != null) {
            var userHours = [];
            var user = await this._businessUserService.getById(businessUserId);
            if(user == null) {
                ErrorHandler.throwNotFoundError('Invalid business node id!');
            }
            userHours = await this.prisma.business_user_hours.findMany({where : { BusinessUserId : businessUserId}});
            if(userHours.length == 0){
                ErrorHandler.throwNotFoundError('Working hours are not specified for the business!');
            }
            var availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, businessUserId, businessService, businessNodeId);
            var userSlots = this.transform(timeZone, availableSlotsByDate);
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
                var availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, null, businessService, businessNodeId)
                slots = this.transform(timeZone, availableSlotsByDate);
            }
            else {
                for await(var s of userServices) 
                {
                    businessUserId = s.BusinessUserId;
                    var userHours = [];
                    var user = await this._businessUserService.getById(businessUserId);
                    if (user == null)
                    {
                        ErrorHandler.throwNotFoundError('Invalid business user id!');
                    }
                    userHours = await this.prisma.business_user_hours.findMany({where : { BusinessUserId : businessUserId}});
                    if(userHours.length == 0){
                        throw new Error('Working hours are not specified for the business!');
                    }
                    var availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, businessUserId, businessService, businessNodeId)
                    const userSlots = this.transform(timeZone, availableSlotsByDate);
                    const obj = {
                        User            : user,
                        AvailableSlots  : userSlots
                    }
                    slots.push(obj);
                }
            }
        }
        var searchResults = await this._service.findAvailableSlots(filters, businessId, businessNodeId, businessServiceId);
       // return searchResults;
        return slots;

    };

    findAvailableSlotsForUser = async (query : any, businessUserId : uuid) => {
        await validator.validateSearchRequest(query);
        var filters = this.getSearchFilters(query);
        var searchResults = await this._service.findAvailableSlotsForUser(filters, businessUserId);
        return searchResults;
    };

    getSearchFilters = (query) => {

        var filters : FindAvailableSlotsSearchFilters = {};

        var fromDate = query.fromDate != 'undefined' ? query.fromDate : null;
        if (fromDate != null) {
            filters['FromDate'] = fromDate;
        }
        var toDate = query.toDate != 'undefined' ? query.toDate : null;
        if (toDate != null) {
            filters['ToDate'] = toDate;
        }
        var businessUserId = query.businessUserId != 'undefined' ? query.businessUserId : null;
        if (businessUserId != null) {
            filters['BusinessUserId'] = businessUserId;
        }
        return filters;
    };

    findSlotAvailability = async (timeZone: string, numDaysForSlots: number, startDate: Date, endDate: Date, nodeHours: BusinessNodeHourDto[], userHours:BusinessUserHourDto[], businessUserId: uuid, businessService, businessNodeId) => {
        var holidays = [];
        var businessHolidays = this.getHolidays(nodeHours, numDaysForSlots);
        var userHolidays = this.getHolidays(userHours, numDaysForSlots);
        holidays.push(...businessHolidays)
        holidays.push(...userHolidays)

        var weeklyWorkDays = this.getWorkingWeekDays(nodeHours, businessUserId, userHours);
        dayjs.updateLocale('us', {
            holidays        : holidays,
            holidayFormat   : 'DD-MM-YYYY',
            workingWeekDays : weeklyWorkDays
        })
        var slotDuration = th.parseDurationInMin(businessService.ServiceDuration);
        var priorBookingWindowMin = th.parseDurationInMin(businessService.PriorBookingWindow);
        var slotsByDate = this.getAllSlots(timeZone, startDate, endDate, slotDuration, priorBookingWindowMin, nodeHours, businessUserId, userHours);
        var availableSlotsByDate = await this._service.getAvailableSlots(timeZone, slotsByDate, businessNodeId, businessUserId, businessService.id, numDaysForSlots);
        return availableSlotsByDate;
    };

    transform = (timeZone: string, slotsByDate) => {
        var slots = [];
        for(var i = 0; i < slotsByDate.length; i++) {
            var temp = slotsByDate[i];
            var daySlots = [];
            for(var j = 0; j < temp.Slots.length; j++) {
                daySlots.push({
                    slotStart   : th.format(temp.Slots[j].slotStart, 'DD/MM/YYYY'), //dayjs.utc(temp.Slots[j].slotStart).format(),
                    slotEnd     : th.format(temp.Slots[j].slotEnd, 'DD/MM/YYYY'), //dayjs.utc(temp.Slots[j].slotEnd).format(),
                    available   : temp.Slots[j].available
                })
            }
            var s = {
                Date         : th.format(temp.CurrentMoment, 'YYYY-MM-DD'), // temp.CurrentMoment.utc().format("YYYY-MM-DD"),
                WeekDayId    : th.utcDay(temp.CurrentMoment),  //temp.CurrentMoment.utc().day(),
                WeekDay      : th.format(temp.CurrentMoment, 'dddd'),  //temp.CurrentMoment.utc().format("dddd"),
                DayStartTime : temp.DayStartTime,
                DayEndTime   : temp.DayEndTime,
                Slots        : daySlots
            }
            slots.push(s);
        }
        return slots;
    };

    getHolidays = (workHours, numDayForSlots) => {
        var date: Date = new Date();
        var uptoDate = th.addDuration(date, numDayForSlots, DurationType.Day)
       // var uptoDate = dayjs().add(numDayForSlots, 'days')
        var holidays = [];
        for(var i = 0; i < workHours.length; i++)
        {
            var nd = workHours[i];
            if(nd.Type != "WEEKDAY" && nd.Type != "WEEKEND") {
                //It is a special day / holiday
                if(nd.Date != null && nd.IsOpen == false) {
                    //No working hours and defined by date-not by day
                    //var date = dayjs(nd.Date);
                    var date = new Date(nd.Date);
                    if(th.isSameOrBefore(date, uptoDate)) {
                        var dateStr = th.format(date, 'DD-MM-YYYY');
                        holidays.push(dateStr);
                    }
                }
            }
        }
    return holidays;
    };

    getWorkingWeekDays = (nodeHours: BusinessNodeHourDto[], businessUserId, userHours: BusinessUserHourDto[]) => {
        var weeklyWorkDays = [];
        var businessWeekDays = this.getWeekDays(nodeHours);

        if(businessUserId != null) {
            var userWeekDays = this.getWeekDays(userHours);
            for(var i = 0; i < userWeekDays.length; i++)
            {
                var x = userWeekDays[i];
                if (businessWeekDays.includes(x)) {
                    weeklyWorkDays.push(userWeekDays[i]);
                }
            }
        }
        else {
            weeklyWorkDays = businessWeekDays;
        }
        return weeklyWorkDays;
    };

    getWeekDays = (workHours) => {
        var weekDays = [];
        for (var j = 0; j < workHours.length; j++) {
            var wh = workHours[j];
            if (wh.IsOpen && wh.Date == null && wh.IsActive) {
                weekDays.push(workHours[j].Day);
            }
        }
        return weekDays;
    };

    getAllSlots = (timeZone: string, startDate: Date, endDate: Date, slotDuration: number, priorBookingWindowMin: number, nodeHours: BusinessNodeHourDto[], businessUserId: uuid, userHours: BusinessUserHourDto[]) => {

        var nodeWorkingDays = new Map()

        for (var j = 0; j < nodeHours.length; j++)
        {
            var nh = nodeHours[j];
            if (nh.Date == null) {
                nodeWorkingDays.set(nh.Day, {
                    startTime : nh.StartTime,
                    endTime   : nh.EndTime,
                    IsOpen    : nh.IsOpen
                })
            }
        }
        var nodeSlotsByDate = [];
        var numberOfDays = 0;
        // var sd = dayjs(startDate);
        // var currMoment = sd.clone().utc();
        var currMoment = th.cloneWithUtc(startDate);
        var spanStart = th.cloneWithUtc(startDate);
        var spanEnd = th.cloneWithUtc(endDate);
        
        // var currMoment = startDate.clone().utc();
        // var spanStart = startDate.clone().utc();
        // var spanEnd = endDate.clone().utc();

        if(th.isSame(th.startOf(spanStart, DurationType.Day), spanEnd)){
        // if(spanStart.startOf('day').isSame(spanEnd)) {
            numberOfDays = 1
        }
        else {
            var a = th.clone(currMoment);
            var b = th.clone(spanEnd);
            // var a = currMoment.clone();
            // var b = spanEnd.clone();
            var diff = th.dateDifference(a, b);
            numberOfDays = Math.ceil(diff) + 1;
        }
        var { offsetHours, offsetMinutes } = th.getTimezoneOffsets(timeZone);
        for( var i = 0; i < numberOfDays; i++) 
        {
            if(th.isBusinessDay(currMoment)) {
                var currentDay = th.day(currMoment);
                var wd = nodeWorkingDays.get(currentDay);
                var startTime = wd.startTime;
                var endTime = wd.endTime;

                var currDayStart = th.getStartOfDayUtc(th.clone(currMoment));
               // var currDayStart = currMoment.clone().startOf('day').utc();
                var startTokens = startTime.split(":");
                var startHours = parseInt(startTokens[0]);
                var startMinutes = parseInt(startTokens[1]);
                var endTokens = endTime.split(":")
                var endHours = parseInt(endTokens[0]);
                var endMinutes = parseInt(endTokens[1]);

                var start = th.addDuration((th.addDuration(th.cloneWithUtc(currDayStart), startHours, DurationType.Hour)), startMinutes, DurationType.Minute);
                var end = th.addDuration((th.addDuration(th.cloneWithUtc(currDayStart), endHours, DurationType.Hour)), endMinutes, DurationType.Minute);

                // var start = currDayStart.clone().utc().add(startHours, 'hours').add(startMinutes, 'minutes');
                // var end = currDayStart.clone().utc().add(endHours, 'hours').add(endMinutes, 'minutes');
                
                nodeSlotsByDate.push({
                    CurrentMoment   : th.clone(currDayStart),           //currDayStart.clone(),
                    Date            : th.cloneFormat(currDayStart),  //currDayStart.clone().format(),
                    WeekDay         : th.day(th.clone(currDayStart)),     //currDayStart.clone().day(),
                    DayStartTime    : th.addDuration((th.addDuration(start, offsetHours, DurationType.Hour)), offsetMinutes, DurationType.Minute),        // start.add(offsetHours, 'hours').add(offsetMinutes, 'minutes'),
                    DayEndTime      : th.addDuration((th.addDuration(end, offsetHours, DurationType.Hour)), offsetMinutes, DurationType.Minute),        //end.add(offsetHours, 'hours').add(offsetMinutes, 'minutes'),
                    Slots           : this.calculateSlots(timeZone, th.clone(currDayStart), startTime, endTime, slotDuration, priorBookingWindowMin),
                    // Slots           : this.calculateSlots(timeZone, currDayStart.clone(), startTime, endTime, slotDuration, priorBookingWindowMin)
                });
            }
            currMoment = th.nextBusinessDay(currMoment);
        }
        var slotsByDate = nodeSlotsByDate;
        //Filter the slots based on user's hours
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
                    endTime   : uh.EndTime,
                    IsOpen    : uh.IsOpen
                })
            }
            var userSlotsByDate = [];
            for(var k = 0; k < nodeSlotsByDate.length; k++) 
            {
                var nodeSlot = nodeSlotsByDate[k];
                var weekDay = nodeSlot.WeekDay;
                var cm = nodeSlot.CurrentMoment;
                var userCurrentDayStart = th.getStartOfDayUtc(th.clone(cm));
                //var userCurrentDayStart = nodeSlot.CurrentMoment.clone().startOf('day').utc();
                var userSlotsForDay = [];

                if(userWorkingDays.has(weekDay)) {
                    var userWorkingDay = userWorkingDays.get(weekDay);
                    if(userWorkingDay.IsOpen) {
                        var startTime = userWorkingDay.startTime;
                        var endTime = userWorkingDay.endTime;
                        
                        var startTokens = startTime.split(":");
                        var startHours = parseInt(startTokens[0]);
                        var startMinutes = parseInt(startTokens[1]);
                        var endTokens = endTime.split(":")
                        var endHours = parseInt(endTokens[0]);
                        var endMinutes = parseInt(endTokens[1]);

                        var userCurrentDS = th.cloneWithUtc(userCurrentDayStart);
                        var startH = th.addDuration(userCurrentDS, startHours, DurationType.Hour);
                        var startM = th.addDuration(startH, startMinutes, DurationType.Minute);
                        var offsetH = th.addDuration(startM, offsetHours, DurationType.Hour);
                        var start = th.addDuration(offsetH, offsetMinutes, DurationType.Minute);
                        
                        //var start = th.cloneWithUtc(userCurrentDayStart).add(startHours, 'hours').add(startMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes,'minutes');
                        var end = th.cloneWithUtc(userCurrentDayStart).add(endHours, 'hours').add(endMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes, 'minutes');
                        // var start = userCurrentDayStart.clone().utc().add(startHours, 'hours').add(startMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes,'minutes');
                        // var end = userCurrentDayStart.clone().utc().add(endHours, 'hours').add(endMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes, 'minutes');

                        for (var p = 0; p < nodeSlot.Slots.length; p++) {
                            var s = nodeSlot.Slots[p];
                            var slotS = s.slotStart;
                            var slotE = s.slotEnd;
                            if(th.isSameOrAfter(slotS, start) && th.isSameOrBefore(slotE, end)) {
                            //if(s.slotStart.isSameOrAfter(start) && s.slotEnd.isSameOrBefore(end)) {
                                userSlotsForDay.push(s);
                            }
                        }
                        var userSlot = {
                            CurrentMoment   : th.clone(userCurrentDayStart),
                            Date            : th.cloneFormat(userCurrentDayStart),
                            WeekDay         : th.day(th.clone(userCurrentDayStart)),
                            DayStartTime    : start,
                            DayEndTime      : end,
                            userOffDay      : false,
                            Slots           : userSlotsForDay
                        }
                        userSlotsByDate.push(userSlot);
                    }
                    else {
                        var userSlot = {
                            CurrentMoment   : th.clone(userCurrentDayStart),
                            Date            : th.cloneFormat(userCurrentDayStart),
                            WeekDay         : th.day(th.clone(userCurrentDayStart)),
                            DayStartTime    : null,
                            DayEndTime      : null,
                            userOffDay      : true,
                            Slots           : []
                        }
                        userSlotsByDate.push();
                    }
                }
            }
            slotsByDate = userSlotsByDate;
        }
        return slotsByDate;
    };    

    calculateSlots = (timeZone: string, dateMoment, startTime, endTime, timeSlotDurationMin, priorBookingWindowMin: number) => {
        var { offsetHours, offsetMinutes } = th.getTimezoneOffsets(timeZone);
        //Filter the slots based on prior booking window (defined in minutes)
        var bookingWindowMoment = th.addDuration(bookingWindowMoment, priorBookingWindowMin, DurationType.Minute); //dayjs.utc().add(priorBookingWindowMin, 'minutes');
        var slots = [];
        var startTokens = startTime.split(":");
        var startHours = parseInt(startTokens[0]);
        var startMinutes = parseInt(startTokens[1]);
        var endTokens = endTime.split(":")
        var endHours = parseInt(endTokens[0]);
        var endMinutes = parseInt(endTokens[1]);

        var start = th.cloneWithUtc(dateMoment).add(startHours, 'hours').add(startMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes, 'minutes');
        var end = th.cloneWithUtc(dateMoment).add(endHours, 'hours').add(endMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes, 'minutes');
        // var start = dateMoment.clone().utc().add(startHours, 'hours').add(startMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes, 'minutes');
        // var end = dateMoment.clone().utc().add(endHours, 'hours').add(endMinutes, 'minutes').add(offsetHours, 'hours').add(offsetMinutes, 'minutes');

        var slotStart = th.clone(start);
        var slotEnd = th.addDuration(th.clone(start), timeSlotDurationMin, DurationType.Minute);
        while(th.isSameOrBefore(slotEnd, end)) {
            var available = true;
            if(th.isBefore(slotStart, bookingWindowMoment)) {
                available = false;
            }
            slots.push({
                slotStart   : slotStart,
                slotEnd     : slotEnd,
                available   : available
            });
            slotStart = th.clone(slotEnd);
            slotEnd = th.addDuration(th.clone(slotStart), timeSlotDurationMin, DurationType.Minute);
            //slotStart = slotEnd.clone();
           // slotEnd = slotStart.clone().add(timeSlotDurationMin, 'minutes');
        }
        return slots;
    };

    getAppointmentObject = async (record) => {
        var user = await this._businessUserService.getById(record.BusinessUserId);
        var customer = await this._customerService.getById(record.CustomerId);
        var node = await this._businessNodeService.getById(record.BusinessNodeId);
        var businessService = await this._businessServiceService.getById(record.BusinessServiceId)
       
        return { 
            id                      : record.id,
            DisplayId               : record.DisplayId,
            BusinessNodeId          : record.BusinessNodeId,
            CustomerId              : record.CustomerId,
            BusinessUserId          : record.BusinessUserId,
            BusinessServiceId       : record.BusinessServiceId,
            BusinessNodeName        : node.Name,
            BusinessServiceName     : businessService.Name,
            BusinessUserName        : user.Prefix + ' ' + user.FirstName + ' '+ user.LastName,
            CustomerName            : customer.Prefix + ' ' + customer.FirstName + ' ' + customer.LastName,
            CustomerDob             : customer.BirthDate,
            CustomerGender          : customer.Gender,
            CustomerDisplayPicture  : customer.DisplayPicture,
            Date                    : dayjs(record.Date).local().format("YYYY-MM--DD"),
            StartTime               : dayjs(record.StartTime).local().format("HH:mm:ss"),
            EndTime                 : dayjs(record.EndTime).local().format("HH:mm:ss"),
            StartTimeUtc            : record.StartTimeUtc,
            EndTimeUtc              : record.EndTimeUtc,
            Type                    : record.Type,
            Note                    : record.Note,
            Status                  : record.Status,
            StatusCode              : record.StatusCode,
            Fees                    : record.Fees,
            Tax                     : record.Tax,
            Tip                     : record.Tip,
            Discount                : record.Discount,
            CouponCode              : record.CouponCode,
            Total                   : record.Total,
            IsPaid                  : record.IsPaid,
            TransactionId           : record.TransactionId,
        }
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return { 
        }
    };

           
}