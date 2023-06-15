import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

export class AppointmentValidator {

static validateSearchRequest = async (query) => {
    try {
        const schema = joi.object({
            fromDate            : joi.date().iso().optional(),
            toDate              : joi.date().iso().optional(),
            businessUserId      : joi.string().guid({version : ['uuidv4']}).optional()
        });
            return await schema.validateAsync(query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}