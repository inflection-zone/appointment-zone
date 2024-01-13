import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
    BusinessUserSkillCreateModel,
    BusinessUserSkillCreateResponse,
    BusinessUserSkillGetByIdModel,
    BusinessUserSkillGetByIdResponse,
    BusinessUserSkillUpdateModel,
    BusinessUserSkillUpdateResponse,
    BusinessUserSkillDeleteModel,
    BusinessUserSkillDeleteResponse,
    BusinessUserSkillSearchModel,
    BusinessUserSkillSearchResponse,
    BusinessUserSkillSearchResponseItem,
    BusinessUserSkillCreateMultipleModel,
	BusinessUserSkillCreateMultipleResponse,
	BusinessUserSkillCreateMultipleResponseItem,
} from '../proto/businessuserskill_pb';
import { BusinessUserSkillControllerDelegate } from '../../../src/api/business.user.skill/business.user.skill.controller.delegate';
const delegate = new BusinessUserSkillControllerDelegate();
export const businessUserSkillService = {

    create: async(call: ServerUnaryCall<BusinessUserSkillCreateModel, BusinessUserSkillCreateResponse>,
        callback: sendUnaryData<BusinessUserSkillCreateResponse>) => {
            try {
                const request: BusinessUserSkillCreateModel = call.request;
                const body = {      
                    "BusinessSkillId": request.array[0],
                    "BusinessUserId": request.array[1],
                    "IsActive": request.array[2],
                }
                const record = await delegate.create(body);
                const response = new BusinessUserSkillCreateResponse();
                const result = record;
                response.setId(result.id)
                response.setBusinessuserid(result.BusinessUserId)
                response.setBusinessskillid(result.BusinessSkillId)
                response.setIsactive(result.IsActive)
                console.log("Business user skill created successfully") 
                callback(null, response);  
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
    },

    createMultiple: async (call: ServerUnaryCall<BusinessUserSkillCreateMultipleModel, BusinessUserSkillCreateMultipleResponse>,
		callback: sendUnaryData<BusinessUserSkillCreateMultipleResponse>) => {
			try {
				const request: BusinessUserSkillCreateMultipleModel = call.request;
				const items = request.getItemsList();
				const response = new BusinessUserSkillCreateMultipleResponse();
				const responseItems :  BusinessUserSkillCreateMultipleResponseItem[] =[];

				for (const item of items) {
					const body = {
						"BusinessSkillId": item.array[0],
                        "BusinessUserId": item.array[1],
                        "IsActive": item.array[2],
					};
					const record = await delegate.create(body);
					const responseItem = new BusinessUserSkillCreateMultipleResponseItem();
					const result = record;
					responseItem.setId(result.id);
					responseItem.setBusinessskillid(result.BusinessSkillId);
					responseItem.setBusinessuserid(result.BusinessUserId);
					responseItem.setIsactive(result.IsActive);
					responseItems.push(responseItem);
				}
				response.setItemsList(responseItems);
				console.log("Business user skills created successfully");
				callback(null, response);

			} catch(error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
			}, null);
			}
		},
    
    async getById(call: ServerUnaryCall<BusinessUserSkillGetByIdModel, BusinessUserSkillGetByIdResponse>,
        callback: sendUnaryData<BusinessUserSkillGetByIdResponse>): Promise<void> {
            try {
                const request : BusinessUserSkillGetByIdModel = call.request;
                const record = await delegate.getById(request.array[0]);
                const response = new BusinessUserSkillGetByIdResponse();
                response.id = request.array[0];
                const result = record;
                response.setId(result.id)
                response.setBusinessuserid(result.BusinessUserId)
                response.setBusinessskillid(result.BusinessSkillId)
                response.setIsactive(result.IsActive)
                console.log("record====",record)
                console.log("Business user skill retrieved successfully")
                callback(null, response);
                
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
        },

    async search(call: ServerUnaryCall<BusinessUserSkillSearchModel, BusinessUserSkillSearchResponse>,
        callback: sendUnaryData<BusinessUserSkillSearchResponse>): Promise<void> {
            try {
                const request : BusinessUserSkillSearchModel = call.request;
                const query = {
                    "businessSkillId": request.array[0],
                    "businessUserId": request.array[1],
                    "isActive": request.array[2],
                }

                const searchResults = await delegate.search(query);
                const response = new BusinessUserSkillSearchResponse();
                response.setTotalcount(searchResults.TotalCount);
                response.setRetrievedcount(searchResults.RetrievedCount);
                response.setPageindex(searchResults.PageIndex);
                response.setItemsperpage(searchResults.ItemsPerPage);
                response.setOrder(searchResults.Order);

                const itemsList = searchResults.Items.map((item: BusinessUserSkillSearchResponseItem) => {
                    const responseItem = new BusinessUserSkillSearchResponseItem();
                    responseItem.setId(item.id);
                    responseItem.setBusinessskillid(item.BusinessSkillId);
                    responseItem.setBusinessuserid(item.BusinessUserId);
                    responseItem.setIsactive(item.IsActive);
                    // responseItem.setCreatedat(item.CreatedAt);
                    // responseItem.setUpdatedat(item.UpdatedAt);
                    // responseItem.setDeletedat(item.DeletedAt);
                    return responseItem;
                });
                
                response.setItemsList(itemsList);
                console.log("record====",searchResults)
                console.log("Business user skill retrieved successfully")
                callback(null, response); 
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
        },
            
    update :async (call: ServerUnaryCall<BusinessUserSkillUpdateModel, BusinessUserSkillUpdateResponse>,
        callback: sendUnaryData<BusinessUserSkillUpdateResponse>) => {
            try {
                const request: BusinessUserSkillUpdateModel = call.request;
                const id = request.array[0]
                const body = {
                    "BusinessSkillId": request.array[1],
                    "BusinessUserId": request.array[2],
                    "IsActive": request.array[3],
                }

                const record = await delegate.update(id, body);
                const response = new BusinessUserSkillUpdateResponse();
                const result = record;

                response.setId(result.id)
                response.setBusinessuserid(result.BusinessUserId)
                response.setBusinessskillid(result.BusinessSkillId)
                response.setIsactive(result.IsActive)
                console.log("Business user skill updated successfully")
                callback(null, response);
                } catch (error) {
                    console.log(error)
                    callback({
                        code: grpc.status.INTERNAL,
                        details: 'Internal Server Error',
                    }, null);
            }
    },
    
    async delete(call: ServerUnaryCall<BusinessUserSkillDeleteModel, BusinessUserSkillDeleteResponse>,
        callback: sendUnaryData<BusinessUserSkillDeleteResponse>): Promise<void> {
            try {
                const request : BusinessUserSkillDeleteModel = call.request;
                const record = await delegate.delete(request.array[0]);
                const response = new BusinessUserSkillDeleteResponse();

                response.setCount(record.Deleted.count);
                console.log("record====", record.Deleted.count);
                console.log("Business user skill deleted successfully")
                callback(null, response); 
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
    },

  }
