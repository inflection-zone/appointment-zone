
///////////////////////////////////////////////////////////////////////////////////////

import { ApiError } from "../../common/api.error";
import { CustomerCreateModel, CustomerDto } from "../../domain.types/customer/customer.domain.types";
import { CustomerValidator as validator } from './customer.validator';
import { CustomerService } from '../../database/repository.services/customer.service';
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
            BirthDate           : record.BirthDate,
            Address             : record.Address,
        };
    };

    //This function returns a response DTO which has only public parameters

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id          : record.id,
            RoleId      : record.RoleId,
            CustomerName    : record.CustomerName,
            Prefix      : record.Prefix,
            FirstName   : record.FirstName,
            LastName    : record.LastName,
            CountryCode : record.CountryCode,
            Mobile       : record.Mobile,
            Email       : record.Email,
            Gender      : record.Gender,
            BirthDate   : record.BirthDate,
        };
    };


}
