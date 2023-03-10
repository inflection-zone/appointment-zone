import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { BusinessNodeHourService } from '../../database/repository.services/business.node.hour.service';
import { BusinessNodeHourCreateModel} from "../../domain.types/business.node.hour/business.node.hour.domain.types";


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class BusinessNodeHourValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().max(255).required(),
                Type                               : joi.string().max(255).required(),
                Day                                : joi.number().required(),
                Date                               : joi.date().iso().optional(),
                IsOpen                             : joi.boolean().optional().default('true'),
                Message                            : joi.string().max(255).optional(),
                StartTime                          : joi.date().iso().optional().default('10:00:00'), 
                EndTime                            : joi.date().iso().optional().default('21:00:00'),
                IsActive                           : joi.boolean().required().default('true'),
                IsDeleted                          : joi.boolean().required(),
               
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static getUserCreateModel = (requestBody): BusinessNodeHourCreateModel => {

        return {
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
    }

    // static getValidUserCreateModel = async (requestBody) => {

    //     const userService = new BusinessNodeHourService();

    //     // var password = requestBody.Password;
    //     // if (!password) {
    //     //     password = Helper.generatePassword();
    //     // }
    //     // else {
    //     //     userService.validatePasswordCriteria(password);
    //     // }
    //     // requestBody.Password = Helper.generateHashedPassword(password);

    //     //NOTE: please note that we are keeping user-name same as that of biocube id
    //     // var userName = requestBody.UserName;
    //     // if (!userName) {
    //     //     userName = await userService.generateUserNameIfDoesNotExist(requestBody.UserName);
    //     // }
    //     // requestBody.UserName = userName;

    //     // requestBody.CountryCode = requestBody.CountryCode ?? "+91";
    //     var userWithPhone = await userService.getBusinessUserWithMobile( requestBody.Mobile);
    //     if (userWithPhone) {
    //         ErrorHandler.throwDuplicateUserError(`User with phone ${requestBody.Mobile} already exists!`);
    //     }

    //     var userWithEmail = await userService.getBusinessUserWithEmail(requestBody.Email);
    //     if (userWithEmail) {
    //         ErrorHandler.throwDuplicateUserError(`User with email ${requestBody.Email} already exists!`);
    //     }

    //     var userCreateModel: BusinessNodeHourCreateModel = await this.getUserCreateModel(requestBody);
    //     return { userCreateModel};
    // }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().max(255).optional(),
                Type                               : joi.string().max(255).optional(),
                Day                                : joi.string().max(255).optional(),
                Date                               : joi.date().iso().optional(),
                IsOpen                             : joi.boolean().optional().default('true'),
                Message                            : joi.string().max(255).optional(),
                StartTime                          : joi.date().iso().optional().default('10:00:00'), 
                EndTime                            : joi.date().iso().optional().default('21:00:00'),
                IsActive                           : joi.boolean().optional().default('true'),
                IsDeleted                          : joi.boolean().optional(),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().max(255).optional(),
                Type                               : joi.string().max(255).optional(),
                Day                                : joi.number().optional(),
                Date                               : joi.date().iso().optional(),
                IsOpen                             : joi.boolean().optional().default('true'),
                Message                            : joi.string().max(255).optional(),
                StartTime                          : joi.date().iso().optional().default('10:00:00'), 
                EndTime                            : joi.date().iso().optional().default('21:00:00'),
                IsActive                           : joi.boolean().optional().default('true'),
                IsDeleted                          : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }



}