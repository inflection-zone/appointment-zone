import { ApiError } from "../../common/api.error";
import { BusinessUserHourService } from '../../database/repository.services/business.user.hour.service';
import { BusinessUserHourCreateModel, 
         BusinessUserHourSearchFilters,
         BusinessUserHourUpdateModel,
         BusinessUserHourSearchResults, }
         from "../../domain.types/business/business.user.hour.domain.types";
import { BusinessUserHourValidator as validator } from "./business.user.hour.validator";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
//import { BusinessNodeHourService } frome "../../database/repository.services/business.node.hour.service";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/error.handler";
import { Helper } from "../../common/helper";
import dayjs from "dayjs";
import { Message } from "twilio/lib/twiml/MessagingResponse";
import { request } from "http";

export class BusinessUserHourControllerDelegate {

    //#region member variables and constructors

    _service: BusinessUserHourService = null;
    _businessUserService: BusinessUserService = null;
  //  _businessNodeHourService : BusinessNodeHourService = null;

    constructor() {
        this._service = new BusinessUserHourService();
        this._businessUserService = new BusinessUserService();
      //  this._businessNodeHourService = new BusinessNodeHourService();

    }

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);

        var businessUserId = requestBody.BusinessUserId;
        const businessUser = await this._businessUserService.getById(businessUserId);
        if (!businessUser) {
            ErrorHandler.throwNotFoundError(`Business user id not found!`);
        }
        var createModel: BusinessUserHourCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business user hours!', 400);
        }
        const existing = await this._service.exists(createModel);
            if(existing){
                ErrorHandler.throwDuplicateUserError("Business user hours with same characteristics found!")
            }
            // if(requestBody.Day != null && requestBody.Date) {
            //     var nodeHours = await this._businessNodeHourService.search({
            //         businessNodeId : businessUser.BusinessNodeId,
            //         day : requestBody.Day,
            //         date : null,
            //         IsActive : true
            //     });

            //     var nodeHoursDay = nodeHours.length > 0 ? nodeHours[0] : null;
            //     if(nodeHoursDay != null && requestBody.StartTime !=null && requestBody.EndTime != null)
            //             nodeStartTime = nodeHoursDay.StartTime;
            //             nodeEndTime = nodeHoursDay.EndTime;

            //         if (IsBefore(requestBody.StartTime, nodeStartTime)){
            //             requestBody.StartTime = nodeStartTime;
            //         }    
            //         if (IsAfter(requestBody.EndTime, nodeEndTime)) {
            //             requestBody.EndTime = nodeEndTime;
            //         }
            // }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user hours with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessUserHourSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessUserHourSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid ,requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError("Business user hours with id " + id.toString() + "cannot be found!");
        }
        const updateModel: BusinessUserHourUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user hours!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid, updateModel:any) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Busieness user hours with id ' + id.toString() + ' cannot be found!');
        }
        const businessUserHourDeleted = await this._service.delete(id, updateModel);
        return {
            Deleted : businessUserHourDeleted
        };
    };

    getCreateModel = (requestBody): BusinessUserHourCreateModel => {
        return {
            BusinessUserId     : requestBody.BusinessUserId ? requestBody.BusinessUserId : null,
            Type               : requestBody.Type ? requestBody.Type : null,
            Day                : requestBody.Day ? requestBody.Day : null,
            Date               : requestBody.Date ? requestBody.Date : null,
            IsOpen             : requestBody.IsOpen ? requestBody.IsOpen : false,
            Message            : requestBody.Message ? requestBody.Message : null,
            StartTime          : requestBody.StartTime ? requestBody.StartTime : null,
            EndTime            : requestBody.EndTime ? requestBody.EndTime : null,
            // StartTime          : requestBody.StartTime ? dayjs(requestBody.StartTime).format('LT') : '10:00:00',
            // EndTime            : requestBody.EndTime ? dayjs(requestBody.EndTime).format('LT')  :'21:00:00',
            IsActive           : requestBody.IsActive ? requestBody.IsActive : true
        };     
    };

    getSearchFilters = (query) => {
        var filters = {};

            var businessUserId = query.businessUserId ? query.businessUserId : null;
            if (businessUserId != null) {
                filters['BusinessUserId'] = businessUserId;
            }
            var isActive= query.isActive ? query.isActive : null;
            if (isActive != null) {
                filters['IsActive'] = isActive;
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

    getUpdateModel = (requestBody): BusinessUserHourUpdateModel => {

        const updateModel: BusinessUserHourUpdateModel = {};
            if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
                updateModel.BusinessUserId = requestBody.BusinessUserId;
            }
            if (Helper.hasProperty(requestBody, 'Type')) {
                updateModel.Type = requestBody.Type;
            }
            if (Helper.hasProperty(requestBody, 'Day')) {
                updateModel.Day = requestBody.Day;
            }
            if (Helper.hasProperty(requestBody, 'Date')) {
                updateModel.Date = requestBody.Date;
            }
            if (Helper.hasProperty(requestBody, 'IsOpen')) {
                updateModel.IsOpen = requestBody.IsOpen;
            }
            if (Helper.hasProperty(requestBody, 'Message')) {
                updateModel.Message = requestBody.Message;
            }
            if (Helper.hasProperty(requestBody, 'StartTime')) {
                updateModel.StartTime = requestBody.StartTime;
            }
            if (Helper.hasProperty(requestBody, 'EndTime')) {
                updateModel.EndTime = requestBody.EndTime;
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
            id                  : record.id,
            BusinessUserId      : record.BusinessUserId,
            Type                : record.Type,
            Day                 : record.Day,
            Date                : record.Date,
            IsOpen              : record.IsOpen,
            Message             : record.Message,
            StartTime           : record.StartTime,       
            EndTime             : record.EndTime,
            IsActive            : record.IsActive    
        };
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            BusinessUserId      : record.BusinessUserId,
            Type                : record.Type,
            Day                 : record.Day,
            Date                : record.Date,
            IsOpen              : record.IsOpen,
            Message             : record.Message,
            StartTime           : record.StartTime,       
            EndTime             : record.EndTime,
            IsActive            : record.IsActive    
        };
    };

}
