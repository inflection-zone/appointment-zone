import grpc, { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import {
  UserMessageCreateModel,
  UserMessageCreateResponse,
  UserMessageGetByIdModel,
  UserMessageGetByIdResponse,
  UserMessageUpdateModel,
  UserMessageUpdateResponse,
  UserMessageDeleteModel,
  UserMessageDeleteResponse,
  UserMessageSearchModel,
  UserMessageSearchResponse,
  UserMessageSearchResponseItem,
} from "../proto/usermessage_pb";
import { UserMessageControllerDelegate } from "../../../src/api/user.message/user.message.controller.delegate";

const delegate = new UserMessageControllerDelegate();
export const userMessageService = {
	create: async (call: ServerUnaryCall<UserMessageCreateModel, UserMessageCreateResponse>,
  		callback: sendUnaryData<UserMessageCreateResponse>) => {
    		try {
      			const request: UserMessageCreateModel = call.request;
      			const body = {
					BusinessNodeId: request.array[0],
        			CustomerId: request.array[1],
       				Body: request.array[2],
        			Type: request.array[3],
        			TypeId: request.array[4],
        			MessageId: request.array[5],
        			IsSent: request.array[6],
        			IsActive: request.array[7],
				};
				const record = await delegate.create(body);
      			const response = new UserMessageCreateResponse();
      			const result = record;
      			response.setId(result.id);
      			response.setBusinessnodeid(result.BusinessNodeId);
      			response.setCustomerid(result.CustomerId);
      			response.setBody(result.Body);
      			response.setType(result.Type);
      			response.setTypeid(result.TypeId);
      			response.setMessageid(result.MessageId);
      			response.setIssent(result.IsSent);
      			response.setIsactive(result.IsActive);
      			console.log("User message created successfully");
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

    async getById(call: ServerUnaryCall<UserMessageGetByIdModel, UserMessageGetByIdResponse>,
		callback: sendUnaryData<UserMessageGetByIdResponse>): Promise<void> {
			try {
				const request: UserMessageGetByIdModel = call.request;
      			const record = await delegate.getById(request.array[0]);
      			const response = new UserMessageGetByIdResponse();
      			response.id = request.array[0];
      			const result = record;
      			response.setId(result.id);
      			response.setBusinessnodeid(result.BusinessNodeId);
      			response.setCustomerid(result.CustomerId);
      			response.setBody(result.Body);
      			response.setType(result.Type);
      			response.setTypeid(result.TypeId);
      			response.setMessageid(result.MessageId);
      			response.setIssent(result.IsSent);
      			response.setIsactive(result.IsActive);
      			console.log("record====", record);
      			console.log("User message retrieved successfully");
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

	async search(call: ServerUnaryCall<UserMessageSearchModel, UserMessageSearchResponse>,
    	callback: sendUnaryData<UserMessageSearchResponse>): Promise<void> {
    		try {
      			const request: UserMessageSearchModel = call.request;
      			const query = {
					"businessNodeId": request.array[0],
        			"customerId": request.array[1],
        			"isActive": request.array[2],
      			};
				const searchResults = await delegate.search(query);
      			const response = new UserMessageSearchResponse();
      			response.setTotalcount(searchResults.TotalCount);
      			response.setRetrievedcount(searchResults.RetrievedCount);
      			response.setPageindex(searchResults.PageIndex);
      			response.setItemsperpage(searchResults.ItemsPerPage);
      			response.setOrder(searchResults.Order);
      			const itemsList = searchResults.Items.map((item: UserMessageSearchResponseItem) => {
        		const responseItem = new UserMessageSearchResponseItem();
        		responseItem.setId(item.id);
        		responseItem.setBusinessnodeid(item.BusinessNodeId);
        		responseItem.setCustomerid(item.CustomerId);
        		responseItem.setBody(item.Body);
        		responseItem.setType(item.Type);
        		responseItem.setIsread(item.IsRead);
        		responseItem.setTypeid(item.TypeId);
       		 	responseItem.setMessage(item.Message);
        		responseItem.setIssent(item.IsSent);
        		responseItem.setIsactive(item.IsActive);
          		// responseItem.setCreatedat(item.CreatedAt);
          		// responseItem.setUpdatedat(item.UpdatedAt);
          		// responseItem.setDeletedat(item.DeletedAt);
          		// responseItem.setIsdeleted(item.IsDeleted);
				return responseItem;
			});
			response.setItemsList(itemsList);
        	console.log("record====", searchResults);
        	console.log("user message retrived successfully");
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

    update: async (call: ServerUnaryCall<UserMessageUpdateModel, UserMessageUpdateResponse>,
    	callback: sendUnaryData<UserMessageUpdateResponse>) => {
    		try {
      			const request: UserMessageUpdateModel = call.request;
      			const id = request.array[0];
      			const body = {
					BusinessNodeId: request.array[1],
        			CustomerId: request.array[2],
        			Body: request.array[3],
        			Type: request.array[4],
        			TypeId: request.array[5],
        			MessageId: request.array[6],
        			IsSent: request.array[7],
        			IsActive: request.array[8],
				};
				const record = await delegate.update(id, body);
      			const response = new UserMessageUpdateResponse();
      			const result = record;
      			response.setId(result.id);
      			response.setBusinessnodeid(result.BusinessNodeId);
      			response.setCustomerid(result.CustomerId);
      			response.setBody(result.Body);
      			response.setType(result.Type);
      			response.setTypeid(result.TypeId);
      			response.setMessageid(result.MessageId);
      			response.setIssent(result.IsSent);
      			response.setIsactive(result.IsActive);
      			console.log("User message updated successfully");
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

    async delete(call: ServerUnaryCall<UserMessageDeleteModel, UserMessageDeleteResponse>,
    	callback: sendUnaryData<UserMessageDeleteResponse>): Promise<void> {
    		try {
      			const request: UserMessageDeleteModel = call.request;
      			const record = await delegate.delete(request.array[0]);
      			const response = new UserMessageDeleteResponse();
      			response.setCount(record.Deleted.count);
      			console.log("record====", record.Deleted.count);
      			console.log("User message deleted successfully");
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
};