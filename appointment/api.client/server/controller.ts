import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import {
    ApiClientCreateModel,
    ApiClientCreateResponse,
    ApiClientGetByIdModel,
    ApiClientGetByIdResponse,
    ApiClientUpdateModel,
    ApiClientUpdateResponse,
    ApiClientSearchModel,
    ApiClientSearchResponse,
    ApiClientDeleteModel,
    ApiClientDeleteResponse,
	ApiClientSearchResponseItem,
} from '../proto/api.client_pb';
import {ApiClientControllerDelegate } from '../../../src/api/api.client/api.client.controller.delegate';

const delegate = new ApiClientControllerDelegate();
export const apiClientService = {
	create: async (call: ServerUnaryCall<ApiClientCreateModel, ApiClientCreateResponse>,
		callback: sendUnaryData<ApiClientCreateResponse>) => {
			try {
				const request: ApiClientCreateModel = call.request;
				const body = {      
					"ClientName": request.array[0],
					"FirstName": request.array[1],
					"LastName": request.array[2],
					"CountryCode": request.array[3],
					"ClientCode": request.array[4],
					"Password": request.array[5],
					"Phone":request.array[6],
					"Email": request.array[7],
					"ApiKey": request.array[8],
					"IsPrivileged" : request.array[9],
					"ValidFrom": request.array[10],
					"ValidTill": request.array[11],
				}

				const record = await delegate.create(body);
				const response = new ApiClientCreateResponse();
				const result = record;

				response.setId(result.id)
				response.setClientname(result.ClientName)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setCountrycode(result.CountryCode)
				response.setClientcode(result.ClientCode)
				response.setPhone(result.Phone)
				response.setEmail(result.Email)
				response.setIsprivileged(result.IsPrivileged)
				response.setApikey(result.ApiKey)
				response.setValidfrom(result.ValidFrom)
				response.setValidtill(result.ValidTill)
				console.log("Api client created successfully.", result);
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	async getById(call: ServerUnaryCall<ApiClientGetByIdModel, ApiClientGetByIdResponse>,
		callback: sendUnaryData<ApiClientGetByIdResponse>): Promise<void> {
			try {
				const request : ApiClientGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new ApiClientGetByIdResponse();
				response.id = request.array[0];
				const result = record;

				response.setId(result.id)
				response.setClientname(result.ClientName)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setCountrycode(result.CountryCode)
				response.setClientcode(result.ClientCode)
				response.setPhone(result.Phone)
				response.setEmail(result.Email)
				response.setIsprivileged(result.IsPrivileged)
				response.setApikey(result.ApiKey)
				response.setValidfrom(result.ValidFrom)
				response.setValidtill(result.ValidTill)
				console.log("Api client retrieved successfully.")
				console.log("record====",record)
				callback(null, response);  
				} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
				}
		},

	async search(call: ServerUnaryCall<ApiClientSearchModel, ApiClientSearchResponse>,
		callback: sendUnaryData<ApiClientSearchResponse>): Promise<void> {
			try {
				const request : ApiClientSearchModel = call.request;
				const query = {
					"clientName": request.array[0],
					"countryCode": request.array[1],
					"clientCode": request.array[2],
					"isPrivileged": request.array[3],
					"phone": request.array[4],
					"email": request.array[5],
					"clientInterfaceType": request.array[6],
				}

				const searchResults = await delegate.search(query);
				const response = new ApiClientSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);
				response.setPageindex(searchResults.PageIndex);
				response.setItemsperpage(searchResults.ItemsPerPage);
				response.setOrder(searchResults.Order);

				const itemsList = searchResults.Items.map((item: ApiClientSearchResponseItem) => {
					const responseItem = new ApiClientSearchResponseItem();
					responseItem.setId(item.id);
					responseItem.setClientname(item.ClientName);
					responseItem.setClientcode(item.ClientCode);
					responseItem.setFirstname(item.FirstName);
					responseItem.setLastname(item.LastName);
					responseItem.setPhone(item.Phone);
					responseItem.setEmail(item.Email);
					responseItem.setCountrycode(item.CountryCode);
					responseItem.setApikey(item.ApiKey);
					responseItem.setIsprivileged(item.IsPrivileged);
					// responseItem.setValidfrom(item.ValidFrom);
					// responseItem.setValidtill(item.ValidTill);
					return responseItem;
				});
				response.setItemsList(itemsList);
				console.log("record====",searchResults)
				console.log("Api client retrieved successfully.")
				callback(null, response);
			}catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	update : async (call: ServerUnaryCall<ApiClientUpdateModel, ApiClientUpdateResponse>,
		callback: sendUnaryData<ApiClientUpdateResponse>) => {
			try {
				const request: ApiClientUpdateModel = call.request;
				const id = request.array[0]
				const body = {
					"ClientName": request.array[1],
					"FirstName": request.array[2],
					"LastName": request.array[3],
					"CountryCode": request.array[4],
					"ClientCode": request.array[5],
					"Password": request.array[6],
					"Phone":request.array[7],
					"Email": request.array[8],
					"ApiKey": request.array[9],
					"IsPrivileged" : request.array[10],
					"ValidFrom": request.array[11],
					"ValidTill": request.array[12],
				}

				const record = await delegate.update(id, body);
				const response = new ApiClientUpdateResponse();
				const result = record;

				response.setId(result.id)
				response.setClientname(result.ClientName)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setCountrycode(result.CountryCode)
				response.setClientcode(result.ClientCode)
				response.setPhone(result.Phone)
				response.setEmail(result.Email)
				response.setIsprivileged(result.IsPrivileged)
				response.setApikey(result.ApiKey)
				response.setValidfrom(result.ValidFrom)
				response.setValidtill(result.ValidTill)
				console.log("Api client updated successfully.")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	async delete (call: ServerUnaryCall<ApiClientDeleteModel, ApiClientDeleteResponse>,
		callback: sendUnaryData<ApiClientDeleteResponse>): Promise<void> {
			try {
				const request : ApiClientDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new ApiClientDeleteResponse();
				
				console.log("record====", record);
				console.log("Api client deleted successfully.");
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