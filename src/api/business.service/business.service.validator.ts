import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessServiceValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                AllowCancellation            : joi.boolean().required(),
                CancellationCharges          : joi.number().max(255).required(),
                CancellationWindow           : joi.string().max(255).required(),
                Description                  : joi.string().max(255).optional(),
                DisplayServicePicture        : joi.string().optional().allow(null, ''),
                EnableLoyalty                : joi.boolean().required(),
                Fees                         : joi.number().max(255).required(),
                IsActive                     : joi.boolean().required(),
                IsTaxable                    : joi.boolean().required(),
                Name                         : joi.string().max(255).required(),
                PaymentPercent               : joi.number().max(255).required(),
                PaymentRequired              : joi.boolean().required(),
                PriorBookingWindow           : joi.string().max(255).required(),
                ReminderType                 : joi.string().max(255).optional(),
                ReminderWindow               : joi.string().max(255).optional(),
                SendReminder                 : joi.boolean().required(),
                ServiceDuration              : joi.string().max(255).required(),
                TaxRate                      : joi.number().max(255).required(),
           
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateSearchRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                businessNodeId                : joi.string().guid({version : ['uuidv4'] }).optional(),
                // allowCancellation            : joi.boolean().optional(),
                // cancellationCharges          : joi.number().max(255).optional(),
                // cancellationWindow           : joi.string().max(255).optional(),
                // description                  : joi.string().max(255).optional(),
                // displayServicePicture        : joi.string().optional().allow(null, ''),
                // enableLoyalty                : joi.boolean().optional(),
                // fees                         : joi.number().max(255).optional(),
                isActive                     : joi.boolean().optional(),
                // isTaxable                    : joi.boolean().optional(),
                name                         : joi.string().max(255).optional(),
                // paymentPercent               : joi.number().max(255).optional(),
                // paymentRequired              : joi.boolean().optional(),
                // priorBookingWindow           : joi.string().max(255).optional(),
                // reminderType                 : joi.string().max(255).optional(),
                // reminderWindow               : joi.string().max(255).optional(),
                // sendReminder                 : joi.boolean().optional(),
                // serviceDuration              : joi.string().max(255).optional(),
                //taxRate                      : joi.number().max(255).optional(),
           



            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId               : joi.string().guid({version : ['uuidv4'] }).optional(),
                AllowCancellation            : joi.boolean().optional(),
                CancellationCharges          : joi.number().max(255).optional(),
                CancellationWindow           : joi.string().max(255).optional(),
                Description                  : joi.string().max(255).optional(),
                DisplayServicePicture        : joi.string().optional().allow(null, ''),
                EnableLoyalty                : joi.boolean().optional(),
                Fees                         : joi.number().max(255).optional(),
                IsActive                     : joi.boolean().optional(),
                IsTaxable                    : joi.boolean().optional(),
                Name                         : joi.string().max(255).optional(),
                PaymentPercent               : joi.number().max(255).optional(),
                PaymentRequired              : joi.boolean().optional(),
                PriorBookingWindow           : joi.string().max(255).optional(),
                ReminderType                 : joi.string().max(255).optional(),
                ReminderWindow               : joi.string().max(255).optional(),
                SendReminder                 : joi.boolean().optional(),
                ServiceDuration              : joi.string().max(255).optional(),
                TaxRate                      : joi.number().max(255).optional(),
           

            })
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
