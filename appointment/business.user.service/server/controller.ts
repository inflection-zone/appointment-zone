import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
	BusinessUserServiceCreateModel,
	BusinessUserServiceCreateResponse,
	BusinessUserServiceGetByIdModel,
	BusinessUserServiceGetByIdResponse,
	BusinessUserServiceUpdateModel,
	BusinessUserServiceUpdateResponse,
	BusinessUserServiceDeleteModel,
	BusinessUserServiceDeleteResponse,
	BusinessUserServiceSearchModel,
	BusinessUserServiceSearchResponse,
	BusinessUserServiceCreateMultipleModel,
	BusinessUserServiceCreateMultipleResponse,
	BusinessUserServiceCreateMultipleResponseItem,
	BusinessUserServiceSearchResponseItem
} from '../proto/businessuserservice_pb';
import { BusinessUserServiceControllerDelegate } from '../../../src/api/business.user.service/business.user.service.controller.delegate';

const delegate = new BusinessUserServiceControllerDelegate();
export const businessUserServiceService = {

	create: async (call: ServerUnaryCall<BusinessUserServiceCreateModel, BusinessUserServiceCreateResponse>,
		callback: sendUnaryData<BusinessUserServiceCreateResponse>) => {
			try {
				const request: BusinessUserServiceCreateModel = call.request;
				const body = {      
					"BusinessUserId": request.array[0],
					"BusinessServiceId": request.array[1],
					"IsActive": request.array[2],
				}

				const record = await delegate.create(body);
				const response = new BusinessUserServiceCreateResponse();
				const result = record;

				response.setId(result.id)
				response.setBusinessuserid(result.BusinessUserId)
				response.setBusinessserviceid(result.BusinessServiceId)
				response.setIsactive(result.IsActive)
				console.log("Business user service created successfully") 
				callback(null, response);  
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},
		
	createMultiple: async (call: ServerUnaryCall<BusinessUserServiceCreateMultipleModel, BusinessUserServiceCreateMultipleResponse>,
		callback: sendUnaryData<BusinessUserServiceCreateMultipleResponse>) => {
			try {
				const request: BusinessUserServiceCreateMultipleModel = call.request;
				const items = request.getItemsList();
				const response = new BusinessUserServiceCreateMultipleResponse();
				const responseItems : BusinessUserServiceCreateMultipleResponseItem[] =[];

				for (const item of items) {
					const body = {
						"BusinessUserId": item.array[0],
						"BusinessServiceId": item.array[1],
						"IsActive": item.array[2],
					};

					const record = await delegate.create(body);
					const responseItem = new BusinessUserServiceCreateMultipleResponseItem();
					const result = record;
					responseItem.setId(result.id);
					responseItem.setBusinessserviceid(result.BusinessServiceId);
					responseItem.setBusinessuserid(result.BusinessUserId);
					responseItem.setIsactive(result.IsActive);
					responseItems.push(responseItem);
				}

				response.setItemList(responseItems);
				console.log("Business user services created successfully");
				callback(null, response);

			} catch(error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
			}, null);
			}
		},

	async getById(call: ServerUnaryCall<BusinessUserServiceGetByIdModel, BusinessUserServiceGetByIdResponse>,
		callback: sendUnaryData<BusinessUserServiceGetByIdResponse>): Promise<void> {
			try {
				const request : BusinessUserServiceGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new BusinessUserServiceGetByIdResponse();
				response.id = request.array[0];
				const result = record;

				response.setId(result.id)
				response.setBusinessuserid(result.BusinessUserId)
				response.setBusinessserviceid(result.BusinessServiceId)
				response.setIsactive(result.IsActive)
				console.log("record====",record)
				console.log("Business user service retrieved successfully")
				callback(null, response);
				
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	async search(call: ServerUnaryCall<BusinessUserServiceSearchModel, BusinessUserServiceSearchResponse>,
		callback: sendUnaryData<BusinessUserServiceSearchResponse>): Promise<void> {
			try {
				const request : BusinessUserServiceSearchModel = call.request;
				const query = {
					"businessUserId": request.array[0],
					"businessServiceId": request.array[1],
					"isActive": request.array[2],
				}

				const searchResults = await delegate.search(query);
				const response = new BusinessUserServiceSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);
				response.setPageindex(searchResults.PageIndex);
				response.setItemsperpage(searchResults.ItemsPerPage);
				response.setOrder(searchResults.Order);

				const itemsList = searchResults.Items.map((item: BusinessUserServiceSearchResponseItem) => {
					const responseItem = new BusinessUserServiceSearchResponseItem();
					responseItem.setId(item.id);
					responseItem.setBusinessuserid(item.BusinessUserId);
					responseItem.setBusinessserviceid(item.BusinessServiceId);
					responseItem.setIsactive(item.IsActive);
					// responseItem.setCreatedat(item.CreatedAt);
                    // responseItem.setUpdatedat(item.UpdatedAt);
                    // responseItem.setDeletedat(item.DeletedAt);
                    // responseItem.setIsdeleted(item.IsDeleted);
					return responseItem;
					});
					response.setItemsList(itemsList);
					console.log("record====",searchResults)
					console.log("Business user service retrieved successfully")
					callback(null, response); 
					
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},		

	update :async (call: ServerUnaryCall<BusinessUserServiceUpdateModel, BusinessUserServiceUpdateResponse>,
		callback: sendUnaryData<BusinessUserServiceUpdateResponse>) => {
			try {
				const request: BusinessUserServiceUpdateModel = call.request;
				const id = request.array[0]
				const body = {
					"BusinessUserId": request.array[1],
					"BusinessServiceId": request.array[2],
					"IsActive": request.array[3],
				}

				const record = await delegate.update(id, body);
				const response = new BusinessUserServiceUpdateResponse();
				const result = record;
				response.setId(result.id)
				response.setBusinessuserid(result.BusinessUserId)
				response.setBusinessserviceid(result.BusinessServiceId)
				response.setIsactive(result.IsActive)
				console.log("Business user service updated successfully")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},
		
	async delete(call: ServerUnaryCall<BusinessUserServiceDeleteModel, BusinessUserServiceDeleteResponse>,
		callback: sendUnaryData<BusinessUserServiceDeleteResponse>): Promise<void> {
			try {
				const request : BusinessUserServiceDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new BusinessUserServiceDeleteResponse();
				
				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Business user service deleted successfully")
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
