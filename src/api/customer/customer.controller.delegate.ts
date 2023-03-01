
///////////////////////////////////////////////////////////////////////////////////////

import { ApiError } from "../../common/api.error";
import { CustomerCreateModel, CustomerDto, CustomerUpdateModel, CustomerSearchFilters, CustomerSearchResults } from "../../domain.types/customer/customer.domain.types";
import { CustomerValidator as validator } from './customer.validator';
import { CustomerService } from '../../database/repository.services/customer.service';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/error.handler";
import { Helper } from "../../common/helper";
export class CustomerControllerDelegate {

    //#region member variables and constructors

    _service: CustomerService = null;


    constructor() {
        this._service = new CustomerService();
       
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);

        // eslint-DisplayPictureable-next-line @typescript-eslint/no-unused-vars
        var createModel: CustomerCreateModel = this.getCreateModel(requestBody);
        const record: CustomerDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create Customer!', 400);
        }

        // if (requestBody.CurrentCustomerId && dto.Email) {
        //     sendOnboardingEmail(dto, password)
        // }

        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: CustomerSearchFilters = this.getSearchFilters(query);
        var searchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        // searchResults.Items = items;
        return searchResults;
       
    }

    update = async (id: uuid ,requestBody: any) =>{
        await validator.validateUpdateRequest(requestBody);
        const record: CustomerDto = await this._service.getById(id);
        if (record === null) {
          ErrorHandler.throwNotFoundError(" Customer with id " + id.toString() + "cannot be found!");
        }
        const updateModel: CustomerUpdateModel = this.getUpdateModel(requestBody);
        const updated: CustomerDto = await this._service.update(id , updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update customer!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record: CustomerDto = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }
        const customerDeleted = await this._service.delete(id);
        return {
            Deleted : customerDeleted
        };
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): CustomerCreateModel => {
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
    };

    getSearchFilters = (query) => {
        var filters = {};
        var firstName = query.firstName ? query.firstName : null;
        if (firstName != null) {
            filters['FirstName'] = firstName;
        }
        var lastName = query.lastName ? query.lastName : null;
        if (lastName != null) {
            filters['LastName'] = lastName;
        }
        var mobile = query.mobile ? query.mobile : null;
        if (mobile != null) {
            filters['Mobile'] = mobile;
        }
        var email = query.email ? query.email : null;
        if (email != null) {
            filters['Email'] = email;
        }
        return filters;
    }

    //This function returns a response DTO which is enriched with available resource data

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            Prefix              : record.Prefix,
            FirstName           : record.FirstName,
            LastName            : record.LastName,
            Mobile              : record.Mobile,
            Email               : record.Email,
            Gender              : record.Gender,
            DisplayPicture      : record.DisplayPicture,
            BirthDate           : record.BirthDate,
            Address             : record.Address,
            IsActive            : record.IsActive,
            InAppUser           : record.InAppUser,
        };
    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            Prefix              : record.Prefix,
            FirstName           : record.FirstName,
            LastName            : record.LastName,
            Mobile              : record.Mobile,
            Email               : record.Email,
            Gender              : record.Gender,
            DisplayPicture      : record.DisplayPicture,
            BirthDate           : record.BirthDate,
            Address             : record.Address,
            IsActive            : record.IsActive,
            InAppUser           : record.InAppUser,
            CreatedAt           : record.createdAt,
            UpdatedAt           : record.updatedAt,
            DeletedOn           : record.DeletedOn,
            IsDeleted           : record.IsDeleted
        };
    };

    getUpdateModel = (requestBody): CustomerUpdateModel => {

        let updateModel: CustomerUpdateModel = {};

    if (Helper.hasProperty(requestBody, 'Prefix')) {
        updateModel.Prefix = requestBody.Prefix;
    }
    if (Helper.hasProperty(requestBody, ' FirstName')) {
        updateModel. FirstName = requestBody. FirstName;
    }
    if (Helper.hasProperty(requestBody, 'LastName')) {
        updateModel.LastName = requestBody.LastName;
    }
    if (Helper.hasProperty(requestBody, 'Mobile')) {
        updateModel.Mobile = requestBody.Mobile;
    }
    if (Helper.hasProperty(requestBody, 'Email')) {
        updateModel.Email = requestBody.Email
    }
    if (Helper.hasProperty(requestBody, 'Gender')) {
        updateModel.Gender = requestBody.Gender;
    }
    if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
        updateModel.DisplayPicture = requestBody.DisplayPicture;
    }
    if (Helper.hasProperty(requestBody, 'BirthDate')) {
        updateModel.BirthDate = requestBody.BirthDate;
    }
    if (Helper.hasProperty(requestBody, 'Address')) {
        updateModel.Address = requestBody.Address
    }
    if (Helper.hasProperty(requestBody, 'IsActive')) {
        updateModel.IsActive = requestBody.IsActive;
    }
    if (Helper.hasProperty(requestBody, 'InAppUser')) {
        updateModel.InAppUser = requestBody.InAppUser;
    }
   
    return updateModel;
}



}
