import { ApiError } from "../../common/api.error";
import { AppointmentService } from "../../database/repository.services/appointment.service";
//import { AppointmentCreateModel, AppointmentDto, AppointmentSearchFilters, AppointmentSearchResults, AppointmentUpdateModel } from "../../domain.types/appointment/appointment.domain.types";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { BusinessService } from "../../database/repository.services/business.service";
import { BusinessServiceService } from "../../database/repository.services/business.service.service";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { ErrorHandler } from "../../common/error.handler";
import { TimeHelper as th } from "../../common/time.helper";
import { DurationType } from "../../domain.types/miscellaneous/time.types";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { CustomerService } from "../../database/repository.services/customer.service";
import { AppointmentValidator as validator } from "./appointment.validator";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { FindAvailableSlotsSearchFilters } from "../../domain.types/appointment/available.slot.search.filter";
import { BusinessNodeHourDto } from "../../domain.types/business.node.hour/business.node.hour.domain.types";
import { BusinessUserHourDto } from "../../domain.types/business/business.user.hour.domain.types";
import { BusinessServiceDto } from "../../domain.types/business/business.service.domain.types";

dayjs.extend(utc);

export class AppointmentControllerDelegate {
  //#region member variables and constructors

  _service: AppointmentService = null;

  _businessService: BusinessService = null;

  _businessNodeService: BusinessNodeService = null;

  _businessServiceService: BusinessServiceService = null;

  _businessNodeHourService: BusinessNodeHourService = null;

  _businessUserService: BusinessUserService = null;

  _customerService: CustomerService = null;

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

  findAvailableSlots = async (
    query,
    businessId: uuid,
    businessNodeId: uuid,
    businessServiceId: uuid
  ) => {
    await validator.validateSearchRequest(query);
    const filters = this.getSearchFilters(query);
    const business = await this._businessService.getById(businessId);
    if (business == null) {
      ErrorHandler.throwNotFoundError("Invalid business id!");
    }
    const node = await this._businessNodeService.getById(businessNodeId);
    if (node == null) {
      ErrorHandler.throwNotFoundError("Invalid business node id!");
    }
    const businessService = await this._businessServiceService.getById(
      businessServiceId
    );
    if (businessService == null) {
      ErrorHandler.throwNotFoundError("Invalid business service id!");
    }
    const nodeHours = await this.prisma.business_node_hours.findMany({
      where: { BusinessNodeId: businessNodeId },
    });
    if (nodeHours.length == 0) {
      ErrorHandler.throwNotFoundError(
        "Working hours are not specified for the business!"
      );
    }
    const numDaysForSlots = th.parseDurationInDays(node.AllowFutureBookingFor);
    const timeZone = node.TimeZone;

    const currrentDate = new Date();
    let startDate = th.getStartOfDayUtc(currrentDate);
    if (filters.FromDate != null) {
      var dt = new Date(filters.FromDate);
      startDate = th.getStartOfDayUtc(dt);
    }
    let maxAllowable = th.addDuration(
      startDate,
      numDaysForSlots,
      DurationType.Day
    );
    let endDate = th.addDuration(currrentDate, 7, DurationType.Day);
    if (filters.ToDate != null) {
      const dt = new Date(filters.ToDate);
      endDate = th.getStartOfDayUtc(dt);
      if (th.isAfter(endDate, maxAllowable)) {
        endDate = maxAllowable;
      }
    }
    let slots = [];
    let businessUserId = filters.BusinessUserId;
    if (businessUserId != null) {
      let userHours = [];
      const user = await this._businessUserService.getById(businessUserId);
      if (user == null) {
        ErrorHandler.throwNotFoundError("Invalid business node id!");
      }
      userHours = await this.prisma.business_user_hours.findMany({
        where: { BusinessUserId: businessUserId },
      });
      if (userHours.length == 0) {
        ErrorHandler.throwNotFoundError(
          "Working hours are not specified for the business!"
        );
      }
      const availableSlotsByDate = await this.findSlotAvailability(
        timeZone,
        numDaysForSlots,
        startDate,
        endDate,
        nodeHours,
        userHours,
        businessUserId,
        businessService,
        businessNodeId
      );
      const userSlots = this.transform(availableSlotsByDate);
      const obj = {
        User: user,
        AvailableSlots: userSlots,
      };
      slots.push(obj);
    } else {
      //User is not specified, check all users performing this service
      const userServices = await this.prisma.business_user_services.findMany({
        where: { BusinessServiceId: businessServiceId },
      });
      if (userServices.length == 0) {
        //Users for this service are not found, calculate slots based on only node hours
        let userHours = [];
        let availableSlotsByDate = await this.findSlotAvailability(
          timeZone,
          numDaysForSlots,
          startDate,
          endDate,
          nodeHours,
          userHours,
          null,
          businessService,
          businessNodeId
        );
        slots = this.transform(availableSlotsByDate);
      } else {
        for await (var s of userServices) {
          businessUserId = s.BusinessUserId;
          let userHours = [];
          const user = await this._businessUserService.getById(businessUserId);
          if (user == null) {
            ErrorHandler.throwNotFoundError("Invalid business user id!");
          }
          userHours = await this.prisma.business_user_hours.findMany({
            where: { BusinessUserId: businessUserId },
          });
          if (userHours.length == 0) {
            throw new Error(
              "Working hours are not specified for the business!"
            );
          }
          const availableSlotsByDate = await this.findSlotAvailability(
            timeZone,
            numDaysForSlots,
            startDate,
            endDate,
            nodeHours,
            userHours,
            businessUserId,
            businessService,
            businessNodeId
          );
          const userSlots = this.transform(availableSlotsByDate);
          const obj = {
            User: user,
            AvailableSlots: userSlots,
          };
          slots.push(obj);
        }
      }
    }
    return slots;
  };

