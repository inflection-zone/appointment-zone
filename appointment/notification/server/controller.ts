import grpc, { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import {
  NotificationCreateModel,
  NotificationCreateResponse,
  NotificationGetByIdModel,
  NotificationGetByIdResponse,
  NotificationUpdateModel,
  NotificationUpdateResponse,
  NotificationDeleteModel,
  NotificationDeleteResponse,
  NotificationSearchModel,
  NotificationSearchResponse,
  NotificationSearchResponseItem,
} from "../proto/notification_pb";
import { NotificationControllerDelegate } from "../../../src/api/notification/notification.controller.delegate";

const delegate = new NotificationControllerDelegate();
export const notificationService = {

    create: async (call: ServerUnaryCall<NotificationCreateModel, NotificationCreateResponse>,
		callback: sendUnaryData<NotificationCreateResponse>) => {
    		try {
				const request: NotificationCreateModel = call.request;
				const body = {
				BusinessNodeId: request.array[0],
				CustomerId: request.array[1],
				Title: request.array[2],
				Body: request.array[3],
				Type: request.array[4],
				IsRead: request.array[5],
				TypeId: request.array[6],
				Message: request.array[7],
				IsSent: request.array[8],
				IsActive: request.array[9],
				};
				const record = await delegate.create(body);
				const response = new NotificationCreateResponse();
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setCustomerid(result.CustomerId);
				response.setTitle(result.Title);
				response.setBody(result.Body);
				response.setType(result.Type);
				response.setTypeid(result.TypeId);
				response.setIsread(result.IsRead);
				response.setIssent(result.IsSent);
				response.setMessage(result.Message);
				response.setIsactive(result.IsActive);
				console.log("Notification created successfully");
				callback(null, response);
			} catch (error) {
      			console.log(error);
      			callback(
       		 		{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
        	 		},
					null
					);
				}
	},

    async getById(call: ServerUnaryCall<NotificationGetByIdModel,NotificationGetByIdResponse>,
    	callback: sendUnaryData<NotificationGetByIdResponse>): Promise<void> {
    		try {
				const request: NotificationGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new NotificationGetByIdResponse();
				response.id = request.array[0];
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setCustomerid(result.CustomerId);
				response.setTitle(result.Title);
				response.setBody(result.Body);
				response.setType(result.Type);
				response.setIsread(result.IsRead);
				response.setTypeid(result.TypeId);
				response.setMessage(result.Message);
				response.setIssent(result.IsSent);
				response.setIsactive(result.IsActive);
				console.log("record====", record);
				console.log("Notification retrieved successfully");
				callback(null, response);
			} catch (error) {
				console.log(error);
				callback(
         			{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
          			},
					null
        			);
   		 	}
  	},

	  async search(call: ServerUnaryCall<NotificationSearchModel, NotificationSearchResponse>,
    	callback: sendUnaryData<NotificationSearchResponse>): Promise<void> {
      	try {
			const request: NotificationSearchModel = call.request;
        	const query = {
				businessNodeId: request.array[0],
				customerId: request.array[1],
				isActive: request.array[2],
			};
			const searchResults = await delegate.search(query);
			const response = new NotificationSearchResponse();
			response.setTotalcount(searchResults.TotalCount);
			response.setRetrievedcount(searchResults.RetrievedCount);
			response.setPageindex(searchResults.PageIndex);
			response.setItemsperpage(searchResults.ItemsPerPage);
			response.setOrder(searchResults.Order);
			const itemsList = searchResults.Items.map((item: NotificationSearchResponseItem) => {
				const responseItem = new NotificationSearchResponseItem();
				responseItem.setId(item.id);
				responseItem.setBusinessnodeid(item.BusinessNodeId);
				responseItem.setCustomerid(item.CustomerId);
				responseItem.setTitle(item.Title);
				responseItem.setBody(item.Body);
				responseItem.setType(item.Type);
				responseItem.setIsread(item.IsRead);
				responseItem.setIssent(item.IsSent);
				responseItem.setTypeid(item.TypeId);
				responseItem.setMessage(item.Message);
				responseItem.setIsactive(item.IsActive);
				// responseItem.setCreatedat(item.CreatedAt);
				// responseItem.setUpdatedat(item.UpdatedAt);
				// responseItem.setDeletedat(item.DeletedAt);
          		return responseItem;
        	});
			response.setItemsList(itemsList);
			console.log("record====", searchResults);
			console.log("Notification retrieved successfully");
			callback(null, response);
		} catch (error) {
			console.log(error);
          	callback(
            	{
              		code: grpc.status.INTERNAL,
              		details: "Internal Server Error",
            	} ,
				null
				);
		}
	},

    update: async (call: ServerUnaryCall<NotificationUpdateModel, NotificationUpdateResponse>,
    	callback: sendUnaryData<NotificationUpdateResponse>) => {
    		try {
				const request: NotificationUpdateModel = call.request;
				const id = request.array[0];
				const body = {
					BusinessNodeId: request.array[1],
					CustomerId: request.array[2],
					Title: request.array[3],
					Body: request.array[4],
					Type: request.array[5],
					IsRead: request.array[6],
					TypeId: request.array[7],
					Message: request.array[8],
					IsSent: request.array[9],
					IsActive: request.array[10],
					};
				const record = await delegate.update(id, body);
				const response = new NotificationUpdateResponse();
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setCustomerid(result.CustomerId);
				response.setTitle(result.Title);
				response.setBody(result.Body);
				response.setType(result.Type);
				response.setIsread(result.IsRead);
				response.setTypeid(result.TypeId);
				response.setMessage(result.Message);
				response.setIssent(result.IsSent);
				response.setIsactive(result.IsActive);
				console.log("Notification updated successfully");
				callback(null, response);
			} catch (error) {
				console.log(error);
        		callback(
					{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
          			},
        			null
					);
			}
	},

    async delete(call: ServerUnaryCall<NotificationDeleteModel, NotificationDeleteResponse>,
    	callback: sendUnaryData<NotificationDeleteResponse>): Promise<void> {
			try {
				const request: NotificationDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new NotificationDeleteResponse();
				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Notification deleted successfully");
				callback(null, response);
			} catch (error){
				console.log(error);
          		callback(
					{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
					},
					null
					);
			}
	},
};