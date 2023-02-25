import { ApiError } from "../../common/api.error";
import { BusinessNodeCreateModel, BusinessNodeUpdateModel, BusinessNodeDto,BusinessNodeSearchFilters, BusinessNodeSearchResults  } from "../../domain.types/business.node/business.node.domain.types";
import { BusinessNodesValidator as validator } from './business.node.validator';
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

        // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
        var createModel: BusinessNodeCreateModel = this.getCreateModel(requestBody);
        const record: BusinessNodeDto = await this._service.create(createModel);
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



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessNodeCreateModel => {
        return {
            // id                        : requestBody.id? requestBody.id : null ,
            BusinessId                : requestBody.BusinessId? requestBody.BusinessId:null,
            Name                      : requestBody.Name? requestBody.Name: null,
            Mobile                    : requestBody.Mobile? requestBody.Mobile: null,
            Email                     : requestBody.Email ? requestBody.Email : null,
            DisplayPicture            : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            Address                   : requestBody.Address ? requestBody.Address : null,
            Longitude                 : requestBody.Longitude ? requestBody.Longitude : null,
            Lattitude                 : requestBody.Lattitude ? requestBody.Lattitude : null,
            OverallRating             : requestBody.OverallRating? requestBody.OverallRating: null,
            // TimeZone                  : requestBody.TimeZone ? requestBody.TimeZone : undefined,
            AllowWalkinAppointments   : requestBody.AllowWalkinAppointments ? requestBody.AllowWalkinAppointments :null,
            AllowFutureBookingFor     : requestBody.AllowFutureBookingFor ? requestBody.AllowFutureBookingFor : '30d',
            IsActive                  : requestBody.IsActive ? requestBody.IsActive : true,
           
        };
    };


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
            // TimeZone                  : record.TimeZone,
            AllowWalkinAppointments   : record.AllowWalkinAppointments,
            AllowFutureBookingFor     : record.AllowFutureBookingFor,
            IsActive                  : record.IsActive,
           
        };
    };


}
