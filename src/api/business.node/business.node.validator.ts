import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { BusinessNodeService } from '../../database/repository.services/business.node.service';
import { BusinessNodeCreateModel} from "../../domain.types/business.node/business.node.domain.types";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessNodesValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessId               : joi.string().guid({version : ['uuidv4'] }).required(),
                Name                     : joi.string().max(255).required(),
                Mobile                   : joi.string().max(255).required(),
                Email                    : joi.string().max(255).required(),
                DisplayPicture           : joi.string().optional(),
                Address                  : joi.string().max(255).required(),
                Longitude                : joi.string().optional(),              
                Lattitude                : joi.string().optional(),             
                OverallRating            : joi.number().optional(),
                TimeZone                 : joi.string().optional(),         
                AllowWalkinAppointments  : joi.boolean().required(),
                AllowFutureBookingFor    : joi.string().max(255).optional(),
                IsActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static getNodeCreateModel = (requestBody): BusinessNodeCreateModel => {
        return {
            BusinessId                : requestBody.BusinessId,
            Name                      : requestBody.Name,
            Mobile                    : requestBody.Mobile,
            Email                     : requestBody.Email,
            Address                   : requestBody.Address,
            DisplayPicture            : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            Longitude                 : requestBody.Longitude ? requestBody.Longitude : null,
            Lattitude                 : requestBody.Lattitude ? requestBody.Lattitude : null,
            OverallRating             : requestBody.OverallRating? requestBody.OverallRating: null,
            TimeZone                  : requestBody.TimeZone ? requestBody.TimeZone : "+05:30",
            AllowWalkinAppointments   : requestBody.AllowWalkinAppointments ? requestBody.AllowWalkinAppointments :true,
            AllowFutureBookingFor     : requestBody.AllowFutureBookingFor ? requestBody.AllowFutureBookingFor : '30d',
            IsActive                  : true,
        };
    };

    static getValidNodeCreateModel = async (requestBody) => {

        const nodeService = new BusinessNodeService();

        var nodeWithPhone = await nodeService.getBusinessNodeWithMobile( requestBody.Mobile);
        if (nodeWithPhone) {
            ErrorHandler.throwDuplicateUserError(`User with phone ${requestBody.Mobile} already exists!`);
        }

        var nodeWithEmail = await nodeService.getBusinessNodeWithEmail(requestBody.Email);
        if (nodeWithEmail) {
            ErrorHandler.throwDuplicateUserError(`User with email ${requestBody.Email} already exists!`);
        }

        var nodeCreateModel: BusinessNodeCreateModel = await this.getNodeCreateModel(requestBody);
        return { nodeCreateModel};
    };

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                businessId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                name                     : joi.string().max(255).optional(),
                mobile                   : joi.string().max(255).optional(),
                email                    : joi.string().max(255).optional(),
                displayPicture           : joi.string().optional(),
                address                  : joi.string().max(255).optional(),
                longitude                : joi.string().optional(),             
                lattitude                : joi.string().optional(),            
                overallRating            : joi.number().optional(),
                timeZone                 : joi.string().optional(),      
                allowWalkinAppointments  : joi.boolean().optional(),
                allowFutureBookingFor    : joi.string().max(255).optional(),
                isActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessId               : joi.string().guid({version : ['uuidv4'] }).required(),
                Name                     : joi.string().max(255).optional(),
                Mobile                   : joi.string().max(255).optional(),
                Email                    : joi.string().max(255).optional(),
                DisplayPicture           : joi.string().optional(),
                Address                  : joi.string().max(255).optional(),
                Longitude                : joi.string().optional(),             
                Lattitude                : joi.string().optional(),            
                OverallRating            : joi.number().optional(),
                TimeZone                 : joi.string().optional(),      
                AllowWalkinAppointments  : joi.boolean().optional(),
                AllowFutureBookingFor    : joi.string().max(255).optional(),
                IsActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
   
}


