import { ApiError } from "../../common/api.error";
import { BusinessUserUpdateModel, BusinessUserDto,BusinessUserSearchFilters, BusinessUserSearchResults  } from "../../domain.types/business.user/business.user.domain.types";
import { BusinessUsersValidator, BusinessUsersValidator as validator } from '../business.user/business.user.validator';
import { BusinessUserService } from '../../database/repository.services/business.user.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { BusinessNodeService } from "../../database/repository.services/business.node.service";

export class BusinessUserControllerDelegate {

    //#region member variables and constructors
    prisma = PrismaClientInit.instance().prisma();
    public static instance:BusinessNodeHourService=null;

    _service: BusinessUserService = null;

    _businessNodeService: BusinessNodeService

    constructor() {
        this._service = new BusinessUserService();
        this._businessNodeService = new BusinessNodeService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
        const { userCreateModel } =
            await BusinessUsersValidator.getValidUserCreateModel(requestBody);
        const record: BusinessUserDto = await this._service.create(userCreateModel);
        if (record === null) {
            throw new ApiError('Unable to create Business node!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
       var res = await validator.validateSearchRequest(query);
        var businessNodeId = query.businessNodeId != 'undefined' ? query.businessNodeId : null;
        var businessId = query.businessId != 'undefined' ? query.businessId : null;
        var businessServiceId = query.businessServiceId != 'undefined' ? query.businessServiceId : null;
        var name = query.name ? query.name : null;

        let users = [];
        if (businessNodeId == null && businessId != null) {
            var nodes = await this.prisma.business_nodes.findMany({
                where : {
                    IsActive : true,
                    BusinessId : businessId,
                },
            });
            for await (const node of nodes) {
                var nodeUsers = await this.prisma.business_users.findMany({
                where : {
                        IsActive : true,
                        BusinessNodeId : node.id,
                    },
                });
                if (nodeUsers.length > 0) {
                    users.push(...nodeUsers)
                }
            }
        }
        else if (businessNodeId != null) {
            var node = await this._businessNodeService.getById(businessNodeId);
            var nodeUsers = await this.prisma.business_users.findMany({
                where : {
                    IsActive : true,
                    BusinessNodeId : node.id,
                }
            })
            if (nodeUsers.length > 0) {
                users.push(...nodeUsers)
            }
        }
        else if (businessNodeId == null && businessId == null) {
            users = await this.prisma.business_users.findMany({
             where : { IsActive : true },
            });
        }

        if (name != null) {
            var usersWithMatchingNames = [];
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                var nameTemp = name.toLowerCase();
                var firstNameLower = user.FirstName.toLowerCase();
                var lastNameLower = user.LastName.toLowerCase();
                if (firstNameLower.includes(nameTemp) || 
                    lastNameLower.includes(nameTemp) ||
                    nameTemp.includes(firstNameLower) ||
                    nameTemp.includes(lastNameLower) ||
                    nameTemp == firstNameLower + ' ' + lastNameLower) {
                    usersWithMatchingNames.push(user);
                }
            }
            users = usersWithMatchingNames;
        }

        if (businessServiceId != null) {
            var usersWithServices = [];
            var userServices = await this.prisma.business_user_services.findMany({
                where : { BusinessServiceId : businessServiceId },
            });

            if (userServices.length > 0) {
                var userIds = userServices.map((el) => {
                    return el.BusinessUserId;
                });
                for (var user of users) {
                    if (userIds.includes(user.id)) {
                        usersWithServices.push(user);
                    }
                }
            }
            users = usersWithServices;
        }
       // var filters: BusinessUserSearchFilters = this.getSearchFilters(query);
        var searchResults : BusinessUserSearchResults = await this._service.search(users);
        var items = searchResults.Items.map(x => this.getPublicDto(x));
        searchResults.Items = items;
        return searchResults;
       
    }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business node with id ' + id.toString() + ' cannot be found!');
        }
        if (Helper.hasProperty(requestBody, 'Mobile')) {
            var mobile = requestBody.Mobile;
            var otherEntity = await this._service.getBusinessUserWithMobile(mobile);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business user with mobile ${requestBody.Mobile} already exists!`);
            }
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            var email = requestBody.Email;
            var otherEntity = await this._service.getBusinessUserWithEmail(email);
            if(otherEntity != null && otherEntity.id != record.id) {
                ErrorHandler.throwDuplicateUserError(`Business user with email ${requestBody.Email} already exists!`);
            }
        }
        const updateModel: BusinessUserUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Business node!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business node with id ' + id.toString() + ' cannot be found!');
        }
        const businessuserDeleted = await this._service.delete(id);
        return {
            Deleted: businessuserDeleted
        };

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getSearchFilters = (query) => {
        var filters = {};

        var businessNodeId = query.businessNodeId != 'undefined' ? query.businessNodeId : null;
        if (businessNodeId != null) {
            filters['BusinessNodeId'] = businessNodeId;
        } 
        var businessId = query.businessId != 'undefined' ? query.businessId : null;
        if (businessId != null) {
            filters['BusinessId'] = businessId;
        } 
        var businessServiceId = query.businessServiceId != 'undefined' ? query.businessServiceId : null;
        if (businessServiceId != null) {
            filters['BusinessServiceId'] = businessServiceId;
        } 
        var name = query.name ? query.name : null;
        if (name != null) {
            filters['Name'] = name;
        }
        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : null;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = itemsPerPage;
        }
        var order = query.order ? query.order : null;
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    }



    getUpdateModel = (requestBody): BusinessUserUpdateModel => {

        let updateModel: BusinessUserUpdateModel = {};

    if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
        updateModel.BusinessNodeId = requestBody.BusinessNodeId;
    }
    if (Helper.hasProperty(requestBody, 'FirstName')) {
        updateModel.FirstName = requestBody.FirstName;
    }
    if (Helper.hasProperty(requestBody, 'LastName')) {
        updateModel.LastName = requestBody.LastName;
    }
    if (Helper.hasProperty(requestBody, 'Prefix')) {
        updateModel.Prefix = requestBody.Prefix;
    }
    if (Helper.hasProperty(requestBody, 'Mobile')) {
        updateModel.Mobile = requestBody.Mobile;
    }
    if (Helper.hasProperty(requestBody, 'Email')) {
        updateModel.Email = requestBody.Email;
    }
    if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
        updateModel.DisplayPicture = requestBody.DisplayPicture;
    }
    if (Helper.hasProperty(requestBody, 'AboutMe')) {
        updateModel.AboutMe = requestBody.AboutMe;
    }
    if (Helper.hasProperty(requestBody, 'Qualification')) {
        updateModel.Qualification = requestBody.Qualification;
    }
    if (Helper.hasProperty(requestBody, 'Experience')) {
        updateModel.Experience = requestBody.Experience;
    }
    if (Helper.hasProperty(requestBody, 'Dob')) {
        updateModel.Dob = requestBody.Dob;
    }
    if (Helper.hasProperty(requestBody, 'Gender')) {
        updateModel.Gender = requestBody.Gender;
    }
    if (Helper.hasProperty(requestBody, 'IsAvailableForEmergency')) {
        updateModel.IsAvailableForEmergency = requestBody.IsAvailableForEmergency;
    }
    if (Helper.hasProperty(requestBody, 'Facebook')) {
        updateModel.Facebook = requestBody.Facebook;
    }
    if (Helper.hasProperty(requestBody, 'Linkedin')) {
        updateModel.Linkedin = requestBody.Linkedin;
    }
    if (Helper.hasProperty(requestBody, 'Twitter')) {
        updateModel.Twitter = requestBody.Twitter;
    }
    if (Helper.hasProperty(requestBody, 'Instagram')) {
        updateModel.Instagram = requestBody.Instagram;
    }
    if (Helper.hasProperty(requestBody, 'Yelp')) {
        updateModel.Yelp = requestBody.Yelp;
    }
    if (Helper.hasProperty(requestBody, 'IsActive')) {
        updateModel.IsActive = requestBody.IsActive;
    }
    return updateModel;
}


    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            FirstName                      : record.FirstName,
            LastName                       : record.LastName,
            Prefix                         : record.Prefix,
            Mobile                         : record.Mobile,
            Email                          : record.Email,
            DisplayPicture                 : record.DisplayPicture,
            AboutMe                        : record.AboutMe,
            Qualification                  : record.Qualification,
            Experience                     : record.Experience,
            OverallRating                  : record.OverallRating,
            Dob                            : record.Dob,
            Gender                         : record.Gender,
            IsAvailableForEmergency        : record.IsAvailableForEmergency,
            Facebook                       : record.Facebook,
            Linkedin                       : record.Linkedin,
            Twitter                        : record.Twitter,
            Instagram                      : record.Instagram,
            Yelp                           : record.Yelp,
            IsActive                       : record.IsActive
           
        };
    };

    getPublicDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                             : record.id,
            BusinessNodeId                 : record.BusinessNodeId,
            FirstName                      : record.FirstName,
            LastName                       : record.LastName,
            Prefix                         : record.Prefix,
            Mobile                         : record.Mobile,
            Email                          : record.Email,
            DisplayPicture                 : record.DisplayPicture,
            AboutMe                        : record.AboutMe,
            Qualification                  : record.Qualification,
            Experience                     : record.Experience,
            OverallRating                  : record.OverallRating,
            Dob                            : record.Dob,
            Gender                         : record.Gender,
            IsAvailableForEmergency        : record.IsAvailableForEmergency,
            Facebook                       : record.Facebook,
            Linkedin                       : record.Linkedin,
            Twitter                        : record.Twitter,
            Instagram                      : record.Instagram,
            Yelp                           : record.Yelp,
            IsActive                       : record.IsActive
           
        };
    };

}