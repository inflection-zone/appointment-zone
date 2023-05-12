import { ApiError } from "../../common/api.error";
import { BusinessUserHourService } from '../../database/repository.services/business.user.hour.service';
import { BusinessUserHourCreateModel, 
         BusinessUserHourDto,
         BusinessUserHourSearchFilters,
         BusinessUserHourUpdateModel,
         BusinessUserHourSearchResults, }
         from "../../domain.types/business/business.user.hour.domain.types";
import { BusinessUserHourValidator as validator } from "./business.user.hour.validator";
import { BusinessUserService } from "../../database/repository.services/business.user.service";
import { BusinessNodeHourService } from "../../database/repository.services/business.node.hour.service";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { ErrorHandler } from "../../common/error.handler";
import { Helper } from "../../common/helper";
import dayjs from "dayjs";
import { PrismaClientInit } from "../../startup/prisma.client.init";

export class BusinessUserHourControllerDelegate {

    //#region member variables and constructors

    prisma = PrismaClientInit.instance().prisma();
    public static instance:BusinessNodeHourService=null;

    _service: BusinessUserHourService = null;
    _businessUserService: BusinessUserService = null;
    _businessNodeHourService : BusinessNodeHourService = null;

    constructor() {
        this._service = new BusinessUserHourService();
        this._businessUserService = new BusinessUserService();
        this._businessNodeHourService = new BusinessNodeHourService();
    }

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);

        var businessUserId = requestBody.BusinessUserId;    
        const businessUser = await this._businessUserService.getById(businessUserId);
        if (!businessUser) {
            ErrorHandler.throwNotFoundError("Business user with id " + businessUserId.toString() + " does not exist!");
        }
        var existing = await this.exists(requestBody);
        if(existing != null) {
            ErrorHandler.throwDuplicateUserError("Business user hours with same characteristics found!");
        }
        if(requestBody.Day != null && requestBody.Date == null) {
            var nodeHoursList = await this.prisma.business_node_hours.findMany({
                where : {
                    AND : {
                        BusinessNodeId : businessUser.BusinessNodeId,
                        Day : requestBody.Day,
                        Date : null,
                        IsActive : true,
                    },
                },
            });

            var nodeHoursForDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null;
            if (nodeHoursForDay !=null && requestBody.StartTime != null && requestBody.EndTime != null) {
                var nodeStartTime = nodeHoursForDay.StartTime;
                var nodeEndTime = nodeHoursForDay.EndTime;

                if (this.IsBefore(requestBody.StartTime, nodeStartTime)) {
                    requestBody.StartTime = nodeStartTime;
                }
                if (this.IsAfter(requestBody.EndTime, nodeEndTime)) {
                    requestBody.EndTime = nodeEndTime;
                }
            }
        }
        var createModel: BusinessUserHourCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business user hours!', 400);
        }
        return this.getEnrichedDto(record);
    };

    createMany = async (requestBody: any) => {
        await validator.validateCreateManyRequest(requestBody);

        var businessUserId = requestBody.BusinessUserId;
            const businessUser = await this._businessUserService.getById(businessUserId);
            if (!businessUser) {
                ErrorHandler.throwNotFoundError("Business user with id " + businessUserId.toString() + " does not exist!");
            }
            var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;
            for (const wh of dayWiseWorkingHours) {
                var userHoursList = await this.prisma.business_user_hours.findMany({
                    where : {
                        AND: { 
                            BusinessUserId : businessUserId,
                            Day : wh.day,
                            IsActive : true,
                        },
                    },
                });
                var nodeHoursList = await this.prisma.business_node_hours.findMany({
                    where : {
                        AND: { 
                            BusinessNodeId : businessUser.BusinessNodeId,
                            Day : wh.day,
                            Date : null,
                            IsActive : true,
                        },
                    },
                });

            var nodeHoursForDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null;
            if (nodeHoursForDay !=null && wh.StartTime != null && wh.EndTime != null) {
                var nodeStartTime = nodeHoursForDay.StartTime;
                var nodeEndTime = nodeHoursForDay.EndTime;

                if (this.IsBefore(wh.StartTime, nodeStartTime)) {
                        wh.StartTime = nodeStartTime;
                }
                if (this.IsAfter(wh.EndTime, nodeEndTime)) {
                        wh.EndTime = nodeEndTime;
                }
            }
            var updateIsOpen = Helper.hasProperty(wh ,'IsOpen') ? wh.IsOpen : true;
            var type = "WORK-DAY";
            if(!updateIsOpen || nodeHoursForDay == null) {
                type = "NON-WORKING-DAY";
            }

            if(userHoursList.length > 0 ) {
                var record = {
                    Type        : type,
                    Date        : null,
                    IsOpen      : updateIsOpen,
                    Message     : null,
                    StartTime   : wh.StartTime != null ? wh.StartTime : '',
                    EndTime     : wh.EndTime != null ? wh.EndTime : '',
                    IsActive    : true
                }
                var updated = await this._service.update(userHoursList[0].id, record);
            } else {
                const record = {
                    BusinessUserId  : businessUserId,
                    Type            : type,
                    Day             : wh.Day,
                    Date            : null,
                    IsOpen          : updateIsOpen,
                    Message         : null,
                    StartTime       : wh.StartTime != null ? wh.StartTime : '',
                    EndTime         : wh.EndTime != null ? wh.EndTime : '',
                    IsActive        : true
                    }
            }
            var createModels = await this.getCreateManyModel(requestBody);       
            const records = await this._service.create(createModels);
            if (records === null) {
                throw new ApiError('Unable to create business user hours!', 400);
            }
            return records;
            }
            var userHours = await this.prisma.business_user_hours.findMany({
            where : {
                BusinessUserId : businessUserId,
                IsActive : true
            }});
            return userHours;
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business user hours with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessUserHourSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessUserHourSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid ,requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError("Business user hours with id " + id.toString() + "cannot be found!");
        }
        const updateModel: BusinessUserHourUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user hours!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    updateMany = async (id: uuid ,requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        var dayWiseWorkingHours = requestBody.DayWiseWorkingHours;
        if(!dayWiseWorkingHours){
            ErrorHandler.throwNotFoundError('Missing required parameters!');
        }
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError("Business user hours with id " + id.toString() + "cannot be found!");
        }
        for(const wh of dayWiseWorkingHours){
            var businessUserId = wh.BusinessUserId;
            const businessUser = await this._businessUserService.getById(businessUserId);
                    if (!businessUser) {
                    ErrorHandler.throwNotFoundError(`Business user id not found!`);
                }  
            }
        const updateModel = this.getUpdateManyModel(requestBody);
        const updated = await this._service.updateMany(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business user hours!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid, updateModel:any) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business user hours with id ' + id.toString() + ' cannot be found!');
        }
        const businessUserHourDeleted = await this._service.delete(id, updateModel);
        return {
            Deleted : businessUserHourDeleted
        };
    };

    getCreateModel = (requestBody): BusinessUserHourCreateModel => {
        return {
            BusinessUserId     : requestBody.BusinessUserId,
            Type               : requestBody.Type,
            Day                : requestBody.Day,
            Date               : requestBody.Date ? dayjs(requestBody.Date).toDate() : null,
            IsOpen             : requestBody.IsOpen ? requestBody.IsOpen : true,
            Message            : requestBody.Message ? requestBody.Message : null,
            StartTime          : requestBody.StartTime ? requestBody.StartTime : '10:00:00',
            EndTime            : requestBody.EndTime ? requestBody.EndTime : '21:00:00',
            IsActive           : requestBody.IsActive ? requestBody.IsActive : true
        };     
    };

    exists = async (requestBody) => {
        var date = requestBody.Date ? dayjs(requestBody.Date).toDate() : null;
        var businessUserId = requestBody.BusinessUserId
        var type = requestBody.Type;
        var day = requestBody.Day;
        var date = date

        var userHours = await this.prisma.business_user_hours.findMany({
            where : {
                AND : {
                    BusinessUserId : businessUserId,
                    Type : type,
                    Day : day,
                    Date : date
                }
            }});
            if (userHours.length > 0) {
                return userHours[0]
            }
            return null;
    };

    getCreateManyModel = (requestBody) => {
        const DayWiseWorkingHours: BusinessUserHourCreateModel[] = [];
        for (const s of requestBody) {
            const record = {
                BusinessUserId     : requestBody.BusinessUserId ? requestBody.BusinessUserId : null,
                Type               : s.Type ? s.Type : null,
                Day                : s.Day ? s.Day : null,
                Date               : s.Date ? s.Date : new Date(),
                IsOpen             : s.IsOpen ? s.IsOpen : false,
                Message            : s.Message ? s.Message : null,
                StartTime          : s.StartTime ? s.StartTime : '10:00:00',
                EndTime            : s.EndTime ? s.EndTime : '21:00:00',    
                IsActive           : s.IsActive ? s.IsActive : true
            };  
            DayWiseWorkingHours.push(record);
        }
        return DayWiseWorkingHours
    };

    IsBefore = (a, b) => {
        var tokens = a.split(":")
        var a_dayjs = dayjs().add(tokens[0], 'hours').add(tokens[1], 'minutes');

        tokens = b.split(":")
        var b_dayjs = dayjs().add(tokens[0], 'hours').add(tokens[1], 'minutes');

        if (a_dayjs.isBefore(b_dayjs)) {
            return true;
        }
        return false;
    };

    IsAfter = (a, b) => {
        var tokens = a.split(":")
        var a_dayjs = dayjs().add(tokens[0], 'hours').add(tokens[1], 'minutes');

        tokens = b.split(":")
        var b_dayjs = dayjs().add(tokens[0], 'hours').add(tokens[1], 'minutes');

        if (a_dayjs.isAfter(b_dayjs)) {
            return true;
        }
        return false;
    };

    getSearchFilters = (query) => {
        var filters = {};

            var businessUserId = query.businessUserId ? query.businessUserId : null;
            if (businessUserId != null) {
                filters['BusinessUserId'] = businessUserId;
            }
            var isActive= query.isActive ? query.isActive : null;
            if (isActive != null) {
                filters['IsActive'] = isActive;
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
        };

    getUpdateModel = (requestBody): BusinessUserHourUpdateModel => {

        const updateModel: BusinessUserHourUpdateModel = {};
            if (Helper.hasProperty(requestBody, 'BusinessUserId')) {
                updateModel.BusinessUserId = requestBody.BusinessUserId;
            }
            if (Helper.hasProperty(requestBody, 'Type')) {
                updateModel.Type = requestBody.Type;
            }
            if (Helper.hasProperty(requestBody, 'Day')) {
                updateModel.Day = requestBody.Day;
            }
            if (Helper.hasProperty(requestBody, 'Date')) {
                updateModel.Date = requestBody.Date;
            }
            if (Helper.hasProperty(requestBody, 'IsOpen')) {
                updateModel.IsOpen = requestBody.IsOpen;
            }
            if (Helper.hasProperty(requestBody, 'Message')) {
                updateModel.Message = requestBody.Message;
            }
            if (Helper.hasProperty(requestBody, 'StartTime')) {
                updateModel.StartTime = requestBody.StartTime;
            }
            if (Helper.hasProperty(requestBody, 'EndTime')) {
                updateModel.EndTime = requestBody.EndTime;
            }
            if (Helper.hasProperty(requestBody, 'IsActive')) {
                updateModel.IsActive = requestBody.IsActive;
            }
            return updateModel;
        };

        getUpdateManyModel = (requestBody) => {

            const updateModels: BusinessUserHourUpdateModel[] = [];
            for (const wh of requestBody) {
                const updateModel: BusinessUserHourUpdateModel = {};

                if (Helper.hasProperty(wh, 'BusinessUserId')) {
                    updateModel.BusinessUserId = wh.BusinessUserId;
                }
                if (Helper.hasProperty(wh, 'Type')) {
                    updateModel.Type = wh.Type;
                }
                if (Helper.hasProperty(wh, 'Day')) {
                    updateModel.Day = wh.Day;
                }
                if (Helper.hasProperty(wh, 'Date')) {
                    updateModel.Date = wh.Date;
                }
                if (Helper.hasProperty(wh, 'IsOpen')) {
                    updateModel.IsOpen = wh.IsOpen;
                }
                if (Helper.hasProperty(wh, 'Message')) {
                    updateModel.Message = wh.Message;
                }
                if (Helper.hasProperty(wh, 'StartTime')) {
                    updateModel.StartTime = wh.StartTime;
                }
                if (Helper.hasProperty(wh, 'EndTime')) {
                    updateModel.EndTime = wh.EndTime;
                }
                if (Helper.hasProperty(wh, 'IsActive')) {
                    updateModel.IsActive = wh.IsActive;
                }
                updateModels.push(updateModel)
            }
                return updateModels;
            };
            
    
    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            id                  : record.id,
            BusinessUserId      : record.BusinessUserId,
            Type                : record.Type,
            Day                 : record.Day,
            Date                : record.Date,
            IsOpen              : record.IsOpen,
            Message             : record.Message,
            StartTime           : record.StartTime,       
            EndTime             : record.EndTime,
            IsActive            : record.IsActive    
        };
    };

    getEnrichedDtos = (DayWiseWorkingHours) => {
        if (DayWiseWorkingHours == null) {
            return null;
        }
        for (const r of DayWiseWorkingHours){
            const record = {
            id                  : r.id,
            BusinessUserId      : DayWiseWorkingHours.BusinessUserId,
            Type                : r.Type,
            Day                 : r.Day,
            Date                : r.Date,
            IsOpen              : r.IsOpen,
            Message             : r.Message,
            StartTime           : r.StartTime,       
            EndTime             : r.EndTime,
            IsActive            : r.IsActive   
            }
            DayWiseWorkingHours.push(record);
        }
        return DayWiseWorkingHours;
 };


    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            BusinessUserId      : record.BusinessUserId,
            Type                : record.Type,
            Day                 : record.Day,
            Date                : record.Date,
            IsOpen              : record.IsOpen,
            Message             : record.Message,
            StartTime           : record.StartTime,       
            EndTime             : record.EndTime,
            IsActive            : record.IsActive    
        };
    };

}
