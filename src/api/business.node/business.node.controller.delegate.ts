import { ApiError } from "../../common/api.error";
import { BusinessNodeCreateModel, BusinessNodeUpdateModel, BusinessNodeDto,BusinessNodeSearchFilters, BusinessNodeSearchResults  } from "../../domain.types/business.node/business.node.domain.types";
import { BusinessNodesValidator, BusinessNodesValidator as validator } from './business.node.validator';
import { BusinessNodeService } from '../../database/repository.services/business.node.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import * as apikeyGenerator from 'uuid-apikey';
import { query } from "express";



export class BusinessNodeControllerDelegate {

    //#region member variables and constructors

    _service: BusinessNodeService = null;


    constructor() {
        this._service = new BusinessNodeService();
       
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        const { nodeCreateModel } =
            await BusinessNodesValidator.getValidNodeCreateModel(requestBody);

        // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
        var createModel: BusinessNodeCreateModel = this.getCreateModel(requestBody);
        const record: BusinessNodeDto = await this._service.create(nodeCreateModel);
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
        var filters: BusinessNodeSearchFilters = this.getSearchFilters(query);
        var searchResults : BusinessNodeSearchResults = await this._service.search(filters);
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
        const updateModel: BusinessNodeUpdateModel = this.getUpdateModel(requestBody);
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
        const businessDeleted = await this._service.delete(id);
        return {
            Deleted: businessDeleted
        };

    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessNodeCreateModel => {
        return {
            BusinessId                : requestBody.BusinessId? requestBody.BusinessId:null,
            Name                      : requestBody.Name? requestBody.Name: null,
            Mobile                    : requestBody.Mobile? requestBody.Mobile: null,
            Email                     : requestBody.Email ? requestBody.Email : null,
            DisplayPicture            : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            Address                   : requestBody.Address ? requestBody.Address : null,
            Longitude                 : requestBody.Longitude ? requestBody.Longitude : null,
            Lattitude                 : requestBody.Lattitude ? requestBody.Lattitude : null,
            OverallRating             : requestBody.OverallRating? requestBody.OverallRating: null,
            TimeZone                  : requestBody.TimeZone ? requestBody.TimeZone : undefined,
            AllowWalkinAppointments   : requestBody.AllowWalkinAppointments ? requestBody.AllowWalkinAppointments :null,
            AllowFutureBookingFor     : requestBody.AllowFutureBookingFor ? requestBody.AllowFutureBookingFor : '30d',
            IsActive                  : requestBody.IsActive ? requestBody.IsActive : true,
           
        };
    };

    getSearchFilters = (query) => {
        var filters = {};
        var Name = query.Name ? query.Name : null;
        if (Name != null) {
            filters['Name'] = Name;
        }
        var lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['LastName'] = lastName;
        }
        var Mobile = query.Mobile ? query.Mobile : null;
        if (Mobile != null) {
            filters['Mobile'] = Mobile
        }
        var Email = query.Email ? query.Email : null;
        if (Email != null) {
            filters['Email'] = Email;
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



    getUpdateModel = (requestBody): BusinessNodeUpdateModel => {

        let updateModel: BusinessNodeUpdateModel = {};

    if (Helper.hasProperty(requestBody, 'BusinessId')) {
        updateModel.BusinessId = requestBody.BusinessId;
    }
    if (Helper.hasProperty(requestBody, 'Name')) {
        updateModel.Name = requestBody.Name;
    }
    if (Helper.hasProperty(requestBody, 'Mobile')) {
        updateModel.Mobile = requestBody.Mobile;
    }
    if (Helper.hasProperty(requestBody, 'Email')) {
        updateModel.Email = requestBody.Email;
    }
    if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
        updateModel.DisplayPicture = requestBody.DisplayPicture;
    }
    if (Helper.hasProperty(requestBody, 'Address')) {
        updateModel.Address = requestBody.Address;
    }
    if (Helper.hasProperty(requestBody, 'Longitude')) {
        updateModel.Longitude = requestBody.Longitude;
    }
    if (Helper.hasProperty(requestBody, 'Lattitude')) {
        updateModel.Lattitude = requestBody.Lattitude;
    }
    if (Helper.hasProperty(requestBody, 'OverallRating')) {
        updateModel.OverallRating = requestBody.OverallRating;
    }
    if (Helper.hasProperty(requestBody, 'TimeZone')) {
        updateModel.TimeZone = requestBody.TimeZone;
    }
    if (Helper.hasProperty(requestBody, 'AllowWalkinAppointments')) {
        updateModel.AllowWalkinAppointments = requestBody.AllowWalkinAppointments;
    }
    if (Helper.hasProperty(requestBody, 'AllowFutureBookingFor')) {
        updateModel.AllowFutureBookingFor = requestBody.AllowFutureBookingFor;
    }
    if (Helper.hasProperty(requestBody, 'IsActive')) {
        updateModel.IsActive = requestBody.IsActive;
    }
    return updateModel;
}


    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                        : record.id,
            BusinessId                : record.BusinessId,
            Name                      : record.Name,
            Mobile                    : record.Mobile,
            Email                     : record.Email,
            DisplayPicture            : record.DisplayPicture,
            Address                   : record.Address,
            Longitude                 : record.Longitude,
            Lattitude                 : record.Lattitude,
            OverallRating             : record.OverallRating,
            TimeZone                  : record.TimeZone,
            AllowWalkinAppointments   : record.AllowWalkinAppointments,
            AllowFutureBookingFor     : record.AllowFutureBookingFor,
            IsActive                  : record.IsActive,
           
        };
    };

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                        : record.id,
            BusinessId                : record.BusinessId,
            Name                      : record.Name,
            Mobile                    : record.Mobile,
            Email                     : record.Email,
            DisplayPicture            : record.DisplayPicture,
            Address                   : record.Address,
            Longitude                 : record.Longitude,
            Lattitude                 : record.Lattitude,
            OverallRating             : record.OverallRating,
            TimeZone                  : record.TimeZone,
            AllowWalkinAppointments   : record.AllowWalkinAppointments,
            AllowFutureBookingFor     : record.AllowFutureBookingFor,
            IsActive                  : record.IsActive,
           
        };
    };


}
