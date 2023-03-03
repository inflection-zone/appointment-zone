import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { BusinessNodeService } from '../../database/repository.services/business.node.service';
import { BusinessNodeCreateModel} from "../../domain.types/business.node/business.node.domain.types";


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class BusinessNodesValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessId               : joi.string().max(255).optional(),
                Name                     : joi.string().max(255).required(),
                Mobile                   : joi.string().max(255).required(),
                Email                    : joi.string().max(255).required(),
                DisplayPicture           : joi.string().optional(),
                Address                  : joi.string().max(255).optional(),
                Longitude                : joi.string().optional(),              //doubt
                Lattitude                : joi.string().optional(),             //doubt
                OverallRating            : joi.number().optional(),
                TimeZone                 : joi.date().iso().optional(),         //doubt
                AllowWalkinAppointments  : joi.boolean().required(),
                AllowFutureBookingFor    : joi.string().max(255).optional(),
                IsActive                 : joi.boolean().required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static getNodeCreateModel = (requestBody): BusinessNodeCreateModel => {

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
            IsActive                  : requestBody.IsActive ? requestBody.IsActive : true
        };
    }

    static getValidNodeCreateModel = async (requestBody) => {

        const nodeService = new BusinessNodeService();

        // var password = requestBody.Password;
        // if (!password) {
        //     password = Helper.generatePassword();
        // }
        // else {
        //     userService.validatePasswordCriteria(password);
        // }
        // requestBody.Password = Helper.generateHashedPassword(password);

        //NOTE: please note that we are keeping user-name same as that of biocube id
        // var userName = requestBody.UserName;
        // if (!userName) {
        //     userName = await userService.generateUserNameIfDoesNotExist(requestBody.UserName);
        // }
        // requestBody.UserName = userName;

        // requestBody.CountryCode = requestBody.CountryCode ?? "+91";
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
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                BusinessId               : joi.string().max(255).optional(),
                Name                     : joi.string().max(255).optional(),
                Mobile                   : joi.string().max(255).optional(),
                Email                    : joi.string().max(255).optional(),
                DisplayPicture           : joi.string().optional(),
                Address                  : joi.string().max(255).optional(),
                Longitude                : joi.string().optional(),             
                Lattitude                : joi.string().optional(),            
                OverallRating            : joi.number().optional(),
                TimeZone                 : joi.date().iso().optional(),      
                AllowWalkinAppointments  : joi.boolean().optional(),
                AllowFutureBookingFor    : joi.string().max(255).optional(),
                IsActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessId               : joi.string().max(255).optional(),
                Name                     : joi.string().max(255).optional(),
                Mobile                   : joi.string().max(255).optional(),
                Email                    : joi.string().max(255).optional(),
                DisplayPicture           : joi.string().optional(),
                Address                  : joi.string().max(255).optional(),
                Longitude                : joi.string().optional(),             
                Lattitude                : joi.string().optional(),            
                OverallRating            : joi.number().optional(),
                TimeZone                 : joi.date().iso().optional(),      
                AllowWalkinAppointments  : joi.boolean().optional(),
                AllowFutureBookingFor    : joi.string().max(255).optional(),
                IsActive                 : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }
   
}


