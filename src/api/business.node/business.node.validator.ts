import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

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

}