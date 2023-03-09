import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
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
            BusinessNodeId                 : requestBody.BusinessNodeId? requestBody.BusinessNodeId:null,
            FirstName                      : requestBody.FirstName? requestBody.FirstName: null,
            LastName                       : requestBody.LastName? requestBody.LastName: null,
            Prefix                         : requestBody.Prefix? requestBody.Prefix: null,
            Mobile                         : requestBody.Mobile? requestBody.Mobile: null,
            Email                          : requestBody.Email ? requestBody.Email : null,
            DisplayPicture                 : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            AboutMe                        : requestBody.AboutMe ? requestBody.AboutMe : null,
            Qualification                  : requestBody.Qualification ? requestBody.Qualification : null,
            Experience                     : requestBody.Experience ? requestBody.Experience : null,
            OverallRating                  : requestBody.OverallRating? requestBody.OverallRating: null,
            Dob                            : requestBody.Dob? requestBody.Dob: null,
            Gender                         : requestBody.Gender ? requestBody.Gender : undefined,
            IsAvailableForEmergency        : requestBody.IsAvailableForEmergency ? requestBody.IsAvailableForEmergency :true,
            Facebook                       : requestBody.Facebook? requestBody.Facebook: null,
            Linkedin                       : requestBody.Linkedin? requestBody.Linkedin: null,
            Twitter                        : requestBody.Twitter? requestBody.Twitter: null,
            Instagram                      : requestBody.Instagram ? requestBody.Instagram : null,
            Yelp                           : requestBody.Yelp? requestBody.Yelp: null,
            IsActive                       : requestBody.IsActive ? requestBody.IsActive : true
        };
    }

    static getValidUserCreateModel = async (requestBody) => {

        const userService = new BusinessUserService();

        // var password = requestBody.Password;
        // if (!password) {
        //     password = Helper.generatePassword();
        // }
        // else {
        //     userService.validatePasswordCriteria(password);
        // }
        // requestBody.Password = Helper.generateHashedPassword(password);

        //NOTE: please note that we are keeping user-name same as that of biocube id
        // var userName = requestBody.UserName;
        // if (!userName) {
        //     userName = await userService.generateUserNameIfDoesNotExist(requestBody.UserName);
        // }
        // requestBody.UserName = userName;

        // requestBody.CountryCode = requestBody.CountryCode ?? "+91";
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