  findAvailableSlotsForUser = async (query : any, businessUserId : uuid) => {
    await validator.validateSearchRequest(query);
    var filters = this.getSearchFilters(query);
    var userHours = [];
    const businessUser = await this._businessUserService.getById(businessUserId);
    if(businessUser == null) {
        ErrorHandler.throwNotFoundError('Invalid business user id!');
    }
    var businessNodeId = businessUser.BusinessNodeId;
    const node = await this._businessNodeService.getById(businessNodeId);
    if (node == null) {
        ErrorHandler.throwNotFoundError('Invalid business node id!');
    }
    const nodeHours = await this.prisma.business_node_hours.findMany({where : { BusinessNodeId : businessNodeId}});
    if (nodeHours.length == 0) {
        ErrorHandler.throwNotFoundError('Working hours are not specified for the business!');
    }
    userHours = await this.prisma.business_user_hours.findMany({where : {BusinessUserId : filters.BusinessUserId},});
    if (userHours.length == 0) {
        ErrorHandler.throwNotFoundError('Working hours are not specified for the business user!');
    }
    const businessUserService = await this.prisma.business_user_services.findMany({where: {BusinessUserId : businessUserId},});
    if(businessUserService.length == 0) {
        ErrorHandler.throwNotFoundError('No services found for the user!');
    }
    var userService = businessUserService[0];
    var businessServiceId = userService.BusinessServiceId;
    const businessService = await this._businessServiceService.getById(businessServiceId);
    if(businessService == null) {
        ErrorHandler.throwNotFoundError('No services found for the user.');
    }
    var timeZone = node.TimeZone;
    const numDaysForSlots = th.parseDurationInDays(node.AllowFutureBookingFor)
    
    var sd = new Date();
    var startDate = th.getStartOfDayUtc(sd);
    if(filters.FromDate != null){
        var dt = new Date(filters.FromDate);
            startDate = th.getStartOfDayUtc(dt);
        }
        const maxAllowable = th.addDuration(startDate, numDaysForSlots, DurationType.Day);
        var endDate = th.addDuration(endDate, 7, DurationType.Day);
        if(filters.ToDate != null) {
            var dt = new Date(filters.ToDate);
            endDate = th.getStartOfDayUtc(dt);
            if(th.isAfter(endDate, maxAllowable)) {
                endDate = maxAllowable;
        }
    }
    const availableSlotsByDate = await this.findSlotAvailability(timeZone, numDaysForSlots, startDate, endDate, nodeHours, userHours, businessUserId, businessService, businessNodeId);
    const slots = this.transform(availableSlotsByDate);
    const appointment = {
        Slots : slots
    }
    return appointment;
};

canCustomerBookThisSlot = async(requestBody : any) => {
    await validator.validateSearchRequest(requestBody);
    const customer = await this._customerService.getById(requestBody.CustomerId);
    if(customer == null){
        ErrorHandler.throwNotFoundError('Customer not found!');
    }
    const startTime = requestBody.StartTime;
    const endTime = requestBody.EndTime;
    //const createModel = await this.getAppointmentObject(requestBody);
    const result = await this._service.canCustomerBookThisSlot(requestBody.CustomerId, startTime, endTime);
    return result;
};

