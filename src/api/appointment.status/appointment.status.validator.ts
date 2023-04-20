import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
///////////////////////////////////////////////////////////////////////////////////////////////

export class AppointmentStatusValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),              
                IsCancellationStatus    : joi.boolean().required(),
                IsCompletedStatus       : joi.boolean().required(),   
                IsConfirmedStatus       : joi.boolean().required(),
                IsDashboardStatus       : joi.boolean().required(),
                IsWalkinEntryStatus     : joi.boolean().required(),
                NotificationText        : joi.string().optional(),
                SendNotification        : joi.boolean().required(),
                SendSms                 : joi.boolean().required(),
                Sequence                : joi.number().optional(),
                SmsText                 : joi.string().max(255).optional(),
                Status                  : joi.string().max(255).optional(),
                StatusCode              : joi.string().max(255).optional(),
                StatusColor             : joi.string().optional(),
                IsActive                : joi.boolean().required() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        businessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
    	        BusinessNodeId          : joi.string().guid({version : ['uuidv4'] }).optional(),              
                IsCancellationStatus    : joi.boolean().optional(),
                IsCompletedStatus       : joi.boolean().optional(),   
                IsConfirmedStatus       : joi.boolean().optional(),
                IsDashboardStatus       : joi.boolean().optional(),
                IsWalkinEntryStatus     : joi.boolean().optional(),
                NotificationText        : joi.string().optional(),
                SendNotification        : joi.boolean().optional(),
                SendSms                 : joi.boolean().optional(),
                Sequence                : joi.number().optional(),
                SmsText                 : joi.string().max(255).optional(),
                Status                  : joi.string().max(255).optional(),
                StatusCode              : joi.string().max(255).optional(),
                StatusColor             : joi.string().optional(),
                IsActive                : joi.boolean().optional() 
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}