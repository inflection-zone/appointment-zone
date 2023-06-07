import { ApiError } from "../../common/api.error";
import { AppointmentService } from "../../database/repository.services/appointment.service";
//import { AppointmentCreateModel, AppointmentDto, AppointmentSearchFilters, AppointmentSearchResults, AppointmentUpdateModel } from "../../domain.types/appointment/appointment.domain.types";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { BusinessService } from "../../database/repository.services/business.service";
import { BusinessServiceService } from "../../database/repository.services/business.service.service";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { ErrorHandler } from '../../common/error.handler';
import { TimeHelper } from '../../common/time.helper';
import { DurationType } from '../../domain.types/miscellaneous/time.types';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { CustomerService } from "../../database/repository.services/customer.service";
import { BusinessUsersValidator } from "../business.user/business.user.validator";


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

    constructor() {
        this._service = new AppointmentService();
        this._businessService = new BusinessService();
        this._businessNodeService = new BusinessNodeService();
        this._businessServiceService = new BusinessServiceService();
        this._businessNodeHourService = new BusinessNodeHourService();
        this._businessUserService = new BusinessUserService();
        this._customerService = new CustomerService();
    }

    findAvailableSlots = async (query : any, businessId : uuid, businessNodeId : uuid, businessServiceId : uuid, businessUserId : uuid) => {
       //await validator.validateSearchRequest(query);
        var filters = this.getSearchFilters(query);
        var searchResults = await this._service.findAvailableSlots(filters, businessId, businessNodeId, businessServiceId, businessUserId);
        return searchResults;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment with id ' + id.toString() + ' cannot be found!');
        }
        var app = await this.getAppointmentObject(record);
        return this.getEnrichedDto(record);
    };

    getSearchFilters = async (query) => {

        var filters = {};

        var fromDate = query.fromDate ? query.fromDate : null;
        if (fromDate != null) {
            filters['FromDate'] = fromDate;
        }
        var toDate = query.toDate ? query.toDate : null;
        if (toDate != null) {
            filters['ToDate'] = toDate;
        }
        var userId = query.userId ? query.userId : null;
        if (userId != null) {
            filters['UserId'] = userId;
        }
        return filters;
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