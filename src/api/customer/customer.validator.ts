import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';
import { CustomerCreateModel, CustomerDto, CustomerUpdateModel, CustomerSearchFilters, CustomerSearchResults } from "../../domain.types/customer/customer.domain.types";
import { CustomerService } from '../../database/repository.services/customer.service';

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
                DisplayPicture: joi.string().optional(),
                Address     : joi.string().max(256).optional(),
                InAppUser   : joi.boolean().required(),
                IsActive    : joi.boolean().required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static getCustomerCreateModel = (requestBody): CustomerCreateModel => {

        return {
            Prefix          : requestBody.Prefix ? requestBody.Prefix : null,
            FirstName       : requestBody.FirstName? requestBody.FirstName: null,
            LastName        : requestBody.LastName ? requestBody.LastName : null,
            Mobile          : requestBody.Mobile? requestBody.Mobile: null,
            Email           : requestBody.Email ? requestBody.Email : null,
            BirthDate       : requestBody.BirthDate? requestBody.BirthDate:new Date(),
            Gender          : requestBody.Gender ? requestBody.Gender : null,
            DisplayPicture  : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            Address         : requestBody.Address ? requestBody.Address : null,
            IsActive        : requestBody.IsActive ? requestBody.IsActive : null,
            InAppUser       : requestBody.InAppUser ? requestBody.InAppUser : null,

        };
    }

    static getValidCustomerCreateModel = async (requestBody) => {

        const validCustomerService = new CustomerService();
        var customerWithMobile = await validCustomerService.getCustomerWithMobile( requestBody.Mobile);
        if (customerWithMobile) {
            ErrorHandler.throwDuplicateUserError(`User with phone ${requestBody.Mobile} already exists!`);
        }

        var customerWithEmail = await validCustomerService.getCustomerWithEmail(requestBody.Email);
        if (customerWithEmail) {
            ErrorHandler.throwDuplicateUserError(`User with email ${requestBody.Email} already exists!`);
        }

        var CreateModel: CustomerCreateModel = await this.getCustomerCreateModel(requestBody);
        return { CreateModel};
    }

    static validateSearchRequest = async (query) => {
        try {
            const schema = joi.object({
                firstName    : joi.string().max(256).optional(),
                lastName     : joi.string().max(256).optional(),
                mobile       : joi.string().max(16).min(6).optional(),
                email        : joi.string().max(256).optional(),
                pageIndex    : joi.number().min(0).optional(),
                itemsPerPage : joi.number().min(1).optional(),
                orderBy      : joi.string().max(256).optional(),
                order        : joi.string().valid('ascending', 'descending')
                    .optional()
                    .error(()=> new Error("order param: 'ascending' and 'descending' are the only valid values.")),
            });
            return await schema.validateAsync(query);

        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                Prefix      : joi.string().max(16).optional(),
                FirstName   : joi.string().max(64).optional(),
                LastName    : joi.string().max(64).optional(),
                Mobile      : joi.string().max(16).min(6).required(),
                Email       : joi.string().max(256).required(),
                Gender      : joi.string().valid("Male", "Female", "Other").required(),
                BirthDate   : joi.string().optional(),
                DisplayPicture: joi.string().optional(),
                Address     : joi.string().max(256).optional(),
                InAppUser   : joi.boolean().required(),
                IsActive    : joi.boolean().required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

   
}
