import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { BusinessUserService } from '../../database/repository.services/business.user.service';
import { BusinessUserCreateModel} from "../../domain.types/business.user/business.user.domain.types";


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export class BusinessUsersValidator {

    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                BusinessNodeId                     : joi.string().max(255).required(),
                FirstName                          : joi.string().max(255).required(),
                LastName                           : joi.string().max(255).required(),
                Prefix                             : joi.string().max(255).required(),
                Mobile                             : joi.string().max(255).required(),
                Email                              : joi.string().max(255).required(),
                DisplayPicture                     : joi.string().optional(),
                AboutMe                            : joi.string().max(255).optional(),
                Qualification                      : joi.string().max(255).optional(),
                Experience                         : joi.string().optional(),              
                OverallRating                      : joi.number().optional(),
                Dob                                : joi.date().iso().optional(), 
                Gender                             : joi.string().required(),       
                IsAvailableForEmergency            : joi.boolean().optional().default('true'),
                Facebook                           : joi.string().max(255).optional(),
                Linkedin                           : joi.string().max(255).optional(),
                Twitter                            : joi.string().max(255).optional(),
                Instagram                          : joi.string().max(255).optional(),
                Yelp                               : joi.string().max(255).optional(),
                IsActive                           : joi.boolean().required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static getUserCreateModel = (requestBody): BusinessUserCreateModel => {

        return {
            BusinessNodeId                 : requestBody.BusinessNodeId,
            FirstName                      : requestBody.FirstName,
            LastName                       : requestBody.LastName,
            Prefix                         : requestBody.Prefix,
            Mobile                         : requestBody.Mobile,
            Email                          : requestBody.Email,
            Gender                         : requestBody.Gender,
            DisplayPicture                 : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            AboutMe                        : requestBody.AboutMe ? requestBody.AboutMe : null,
            Qualification                  : requestBody.Qualification ? requestBody.Qualification : null,
            Experience                     : requestBody.Experience ? requestBody.Experience : null,
            OverallRating                  : null,
            Dob                            : requestBody.Dob? requestBody.Dob: null,
            IsAvailableForEmergency        : requestBody.IsAvailableForEmergency ? requestBody.IsAvailableForEmergency : true,
            Facebook                       : requestBody.Facebook? requestBody.Facebook: null,
            Linkedin                       : requestBody.Linkedin? requestBody.Linkedin: null,
            Twitter                        : requestBody.Twitter? requestBody.Twitter: null,
            Instagram                      : requestBody.Instagram ? requestBody.Instagram : null,
            Yelp                           : requestBody.Yelp? requestBody.Yelp: null,
            IsActive                       : true
        };
    }

    static getValidUserCreateModel = async (requestBody) => {

        const userService = new BusinessUserService();

        var userWithPhone = await userService.getBusinessUserWithMobile( requestBody.Mobile);
        if (userWithPhone) {
            ErrorHandler.throwDuplicateUserError(`User with phone ${requestBody.Mobile} already exists!`);
        }

        var userWithEmail = await userService.getBusinessUserWithEmail(requestBody.Email);
        if (userWithEmail) {
            ErrorHandler.throwDuplicateUserError(`User with email ${requestBody.Email} already exists!`);
        }

        var userCreateModel: BusinessUserCreateModel = await this.getUserCreateModel(requestBody);
        return { userCreateModel};
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                businessNodeId                     : joi.string().max(255).optional(),
                firstName                          : joi.string().max(255).optional(),
                lastName                           : joi.string().max(255).optional(),
                prefix                             : joi.string().max(255).optional(),
                mobile                             : joi.string().max(255).optional(),
                email                              : joi.string().max(255).optional(),
                displayPicture                     : joi.string().optional(),
                aboutMe                            : joi.string().max(255).optional(),
                qualification                      : joi.string().max(255).optional(),
                experience                         : joi.string().optional(),              
                overallRating                      : joi.number().optional(),
                dob                                : joi.date().iso().optional(), 
                gender                             : joi.string().optional(),       
                isAvailableForEmergency            : joi.boolean().optional().default('true'),
                facebook                           : joi.string().max(255).optional(),
                linkedin                           : joi.string().max(255).optional(),
                twitter                            : joi.string().max(255).optional(),
                instagram                          : joi.string().max(255).optional(),
                yelp                               : joi.string().max(255).optional(),
                isActive                           : joi.boolean().optional(),
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
                FirstName                          : joi.string().max(255).optional(),
                LastName                           : joi.string().max(255).optional(),
                Prefix                             : joi.string().max(255).optional(),
                Mobile                             : joi.string().max(255).optional(),
                Email                              : joi.string().max(255).optional(),
                DisplayPicture                     : joi.string().optional(),
                AboutMe                            : joi.string().max(255).optional(),
                Qualification                      : joi.string().max(255).optional(),
                Experience                         : joi.string().optional(),              
                OverallRating                      : joi.number().optional(),
                Dob                                : joi.date().iso().optional(), 
                Gender                             : joi.string().optional(),       
                IsAvailableForEmergency            : joi.boolean().optional().default('true'),
                Facebook                           : joi.string().max(255).optional(),
                Linkedin                           : joi.string().max(255).optional(),
                Twitter                            : joi.string().max(255).optional(),
                Instagram                          : joi.string().max(255).optional(),
                Yelp                               : joi.string().max(255).optional(),
                IsActive                           : joi.boolean().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }
}