import { ApiError } from "../../common/api.error";
import { BusinessUserHourService } from '../../database/repository.services/business.user.hour.service';
import { BusinessUserHourCreateModel, 
         BusinessUserHourDto,
         BusinessUserHourSearchFilters,
         BusinessUserHourUpdateModel,
         BusinessUserHourSearchResults, }
         from "../../domain.types/business/business.user.hour.domain.types";
import { BusinessUserHourValidator as validator } from "./business.user.hour.validator";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
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
    _businessNodeHourService : BusinessNodeHourService = null;

    constructor() {
        this._service = new BusinessUserHourService();
        this._businessUserService = new BusinessUserService();
        this._businessNodeHourService = new BusinessNodeHourService();
    }

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);

        if(!requestBody.BusinessUserId || !requestBody.Type || !requestBody.Day) {
            ErrorHandler.throwNotFoundError(`Missing required parameters!`);
        }
        var businessUserId = requestBody.BusinessUserId;    
        const businessUser = await this._businessUserService.getById(businessUserId);
        if (!businessUser) {
            ErrorHandler.throwNotFoundError(`Business user id not found!`);
        }
        // var existing = await this._service.exists(requestBody);
        // if(existing){
        //     ErrorHandler.throwDuplicateUserError("Business user hours with same characteristics found!");
        // }
        if(requestBody.Day != null && requestBody.Date == null) {
            var nodeHoursList = await this._service.getNodeDetails(requestBody);
        }
        var createModel: BusinessUserHourCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business user hours!', 400);
        }
        
        return this.getEnrichedDto(record);
    };

    createMany = async (requestBody: any) => {
        await validator.validateCreateManyRequest(requestBody);
        var businessUserId = requestBody.BusinessUserId;
        var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;
        if (!requestBody.BusinessUserId || !requestBody.DayWiseWorkingHours) {
            ErrorHandler.throwNotFoundError(`Missing required parameters!`);
        }
        var businessUserId = requestBody.BusinessUserId;
            const businessUser = await this._businessUserService.getById(businessUserId);
            if (!businessUser) {
                ErrorHandler.throwNotFoundError(`Business user id not found!`);
            }

            for (const wh of dayWiseWorkingHours) {

            var createModels = await this.getCreateManyModel(requestBody);
                    
        const DayWiseWorkingHours = await this._service.createMany(createModels);
        if (DayWiseWorkingHours === null) {
            throw new ApiError('Unable to create business user hours!', 400);
        }
        return DayWiseWorkingHours;
            
    }
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

    updateMany = async (id: uuid ,requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;
        if(!dayWiseWorkingHours){
            ErrorHandler.throwNotFoundError('Missing required parameters!');
        }
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError("Business user hours with id " + id.toString() + "cannot be found!");
        }
        for(const wh of dayWiseWorkingHours){
            var businessUserId = wh.BusinessUserId;
            const businessUser = await this._businessUserService.getById(businessUserId);
                    if (!businessUser) {
                    ErrorHandler.throwNotFoundError(`Business user id not found!`);
                }  
            }
        const updateModel = this.getUpdateManyModel(requestBody);
        const updated = await this._service.updateMany(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user hours!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid, updateModel:any) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business user hours with id ' + id.toString() + ' cannot be found!');
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
            Date               : requestBody.Date ? requestBody.Date : new Date(),
            IsOpen             : requestBody.IsOpen ? requestBody.IsOpen : false,
            Message            : requestBody.Message ? requestBody.Message : null,
            StartTime          : requestBody.StartTime ? requestBody.StartTime : '10:00:00',
            EndTime            : requestBody.EndTime ? requestBody.EndTime : '21:00:00',
            IsActive           : requestBody.IsActive ? requestBody.IsActive : true
        };     
    };

    getCreateManyModel = (requestBody) => {
        const DayWiseWorkingHours: BusinessUserHourCreateModel[] = [];
        for (const s of requestBody) {
            const record = {
                BusinessUserId     : requestBody.BusinessUserId ? requestBody.BusinessUserId : null,
                Type               : s.Type ? s.Type : null,
                Day                : s.Day ? s.Day : null,
                Date               : s.Date ? s.Date : new Date(),
                IsOpen             : s.IsOpen ? s.IsOpen : false,
                Message            : s.Message ? s.Message : null,
                StartTime          : s.StartTime ? s.StartTime : '10:00:00',
                EndTime            : s.EndTime ? s.EndTime : '21:00:00',    
                IsActive           : s.IsActive ? s.IsActive : true
            };  
            DayWiseWorkingHours.push(record);
        }
        return DayWiseWorkingHours
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

        getUpdateManyModel = (requestBody) => {

            const updateModels: BusinessUserHourUpdateModel[] = [];
            for (const wh of requestBody) {
                const updateModel: BusinessUserHourUpdateModel = {};

                if (Helper.hasProperty(wh, 'BusinessUserId')) {
                    updateModel.BusinessUserId = wh.BusinessUserId;
                }
                if (Helper.hasProperty(wh, 'Type')) {
                    updateModel.Type = wh.Type;
                }
                if (Helper.hasProperty(wh, 'Day')) {
                    updateModel.Day = wh.Day;
                }
                if (Helper.hasProperty(wh, 'Date')) {
                    updateModel.Date = wh.Date;
                }
                if (Helper.hasProperty(wh, 'IsOpen')) {
                    updateModel.IsOpen = wh.IsOpen;
                }
                if (Helper.hasProperty(wh, 'Message')) {
                    updateModel.Message = wh.Message;
                }
                if (Helper.hasProperty(wh, 'StartTime')) {
                    updateModel.StartTime = wh.StartTime;
                }
                if (Helper.hasProperty(wh, 'EndTime')) {
                    updateModel.EndTime = wh.EndTime;
                }
                if (Helper.hasProperty(wh, 'IsActive')) {
                    updateModel.IsActive = wh.IsActive;
                }
                updateModels.push(updateModel)
            }
                return updateModels;
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

    getEnrichedDtos = (DayWiseWorkingHours) => {
        if (DayWiseWorkingHours == null) {
            return null;
        }
        for (const r of DayWiseWorkingHours){
            const record = {
            id                  : r.id,
            BusinessUserId      : DayWiseWorkingHours.BusinessUserId,
            Type                : r.Type,
            Day                 : r.Day,
            Date                : r.Date,
            IsOpen              : r.IsOpen,
            Message             : r.Message,
            StartTime           : r.StartTime,       
            EndTime             : r.EndTime,
            IsActive            : r.IsActive   
            }
            DayWiseWorkingHours.push(record);
        }
        return DayWiseWorkingHours;
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