  getSearchFilters = (query) => {
    const filters: FindAvailableSlotsSearchFilters = {};

    let fromDate = query.fromDate != "undefined" ? query.fromDate : null;
    if (fromDate != null) {
      filters["FromDate"] = fromDate;
    }
    let toDate = query.toDate != "undefined" ? query.toDate : null;
    if (toDate != null) {
      filters["ToDate"] = toDate;
    }
    let businessUserId =
      query.businessUserId != "undefined" ? query.businessUserId : null;
    if (businessUserId != null) {
      filters["BusinessUserId"] = businessUserId;
    }
    return filters;
  };

  findSlotAvailability = async (
    timeZone: string,
    numDaysForSlots: number,
    startDate: Date,
    endDate: Date,
    nodeHours: BusinessNodeHourDto[],
    userHours: BusinessUserHourDto[],
    businessUserId: uuid,
    businessService: BusinessServiceDto,
    businessNodeId: uuid
  ) => {
    let holidays = [];
    const businessHolidays = this.getHolidays(nodeHours, numDaysForSlots);
    const userHolidays = this.getHolidays(userHours, numDaysForSlots);
    holidays.push(...businessHolidays);
    holidays.push(...userHolidays);

    const weeklyWorkDays = this.getWorkingWeekDays(nodeHours, businessUserId, userHours);
    
    dayjs.updateLocale('us', {
        holidays        : holidays,
        holidayFormat   : 'DD-MM-YYYY',
        workingWeekDays : weeklyWorkDays
    })

    const slotDuration = th.parseDurationInMin(businessService.ServiceDuration);
    const priorBookingWindowMin = th.parseDurationInMin(
      businessService.PriorBookingWindow
    );

    const slotsByDate = this.getAllSlots(
      timeZone,
      startDate,
      endDate,
      slotDuration,
      priorBookingWindowMin,
      nodeHours,
      businessUserId,
      userHours
    );

    const availableSlotsByDate = await this._service.getAvailableSlots(
      timeZone,
      slotsByDate,
      businessNodeId,
      businessUserId,
      businessService.id,
      numDaysForSlots
    );
    return availableSlotsByDate;
  };

  transform = (slotsByDate) => {
    let slots = [];
    for (var i = 0; i < slotsByDate.length; i++) {
      let temp = slotsByDate[i];
      let daySlots = [];
      for (var j = 0; j < temp.Slots.length; j++) {
        daySlots.push({
          slotStart: th.utcDateFormat(temp.Slots[j].slotStart), 
          slotEnd: th.utcDateFormat(temp.Slots[j].slotEnd),
          available: temp.Slots[j].available,
        });
      }
      const s = {
        Date: th.utcFormat(temp.CurrentMoment, "YYYY-MM-DD"),
        WeekDayId: th.day(temp.CurrentMoment),
        WeekDay: th.utcFormat(temp.CurrentMoment, "dddd"),
        DayStartTime: temp.DayStartTime,
        DayEndTime: temp.DayEndTime,
        Slots: daySlots,
      };
      slots.push(s);
    }
    return slots;
  };

