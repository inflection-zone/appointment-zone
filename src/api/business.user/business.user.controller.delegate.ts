import { ApiError } from "../../common/api.error";
import { BusinessUserCreateModel, BusinessUserUpdateModel, BusinessUserDto,BusinessUserSearchFilters, BusinessUserSearchResults  } from "../../domain.types/business.user/business.user.domain.types";
import { BusinessUsersValidator, BusinessUsersValidator as validator } from '../business.user/business.user.validator';
import { BusinessUserService } from '../../database/repository.services/business.user.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import * as apikeyGenerator from 'uuid-apikey';
import { query } from "express";



export class BusinessUserControllerDelegate {

    //#region member variables and constructors

    _service: BusinessUserService = null;


    constructor() {
        this._service = new BusinessUserService();
       
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        const { userCreateModel } =
            await BusinessUsersValidator.getValidUserCreateModel(requestBody);

        // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
        var createModel: BusinessUserCreateModel = this.getCreateModel(requestBody);
        const record: BusinessUserDto = await this._service.create(userCreateModel);
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
        var filters: BusinessUserSearchFilters = this.getSearchFilters(query);
        var searchResults : BusinessUserSearchResults = await this._service.search(filters);
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
        const updateModel: BusinessUserUpdateModel = this.getUpdateModel(requestBody);
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
        const businessuserDeleted = await this._service.delete(id);
        return {
            Deleted: businessuserDeleted
        };

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessUserCreateModel => {
        return {
            BusinessNodeId                 : requestBody.BusinessNodeId? requestBody.BusinessNodeId:null,
            FirstName                      : requestBody.FirstName? requestBody.FirstName: null,
            LastName                       : requestBody.LastName? requestBody.LastName: null,
            Prefix                         : requestBody.Prefix? requestBody.Prefix: null,
            Mobile                         : requestBody.Mobile? requestBody.Mobile: null,
            Email                          : requestBody.Email ? requestBody.Email : null,
            DisplayPicture                 : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            AboutMe                        : requestBody.AboutMe ? requestBody.AboutMe : null,
            Qualification                  : requestBody.Qualification ? requestBody.Qualification : null,
            Experience                     : requestBody.Experience ? requestBody.Experience : null,
            OverallRating                  : requestBody.OverallRating? requestBody.OverallRating: null,
            Dob                            : requestBody.Dob? requestBody.Dob: null,
            Gender                         : requestBody.Gender ? requestBody.Gender : undefined,
            IsAvailableForEmergency        : requestBody.IsAvailableForEmergency ? requestBody.IsAvailableForEmergency :true,
            Facebook                       : requestBody.Facebook? requestBody.Facebook: null,
            Linkedin                       : requestBody.Linkedin? requestBody.Linkedin: null,
            Twitter                        : requestBody.Twitter? requestBody.Twitter: null,
            Instagram                      : requestBody.Instagram ? requestBody.Instagram : null,
            Yelp                           : requestBody.Yelp? requestBody.Yelp: null,
            IsActive                       : requestBody.IsActive ? requestBody.IsActive : true
           
        };
    };

    getSearchFilters = (query) => {
        var filters = {};
        var firstName = query.firstName ? query.firstName : null;
        if (firstName != null) {
            filters['FirstName'] = firstName;
        }
        var lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['LastName'] = lastName;
        }
        var mobile = query.mobile ? query.mobile : null;
        if (mobile != null) {
            filters['Mobile'] = mobile
        }
        var email = query.email ? query.email : null;
        if (email != null) {
            filters['Email'] = email;
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



    getUpdateModel = (requestBody): BusinessUserUpdateModel => {

        let updateModel: BusinessUserUpdateModel = {};

    if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
        updateModel.BusinessNodeId = requestBody.BusinessNodeId;
    }
    if (Helper.hasProperty(requestBody, 'FirstName')) {
        updateModel.FirstName = requestBody.FirstName;
    }
    if (Helper.hasProperty(requestBody, 'LastName')) {
        updateModel.LastName = requestBody.LastName;
    }
    if (Helper.hasProperty(requestBody, 'Prefix')) {
        updateModel.Prefix = requestBody.Prefix;
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
    if (Helper.hasProperty(requestBody, 'AboutMe')) {
        updateModel.AboutMe = requestBody.AboutMe;
    }
    if (Helper.hasProperty(requestBody, 'Qualification')) {
        updateModel.Qualification = requestBody.Qualification;
    }
    if (Helper.hasProperty(requestBody, 'Experience')) {
        updateModel.Experience = requestBody.Experience;
    }
    if (Helper.hasProperty(requestBody, 'OverallRating')) {
        updateModel.OverallRating = requestBody.OverallRating;
    }
    if (Helper.hasProperty(requestBody, 'Dob')) {
        updateModel.Dob = requestBody.Dob;
    }
    if (Helper.hasProperty(requestBody, 'Gender')) {
        updateModel.Gender = requestBody.Gender;
    }
    if (Helper.hasProperty(requestBody, 'IsAvailableForEmergency')) {
        updateModel.IsAvailableForEmergency = requestBody.IsAvailableForEmergency;
    }
    if (Helper.hasProperty(requestBody, 'Facebook')) {
        updateModel.Facebook = requestBody.Facebook;
    }
    if (Helper.hasProperty(requestBody, 'Linkedin')) {
        updateModel.Linkedin = requestBody.Linkedin;
    }
    if (Helper.hasProperty(requestBody, 'Twitter')) {
        updateModel.Twitter = requestBody.Twitter;
    }
    if (Helper.hasProperty(requestBody, 'Instagram')) {
        updateModel.Instagram = requestBody.Instagram;
    }
    if (Helper.hasProperty(requestBody, 'Yelp')) {
        updateModel.Yelp = requestBody.Yelp;
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
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            FirstName                      : record.FirstName,
            LastName                       : record.LastName,
            Prefix                         : record.Prefix,
            Mobile                         : record.Mobile,
            Email                          : record.Email,
            DisplayPicture                 : record.DisplayPicture,
            AboutMe                        : record.AboutMe,
            Qualification                  : record.Qualification,
            Experience                     : record.Experience,
            OverallRating                  : record.OverallRating,
            Dob                            : record.Dob,
            Gender                         : record.Gender,
            IsAvailableForEmergency        : record.IsAvailableForEmergency,
            Facebook                       : record.Facebook,
            Linkedin                       : record.Linkedin,
            Twitter                        : record.Twitter,
            Instagram                      : record.Instagram,
            Yelp                           : record.Yelp,
            IsActive                       : record.IsActive
           
        };
    };

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            FirstName                      : record.FirstName,
            LastName                       : record.LastName,
            Prefix                         : record.Prefix,
            Mobile                         : record.Mobile,
            Email                          : record.Email,
            DisplayPicture                 : record.DisplayPicture,
            AboutMe                        : record.AboutMe,
            Qualification                  : record.Qualification,
            Experience                     : record.Experience,
            OverallRating                  : record.OverallRating,
            Dob                            : record.Dob,
            Gender                         : record.Gender,
            IsAvailableForEmergency        : record.IsAvailableForEmergency,
            Facebook                       : record.Facebook,
            Linkedin                       : record.Linkedin,
            Twitter                        : record.Twitter,
            Instagram                      : record.Instagram,
            Yelp                           : record.Yelp,
            IsActive                       : record.IsActive
           
        };
    };

}