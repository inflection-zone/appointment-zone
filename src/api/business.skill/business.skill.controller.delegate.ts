///////////////////////////////////////////////////////////////////////////////////////
import { ApiError } from "../../common/api.error";
import { BusinessSkillCreateModel, BusinessSkillUpdateModel,
         BusinessSkillDto,BusinessSkillSearchFilters, BusinessSkillSearchResults } 
         from "../../domain.types/business/business.skill.domain.types";
import { BusinessSkillValidator as validator } from './business.skill.validator';
import { BusinessSkillService } from '../../database/repository.services/business.skill.service';
import { ErrorHandler } from '../../common/error.handler';
import { uuid } from "../../domain.types/miscellaneous/system.types";
import { Helper } from "../../common/helper";

export class BusinessSkillControllerDelegate {

    //#region member variables and constructors

    _service: BusinessSkillService = null;

    constructor() {
        this._service = new BusinessSkillService();
    }

    //#endregion

    create = async (requestBody: any) => {

        await validator.validateCreateRequest(requestBody);
     
        var createModel: BusinessSkillCreateModel = this.getCreateModel(requestBody);
        const record: BusinessSkillDto = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create business skills!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business skill with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    search = async (query: any) => {
        await validator.validateSearchRequest(query);
        var filters: BusinessSkillSearchFilters = this.getSearchFilters(query);
        var searchResults: BusinessSkillSearchResults = await this._service.search(filters);
        var items = searchResults.Items.map(x => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Business skill with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: BusinessSkillUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update business skill!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Business Skill with id ' + id.toString() + ' cannot be found!');
        }
        const businessSkillDeleted = await this._service.delete(id);
        return {
            Deleted: businessSkillDeleted
        };
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////

    getCreateModel = (requestBody): BusinessSkillCreateModel => {
        return {
            BusinessNodeId      :requestBody.BusinessNodeId ?  requestBody.BusinessNodeId:null,
            Name                : requestBody.Name? requestBody.Name: null,
            Description         : requestBody.Description ? requestBody.Description : null,
            DisplayPicture      : requestBody.DisplayPicture? requestBody.DisplayPicture: null,
            IsActive            : requestBody.IsActive ? requestBody.IsActive : true
        };
    };

    getSearchFilters = (query) => {
        var filters = {};

            var name = query.name ? query.name : null;
            if (name != null) {
                filters['Name'] = name;
            }
            var isActive= query.isActive ? query.isActive : null;
            if (isActive != null) {
                filters['IsActive'] = isActive;
            }
            var businessNodeId= query.businessNodeId ? query.businessNodeId : null;
            if (businessNodeId != null) {
                filters['BusinessNodeId'] = businessNodeId;
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

    getUpdateModel = (requestBody): BusinessSkillUpdateModel => {

        let updateModel: BusinessSkillUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'BusinessNodeId')) {
            updateModel.BusinessNodeId = requestBody.BusinessNodeId;
        }
        if (Helper.hasProperty(requestBody, 'Name')) {
            updateModel.Name = requestBody.Name;
        }
        if (Helper.hasProperty(requestBody, 'Description')) {
            updateModel.Description = requestBody.Description;
        }
        if (Helper.hasProperty(requestBody, 'DisplayPicture')) {
            updateModel.DisplayPicture = requestBody.DisplayPicture;
        }
        if (Helper.hasProperty(requestBody, 'IsActive')) {
            updateModel.IsActive = requestBody.IsActive;
        }
        return updateModel;
    };

    getEnrichedDto = (record) => {
	    if (record == null) {
	        return null;
	    }
	    return {
		    id		            : record.id,
		    BusinessNodeId	    : record.businessNodeId,
		    Name		        : record.Name,
		    Description	        : record.Description,
		    DisplayPicture	    : record.DisplayPicture,
            IsActive            : record.IsActive
        }
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
		    id		        : record.id,
		    BusinessNodeId	: record.businessNodeId,
		    Name		    : record.Name,
		    Description	    : record.Description,
		    DisplayPicture	: record.DisplayPicture,
            IsActive        : record.IsActive
        }
    };
}
