import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CustomerValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Prefix      : joi.string().max(16).optional(),
                FirstName   : joi.string().max(64).optional(),
                LastName    : joi.string().max(64).optional(),
                Mobile      : joi.string().max(16).min(6).required(),
                Email       : joi.string().max(256).required(),
                Gender      : joi.string().valid("Male", "Female", "Other").required(),
                BirthDate   : joi.string().optional(),
                Address     : joi.string().max(256).optional(),
                InAppUser   : joi.boolean().optional(),
                IsActive    : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

   
}
