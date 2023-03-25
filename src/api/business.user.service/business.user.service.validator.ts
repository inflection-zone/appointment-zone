import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserServiceValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                BusinessServiceId            : joi.string().guid({version : ['uuidv4'] }).optional(),
                IsActive                     : joi.boolean().required(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateCreateManyRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                BusinessServiceId            : joi.string().guid({version : ['uuidv4'] }).optional(),
                IsActive                     : joi.boolean().required(),  
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                businessUserId               : joi.string().max(36).guid({version : ['uuidv4'] }).optional(),
                businessServiceId            : joi.string().max(36).guid({version : ['uuidv4'] }).optional(),
                isActive                     : joi.boolean().optional(),
                
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId               : joi.string().max(36).optional(),
                BusinessServiceId            : joi.string().max(36).optional(),
                IsActive                     : joi.boolean().optional(),
                
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}