import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
///////////////////////////////////////////////////////////////////////////////////////////////

export class NotificationValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Body                : joi.string().max(255).optional(),
    	        BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            CustomerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                IsRead              : joi.boolean().required(),   
                IsSent              : joi.boolean().required(),
                Message             : joi.string().max(255).required(),
                ReadOn              : joi.date().iso().optional(),
                SentOn              : joi.date().iso().optional(),
                Title               : joi.string().max(255).optional(),
                Type                : joi.string().max(255).optional(),
                TypeId              : joi.number().optional(),
                IsActive            : joi.boolean().required() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        businessNodeId      : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            customerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                isActive            : joi.boolean().optional() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Body                : joi.string().max(255).optional(),
    	        BusinessNodeId      : joi.string().guid({version : ['uuidv4'] }).optional(),              
  	            CustomerId          : joi.string().guid({version : ['uuidv4'] }).optional(),
                IsRead              : joi.boolean().optional(),   
                IsSent              : joi.boolean().optional(),
                Message             : joi.string().max(255).optional(),
                ReadOn              : joi.date().iso().optional(),
                SentOn              : joi.date().iso().optional(),
                Title               : joi.string().max(255).optional(),
                Type                : joi.string().max(255).optional(),
                TypeId              : joi.number().optional(),
                IsActive            : joi.boolean().optional() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}