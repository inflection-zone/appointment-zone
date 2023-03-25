import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessUserHourValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId      : joi.string().guid({version : ['uuidv4'] }).required(),
                Type                : joi.string().required(),
                Day                 : joi.number().integer().required(),
                Date                : joi.date().iso().optional(),
                IsOpen              : joi.boolean().required(),
                Message             : joi.string().max(255).optional(),
                StartTime           : joi.date().required(),
                EndTime             : joi.date().required(),
                IsActive            : joi.boolean().required(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    // static validateCreateManyRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    static validateSearchRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                businessUserId      : joi.string().guid({version : ['uuidv4'] }).optional(),
                isActive            : joi.boolean().optional(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessUserId      : joi.string().guid({version : ['uuidv4'] }).optional(),
                Type                : joi.string().optional(),
                Day                 : joi.number().integer().optional(),
                Date                : joi.date().iso().optional(),
                IsOpen              : joi.boolean().optional(),
                Message             : joi.string().max(255).optional(),
                StartTime           : joi.date().iso().optional(),
                EndTime             : joi.date().iso().optional(),
                IsActive            : joi.boolean().optional(), 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}