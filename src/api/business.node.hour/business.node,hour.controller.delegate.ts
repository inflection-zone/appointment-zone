import { ApiError } from "../../common/api.error";
import { BusinessNodeHourCreateModel, BusinessNodeHourUpdateModel, BusinessNodeHourDto,BusinessNodeHourSearchFilters, BusinessNodeHourSearchResults  } from "../../domain.types/business.node.hour/business.node.hour.domain.types";
import { BusinessNodeHourValidator, BusinessNodeHourValidator as validator } from '../business.node.hour/business.node.hour.validator';
import { BusinessNodeHourService } from '../../database/repository.services/business.node.hour.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import * as apikeyGenerator from 'uuid-apikey';
import { query } from "express";



export class BusinessNodeHourControllerDelegate {

    //#region member variables and constructors

    _service: BusinessNodeHourService = null;


    constructor() {
        this._service = new BusinessNodeHourService();
       
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        // const { userCreateModel } =
        //     await BusinessNodeHourValidator.getValidUserCreateModel(requestBody);

        // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
        var createModel: BusinessNodeHourCreateModel = this.getCreateModel(requestBody);
        const record: BusinessNodeHourDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create Business node!', 400);
        }

        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessNodeHourSearchFilters = this.getSearchFilters(query);
        var searchResults : BusinessNodeHourSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
       
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business node with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: BusinessNodeHourUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Business node!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business node with id ' + id.toString() + ' cannot be found!');
        }
        const businessNodeHourDeleted = await this._service.delete(id);
        return {
            Deleted: businessNodeHourDeleted
        };

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessNodeHourCreateModel => {
        return {
            // id                             : requestBody.id? requestBody.id:null,
            BusinessNodeId                 : requestBody.BusinessNodeId? requestBody.BusinessNodeId:null,
            Type                           : requestBody.Type? requestBody.Type: null,
            Day                            : requestBody.Day? requestBody.Day: null,
            Date                           : requestBody.Date? requestBody.Date: null,
            IsOpen                         : requestBody.IsOpen? requestBody.IsOpen: null,
            Message                        : requestBody.Message ? requestBody.Message : null,
            StartTime                      : requestBody.StartTime? requestBody.StartTime: null,
            EndTime                        : requestBody.EndTime ? requestBody.EndTime : null,
            IsActive                       : requestBody.IsActive ? requestBody.IsActive : null,
            IsDeleted                      : requestBody.IsDeleted ? requestBody.IsDeleted : null,
           
        };
    };

    getSearchFilters = (query) => {
        var filters = {};
        var businessNodeId = query.businessNodeId ? query.businessNodeId : null;
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
    }



    getUpdateModel = (requestBody): BusinessNodeHourUpdateModel => {

        let updateModel: BusinessNodeHourUpdateModel = {};

    if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
        updateModel.BusinessNodeId = requestBody.BusinessNodeId;
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
    if (Helper.hasProperty(requestBody, 'IsDeleted')) {
        updateModel.IsDeleted = requestBody.IsDeleted;
    }
     return updateModel;
}


    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            Type                           : record.Type,
            Day                            : record.Day,
            Date                           : record.Date,
            IsOpen                         : record.IsOpen,
            Message                        : record.Message,
            StartTime                      : record.StartTime,
            EndTime                        : record.EndTime,
            IsActive                       : record.IsActive,
            IsDeleted                      : record.IsDeleted
           
        };
    };

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            Type                           : record.Type,
            Day                            : record.Day,
            Date                           : record.Date,
            IsOpen                         : record.IsOpen,
            Message                        : record.Message,
            StartTime                      : record.StartTime,
            EndTime                        : record.EndTime,
            IsActive                       : record.IsActive,
            IsDeleted                      : record.IsDeleted
           
        };
    };

}