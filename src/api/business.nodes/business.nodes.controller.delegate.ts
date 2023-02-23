import { ApiError } from "../../common/api.error";
import { BusinessNodesCreateModel, BusinessNodesUpdateModel, BusinessNodesDto,BusinessNodesSearchFilters, BusinessNodesSearchResults  } from "../../domain.types/business.nodes/business.nodes.domain.types";
import { BusinessNodesValidator as validator } from './business.nodes.validator';
import { BusinessNodesService } from '../../database/repository.services/business.nodes.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import * as apikeyGenerator from 'uuid-apikey';
import { query } from "express";



export class BusinessNodesControllerDelegate {

    //#region member variables and constructors

    _service: BusinessNodesService = null;


    constructor() {
        this._service = new BusinessNodesService();
       
    }

    //#endregion

    // create = async (requestBody: any) => {

    //     await validator.validateCreateRequest(requestBody);

    //     // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
    //     var createModel: BusinessNodesCreateModel = this.getCreateModel(requestBody);
    //     const record: BusinessNodesDto = await this._service.create(createModel);
    //     if (record === null) {
    //         throw new ApiError('Unable to create Business!', 400);
    //     }

    //     return this.getEnrichedDto(record);
    // };



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     getCreateModel = (requestBody): BusinessNodesCreateModel => {
//         return {
//             BusinessId          : requestBody.BusinessId? requestBody.
//             Name                : requestBody.Name? requestBody.Name: null,
//             Mobile              : requestBody.Mobile? requestBody.Mobile: null,
//             Email               : requestBody.Email ? requestBody.Email : null,
           
//             DisplayPicture      : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
//             OverallRating       : requestBody.OverallRating? requestBody.OverallRating: null,
//             Address             : requestBody.Address ? requestBody.Address : null,
            
//             IsActive            : requestBody.IsActive ? requestBody.IsActive : true,
           
//         };
//     };


}
