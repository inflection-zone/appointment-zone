import { ApiError } from "../../common/api.error";
import { AppointmentStatusCreateModel, AppointmentStatusDto, AppointmentStatusSearchFilters, AppointmentStatusSearchResults, AppointmentStatusUpdateModel } from "../../domain.types/appointment.status/appointment.status.domain.types";
import { AppointmentStatusService } from "../../database/repository.services/appointment.status.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";
import { AppointmentStatusValidator as validator } from './appointment.status.validator';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";

export class AppointmentStatusControllerDelegate {
    //#region member variables and constructors

    _service : AppointmentStatusService = null;

    _businessNodeService : BusinessNodeService = null;
    
    //_appointmentId : AppointmentService =null;

    constructor() {
        this._service = new AppointmentStatusService();
        this._businessNodeService = new BusinessNodeService();
       // this._appointmentId = new AppointmentService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        if (!requestBody.BusinessNodeId) {
                ErrorHandler.throwNotFoundError('Missing required parameters!');
            }
        var businessNodeId = requestBody.BusinessNodeId;
        const businessNode = await this._businessNodeService.getById(businessNodeId);
        if (!businessNode) {
            ErrorHandler.throwNotFoundError('Business node with id ' + businessNodeId.toString() + ' not found!');
        }
        var createModel: AppointmentStatusCreateModel = this.getCreateModel(requestBody);
        const record: AppointmentStatusDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create appointment status!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment status with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };
    
    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: AppointmentStatusSearchFilters = this.getSearchFilters(query);
        var searchResults: AppointmentStatusSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Appointment status with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: AppointmentStatusUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update appointment status!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Appointment status with id ' + id.toString() + ' cannot be found!');
        }
        const notificationDeleted = await this._service.delete(id);
        return {
            Deleted: notificationDeleted
        };
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): AppointmentStatusCreateModel => {
        return {
            BusinessNodeId          : requestBody.BusinessNodeId ? requestBody.BusinessNodeId : null,
            IsCancellationStatus    : requestBody.IsCancellationStatus ? requestBody.IsCancellationStatus : false, 
            IsCompletedStatus       : requestBody.IsCompletedStatus ? requestBody.IsCompletedStatus : false,
            IsConfirmedStatus       : requestBody.IsConfirmedStatus ? requestBody.IsConfirmedStatus : false,
            IsDashboardStatus       : requestBody.IsDashboardStatus ? requestBody.IsDashboardStatus : true,
            IsWalkinEntryStatus     : requestBody.IsWalkinEntryStatus ? requestBody.IsWalkinEntryStatus : false,
            NotificationText        : requestBody.NotificationText ? requestBody.NotificationText : null,
            SendNotification        : requestBody.SendNotification ? requestBody.SendNotification : true,
            SendSms                 : requestBody.SendSms ? requestBody.SendSms : true,
            Sequence                : requestBody.Sequence ? requestBody.Sequence : 0,
            SmsText                 : requestBody.SmsText ? requestBody.SmsText : null,
            Status                  : requestBody.Status ? requestBody.Status : "",
            StatusCode              : requestBody.StatusCode ? requestBody.StatusCode : "",
            StatusColor             : requestBody.StatusColor ? requestBody.StatusColor : "",
            IsActive                : requestBody.IsActive ? requestBody.IsActive : true
        };
    };

    getSearchFilters = (query) => {
        var filters = {};

            var businessNodeId= query.businessNodeId ? query.businessNodeId : null;
            if (businessNodeId != null) {
                filters['BusinessNodeId'] = businessNodeId;
            }
            var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : null;
            if (itemsPerPage != null) {
                filters['ItemsPerPage'] = itemsPerPage;
            }
            var order = query.order ? query.order : null;
            if (order != null) {
              filters['Order'] = order;
            }
            return filters;
    };

    getUpdateModel = (requestBody): AppointmentStatusUpdateModel => {

        let updateModel: AppointmentStatusUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'IsCancellationStatus')) {
            updateModel.IsCancellationStatus = requestBody.IsCancellationStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsCompletedStatus')) {
            updateModel.IsCompletedStatus = requestBody.IsCompletedStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsConfirmedStatus')) {
            updateModel.IsConfirmedStatus = requestBody.IsConfirmedStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsDashboardStatus')) {
            updateModel.IsDashboardStatus = requestBody.IsDashboardStatus;
        }
        if (Helper.hasProperty(requestBody, 'IsWalkinEntryStatus')) {
            updateModel.IsWalkinEntryStatus = requestBody.IsWalkinEntryStatus;
        }
        if (Helper.hasProperty(requestBody, 'NotificationText')) {
            updateModel.NotificationText = requestBody.NotificationText;
        }
        if (Helper.hasProperty(requestBody, 'SendNotification')) {
            updateModel.SendNotification = requestBody.SendNotification;
        }
        if (Helper.hasProperty(requestBody, 'SendSms')) {
            updateModel.SendSms = requestBody.SendSms;
        }
        if (Helper.hasProperty(requestBody, 'Sequence')) {
            updateModel.Sequence = requestBody.Sequence;
        }
        if (Helper.hasProperty(requestBody, 'SmsText')) {
            updateModel.SmsText = requestBody.SmsText;
        }
        if (Helper.hasProperty(requestBody, 'Status')) {
            updateModel.Status = requestBody.Status;
        }
        if (Helper.hasProperty(requestBody, 'StatusCode')) {
            updateModel.StatusCode = requestBody.StatusCode;
        }
        if (Helper.hasProperty(requestBody, 'StatusColor')) {
            updateModel.StatusColor = requestBody.StatusColor;
        }
        if (Helper.hasProperty(requestBody, 'IsActive')) {
            updateModel.IsActive = requestBody.IsActive;
        }
        return updateModel;
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                      : record.id,
            BusinessNodeId          : record.BusinessNodeId,
            IsCancellationStatus    : record.IsCancellationStatus,
            IsCompletedStatus       : record.IsCompletedStatus,
            IsConfirmedStatus       : record.IsConfirmedStatus,
            IsDashboardStatus       : record.IsDashboardStatus,
            IsWalkinEntryStatus     : record.IsWalkinEntryStatus,
            SendNotification        : record.SendNotification,
            NotificationText        : record.NotificationText,
            SendSms                 : record.SendSms,
            Sequence                : record.Sequence,
            SmsText                 : record.SmsText,
            Status                  : record.Status,
            StatusCode              : record.StatStatusCodeus,
            StatusColor             : record.StatusColor,
            IsActive                : record.IsActive,
            CreatedAt               : record.CreatedAt,
            UpdatedAt               : record.UpdatedAt,
            IsDeleted               : record.IsDeleted,
            DeletedAt               : record.DeletedAt      
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                      : record.id,
            BusinessNodeId          : record.BusinessNodeId,
            IsCancellationStatus    : record.IsCancellationStatus,
            IsCompletedStatus       : record.IsCompletedStatus,
            IsConfirmedStatus       : record.IsConfirmedStatus,
            IsDashboardStatus       : record.IsDashboardStatus,
            IsWalkinEntryStatus     : record.IsWalkinEntryStatus,
            SendNotification        : record.SendNotification,
            NotificationText        : record.NotificationText,
            SendSms                 : record.SendSms,
            Sequence                : record.Sequence,
            SmsText                 : record.SmsText,
            Status                  : record.Status,
            StatusCode              : record.StatStatusCodeus,
            StatusColor             : record.StatusColor,
            IsActive                : record.IsActive,
            CreatedAt               : record.CreatedAt,
            UpdatedAt               : record.UpdatedAt,
            IsDeleted               : record.IsDeleted,
            DeletedAt               : record.DeletedAt      
        };
    };
}