  getHolidays = (
    workHours: BusinessNodeHourDto[] | BusinessUserHourDto[],
    numDayForSlots: number
  ) => {
    const dt: Date = new Date();
    const uptoDate = th.addDuration(dt, numDayForSlots, DurationType.Day);
    let holidays = [];
    for (let i = 0; i < workHours.length; i++) {
      let nd = workHours[i];
      if (nd.Type != "WEEKDAY" && nd.Type != "WEEKEND") {
        //It is a special day / holiday
        if (nd.Date != null && nd.IsOpen == false) {
          //No working hours and defined by date-not by day
          const date = new Date(nd.Date);
          if (th.isSameOrBefore(date, uptoDate)) {
            const dateStr = th.format(date, "DD-MM-YYYY");
            holidays.push(dateStr);
          }
        }
      }
    }
    return holidays;
  };

  getWorkingWeekDays = (
    nodeHours: BusinessNodeHourDto[],
    businessUserId: uuid,
    userHours: BusinessUserHourDto[]
  ) => {
    let weeklyWorkDays = [];
    const businessWeekDays = this.getWeekDays(nodeHours);

    if (businessUserId != null) {
      const userWeekDays = this.getWeekDays(userHours);
      for (let i = 0; i < userWeekDays.length; i++) {
        let x = userWeekDays[i];
        if (businessWeekDays.includes(x)) {
          weeklyWorkDays.push(userWeekDays[i]);
        }
      }
    } else {
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

  getAllSlots = (
    timeZone: string,
    startDate: Date,
    endDate: Date,
    slotDuration: number,
    priorBookingWindowMin: number,
    nodeHours: BusinessNodeHourDto[],
    businessUserId: uuid,
    userHours: BusinessUserHourDto[]
  ) => {
    var nodeWorkingDays = new Map();

    for (var j = 0; j < nodeHours.length; j++) {
      var nh = nodeHours[j];
      if (nh.Date === null) {
        nodeWorkingDays.set(nh.Day, {
          startTime: nh.StartTime,
          endTime: nh.EndTime,
          IsOpen: nh.IsOpen,
        });
      }
    }
    let nodeSlotsByDate = [];
    let numberOfDays = 0;
    let currMoment = th.cloneWithUtc(startDate);
    const spanStart = th.cloneWithUtc(startDate);
    const spanEnd = th.cloneWithUtc(endDate);
    const spanStartOfDay =  th.startOf(spanStart, DurationType.Day);

    if (th.isSame(spanStartOfDay, spanEnd)) {
      numberOfDays = 1;
    } else {
      const a = th.clone(currMoment);
      const b = th.clone(spanEnd);
      const diff = th.businessDiff(a, b);
      numberOfDays = Math.ceil(diff) + 1;
    }

    const { offsetHours, offsetMinutes } = th.getTimezoneOffsets(timeZone);

    for (var i = 0; i < numberOfDays; i++) {
      if (th.isBusinessDay(currMoment)) {
        const currentDay = th.day(currMoment);
        const wd = nodeWorkingDays.get(currentDay);
        const startTime = wd.startTime;
        const endTime = wd.endTime;
        let currDayClone = th.clone(currMoment);
        let currDayStart = th.getStartOfDayUtc(currDayClone);
        const startTokens = startTime.split(":");
        const startHours = parseInt(startTokens[0]);
        const startMinutes = parseInt(startTokens[1]);
        const endTokens = endTime.split(":");
        const endHours = parseInt(endTokens[0]);
        const endMinutes = parseInt(endTokens[1]);

        const currDay = th.cloneWithUtc(currDayStart);
        let dayStartTime = th.addDurationWithOffset(currDay,startHours, startMinutes, offsetHours, offsetMinutes);
        let dayEndTime = th.addDurationWithOffset(currDay, endHours, endMinutes, offsetHours, offsetMinutes);
                
            nodeSlotsByDate.push({
                CurrentMoment   : th.clone(currDayStart),
                Date            : th.cloneFormat(currDayStart),
                WeekDay         : th.day(th.clone(currDayStart)),
                DayStartTime    : dayStartTime,
                DayEndTime      : dayEndTime,
                Slots           : this.calculateSlots(timeZone, th.clone(currDayStart), startTime, endTime, slotDuration, priorBookingWindowMin),
            });
     }
        currMoment = th.nextBusinessDay(currMoment);
    }

    let slotsByDate = nodeSlotsByDate;
        //Filter the slots based on user's hours
    if (businessUserId != null) {
      let userWorkingDays = new Map();

      for (let j = 0; j < userHours.length; j++) {
        let uh = userHours[j];
        if (uh.Date != null) {
          continue;
        }
        userWorkingDays.set(uh.Day, {
          startTime: uh.StartTime,
          endTime: uh.EndTime,
          IsOpen: uh.IsOpen,
        });
      }

      let userSlotsByDate = [];
      for (let k = 0; k < nodeSlotsByDate.length; k++) {
        const nodeSlot = nodeSlotsByDate[k];
        const weekDay = nodeSlot.WeekDay;
        const cm = nodeSlot.CurrentMoment;
        const userCurrentDayStart = th.getStartOfDayUtc(th.clone(cm));
        let userSlotsForDay = [];

        if (userWorkingDays.has(weekDay)) {
          var userWorkingDay = userWorkingDays.get(weekDay);
          if (userWorkingDay.IsOpen) {
            const startTime = userWorkingDay.startTime;
            const endTime = userWorkingDay.endTime;

            const startTokens = startTime.split(":");
            const startHours = parseInt(startTokens[0]);
            const startMinutes = parseInt(startTokens[1]);
            const endTokens = endTime.split(":");
            const endHours = parseInt(endTokens[0]);
            const endMinutes = parseInt(endTokens[1]);
            const userCurrentDS = th.cloneWithUtc(userCurrentDayStart);
          
            const start = th.addDurationWithOffset(
              userCurrentDS,
              startHours,
              startMinutes,
              offsetHours,
              offsetMinutes
            );
            const end = th.addDurationWithOffset(
              userCurrentDS,
              endHours,
              endMinutes,
              offsetHours,
              offsetMinutes
            );

            for (var p = 0; p < nodeSlot.Slots.length; p++) {
              var s = nodeSlot.Slots[p];
              var slotS = s.slotStart;
              var slotE = s.slotEnd;
              if (
                th.isSameOrAfter(slotS, start) &&
                th.isSameOrBefore(slotE, end)
              ) {
                userSlotsForDay.push(s);
              }
            }
            const userSlot = {
              CurrentMoment: th.clone(userCurrentDayStart),
              Date: th.cloneFormat(userCurrentDayStart),
              WeekDay: th.day(th.clone(userCurrentDayStart)),
              DayStartTime: start,
              DayEndTime: end,
              userOffDay: false,
              Slots: userSlotsForDay,
            };
            userSlotsByDate.push(userSlot);
          } else {
            const userSlot = {
              CurrentMoment: th.clone(userCurrentDayStart),
              Date: th.cloneFormat(userCurrentDayStart),
              WeekDay: th.day(th.clone(userCurrentDayStart)),
              DayStartTime: null,
              DayEndTime: null,
              userOffDay: true,
              Slots: [],
            };
            userSlotsByDate.push(userSlot);
          }
        }
      }
      slotsByDate = userSlotsByDate;
    }
    return slotsByDate;
  };

  calculateSlots = (
    timeZone: string,
    dateMoment: Date,
    startTime: string,
    endTime: string,
    timeSlotDurationMin: number,
    priorBookingWindowMin: number
  ) => {
    const { offsetHours, offsetMinutes } = th.getTimezoneOffsets(timeZone);
    const date = new Date();
    const bookingWindowMoment = th.addDuration(
      date,
      priorBookingWindowMin,
      DurationType.Minute
    );
    let slots = [];
    const startTokens = startTime.split(":");
    const startHours = parseInt(startTokens[0]);
    const startMinutes = parseInt(startTokens[1]);
    const endTokens = endTime.split(":");
    const endHours = parseInt(endTokens[0]);
    const endMinutes = parseInt(endTokens[1]);
    const st = th.cloneWithUtc(dateMoment);
    const start = th.addDurationWithOffset(
      st,
      startHours,
      startMinutes,
      offsetHours,
      offsetMinutes
    );
    const end = th.addDurationWithOffset(
      st,
      endHours,
      endMinutes,
      offsetHours,
      offsetMinutes
    );

    let slotStart = th.clone(start);
    let slotEnd = th.addDuration(
      th.clone(start),
      timeSlotDurationMin,
      DurationType.Minute
    );
    
    while (th.isSameOrBefore(slotEnd, end)) {
      let available = true;
      if (th.isBefore(slotStart, bookingWindowMoment)) {
        available = false;
      }
      slots.push({
        slotStart: slotStart,
        slotEnd: slotEnd,
        available: available,
      });
      slotStart = th.clone(slotEnd);
      slotEnd = th.addDuration(
        th.clone(slotStart),
        timeSlotDurationMin,
        DurationType.Minute
      );
      slotStart = th.clone(slotEnd);
      slotEnd = th.addDuration(
        th.clone(slotStart),
        timeSlotDurationMin,
        DurationType.Minute
      );
    }
    return slots;
  };

  getAppointmentObject = async (record) => {
    var user = await this._businessUserService.getById(record.BusinessUserId);
    var customer = await this._customerService.getById(record.CustomerId);
    var node = await this._businessNodeService.getById(record.BusinessNodeId);
    var businessService = await this._businessServiceService.getById(
      record.BusinessServiceId
    );

    return {
      id: record.id,
      DisplayId: record.DisplayId,
      BusinessNodeId: record.BusinessNodeId,
      CustomerId: record.CustomerId,
      BusinessUserId: record.BusinessUserId,
      BusinessServiceId: record.BusinessServiceId,
      BusinessNodeName: node.Name,
      BusinessServiceName: businessService.Name,
      BusinessUserName:
        user.Prefix + " " + user.FirstName + " " + user.LastName,
      CustomerName:
        customer.Prefix + " " + customer.FirstName + " " + customer.LastName,
      CustomerDob: customer.BirthDate,
      CustomerGender: customer.Gender,
      CustomerDisplayPicture: customer.DisplayPicture,
      Date: dayjs(record.Date).local().format("YYYY-MM--DD"),
      StartTime: dayjs(record.StartTime).local().format("HH:mm:ss"),
      EndTime: dayjs(record.EndTime).local().format("HH:mm:ss"),
      StartTimeUtc: record.StartTimeUtc,
      EndTimeUtc: record.EndTimeUtc,
      Type: record.Type,
      Note: record.Note,
      Status: record.Status,
      StatusCode: record.StatusCode,
      Fees: record.Fees,
      Tax: record.Tax,
      Tip: record.Tip,
      Discount: record.Discount,
      CouponCode: record.CouponCode,
      Total: record.Total,
      IsPaid: record.IsPaid,
      TransactionId: record.TransactionId,
    };
  };

  getEnrichedDto = (record) => {
    if (record == null) {
      return null;
    }
    return {};
  };
}
