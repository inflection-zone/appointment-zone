
///////////////////////////////////////////////////////////////////////////////////////

import { ApiError } from "../../common/api.error";
import { BusinessCreateModel, BusinessUpdateModel, BusinessDto,BusinessSearchFilters, BusinessSearchResults  } from "../../domain.types/business/business.domain.types";
import { BusinessValidator as validator } from './business.validator';
import { BusinessService } from '../../database/repository.services/business.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import * as apikeyGenerator from 'uuid-apikey';
import { query } from "express";

export class BusinessControllerDelegate {

    //#region member variables and constructors

    _service: BusinessService = null;


    constructor() {
        this._service = new BusinessService();
       
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
        var createModel: BusinessCreateModel = this.getCreateModel(requestBody);
        const record: BusinessDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create Business!', 400);
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

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: BusinessUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Business!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        const businessDeleted = await this._service.delete(id);
        return {
            Deleted: businessDeleted
        };

    }
    


    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessCreateModel => {
        return {
            ExternalId          : requestBody.ExternalId ? requestBody.ExternalId : null,
            Name                : requestBody.Name? requestBody.Name: null,
            Mobile              : requestBody.Mobile? requestBody.Mobile: null,
            Email               : requestBody.Email ? requestBody.Email : null,
            AboutUs             : requestBody.AboutUs? requestBody.AboutUs: null,
            Logo                : requestBody.Logo ? requestBody.Logo : null,
            DisplayPicture      : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            OverallRating       : requestBody.OverallRating? requestBody.OverallRating: null,
            Address             : requestBody.Address ? requestBody.Address : null,
            ApiKey              : requestBody.ApiKey ? requestBody.ApiKey : apikeyGenerator.default.create().apiKey,
            Facebook            :requestBody.Facebook ? requestBody.Facebook : null,
            Linkedin            :requestBody.Linkedin ? requestBody.Linkedin : null,
            Twitter             :requestBody.Twitter ? requestBody.Twitter : null,
            Instagram           :requestBody.Instagram ? requestBody.Instagram : null,
            Yelp                :requestBody.Yelp ? requestBody.Yelp : null,
            IsActive            : requestBody.IsActive ? requestBody.IsActive : true,
           
        };
    };

    getSearchFilters = (query) => {
        var filters = {};
            var ExternalId= query.ExternalId  ? query.ExternalId : null;
            if (ExternalId!= null) {
                filters['ExternalId'] = ExternalId;
            }

            var Name= query.Name ? query.Name : null;
            if (Name!= null) {
                filters['Name'] = Name;
            }

            var Email= query.Email ? query.Email : null;
            if (Email!= null) {
                filters['Email'] = Email;
            }

            var Mobile= query.Mobile ? query.Mobile : null;
            if (Mobile!= null) {
                filters['Mobile'] = Mobile;
            }

            var AboutUs= query.AboutUs ? query.AboutUs : null;
            if (AboutUs != null) {
                filters['AboutUs'] = AboutUs;
            }

            var Logo= query.Logo ? query.Logo : null;
            if (Logo!= null) {
                filters['Logo'] = Logo;
                }

            var Address= query.Address ? query.Address : null;
            if (Address != null) {
                filters['Address'] = Address;
                }

            var Facebook= query.Facebook ? query.Facebook : null;
            if (Facebook != null) {
                filters['Facebook'] = Facebook;
                }

            var  Linkedin= query. Linkedin ? query. Linkedin : null;
            if ( Linkedin != null) {
                filters[' Linkedin'] =  Linkedin;
            }

            var Twitter= query.Twitter ? query.Twitter : null;
            if (Twitter != null) {
                filters['Twitter'] = Twitter;
            }

            var Instagram= query.Instagram ? query.Instagram : null;
            if (Instagram != null) {
                filters['Instagram'] = Instagram;
            }

            var Yelp=query.Yelp ? query.Yelp : null;
            if (Yelp != null) {
                filters['Yelp'] = Yelp;
            }
            
            return filters;

    };

    getUpdateModel = (requestBody): BusinessUpdateModel => {

        let updateModel: BusinessUpdateModel = {};

    if (Helper.hasProperty(requestBody, 'ExternalId')) {
        updateModel.ExternalId = requestBody.ExternalId;
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
    if (Helper.hasProperty(requestBody, 'AboutUs')) {
        updateModel.AboutUs = requestBody.AboutUs
    }
    if (Helper.hasProperty(requestBody, 'Logo')) {
        updateModel.Logo = requestBody.Logo
    }
    if (Helper.hasProperty(requestBody, 'ApiKey')) {
        updateModel.ApiKey = requestBody.ApiKey;
    }
    if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
        updateModel.DisplayPicture = requestBody.DisplayPicture
    }
    if (Helper.hasProperty(requestBody, 'Address')) {
        updateModel.Address = requestBody.Address
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


    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            ExternalId          : record.ExternalId,
            Name                : record.Name,
            Email               : record.Email,
            AboutUs             : record.AboutUs,
            Logo                : record.Logo,
            DisplayPicture      : record.DisplayPicture,
            OverallRating       : record.OverallRating,
            Address             : record.Address,
            ApiKey              : record.ApiKey,
            Facebook            : record.Facebook,
            Linkedin            : record.Linkedin,
            Twitter             : record.Twitter,
            Instagram           : record.Instagram,
            Yelp                : record.Yelp,
            IsActive            : record.IsActive,
           
        };
    };

    //This function returns a response DTO which has only public parameters

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            ExternalId          : record.ExternalId,
            Name                : record.Name,
            Email               : record.Email,
            Mobile              : record.Mobile,
            AboutUs             : record.AboutUs,
            Logo                : record.Logo,
            DisplayPicture      : record.DisplayPicture,
            OverallRating       : record.OverallRating,
            Address             : record.Address,
            ApiKey              : record.ApiKey,
            Facebook            : record.Facebook,
            Linkedin            : record.Linkedin,
            Twitter             : record.Twitter,
            Instagram           : record.Instagram,
            Yelp                : record.Yelp,
            IsActive            : record.IsActive,


        };
    };


}
