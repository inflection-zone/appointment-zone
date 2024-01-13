import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import {
	CustomerCreateModel,
	CustomerCreateResponse,
	CustomerGetByIdModel,
	CustomerGetByIdResponse,
	CustomerUpdateModel,
	CustomerUpdateResponse,
	CustomerDeleteModel,
	CustomerDeleteResponse,
	CustomerSearchModel,
	CustomerSearchResponse,
	CustomerSearchResponseItem
} from '../proto/customer_pb';
import { CustomerControllerDelegate } from '../../../src/api/customer/customer.controller.delegate';

const delegate = new CustomerControllerDelegate();
export const customerService = {
	create: async (call: ServerUnaryCall<CustomerCreateModel, CustomerCreateResponse>,
		callback: sendUnaryData<CustomerCreateResponse>) => {
			try {
				const request: CustomerCreateModel = call.request;
				const body = {
				"Prefix": request.array[0],
				"FirstName": request.array[1],
				"LastName": request.array[2],
				"Mobile": request.array[3],
				"Email": request.array[4],
				"Gender": request.array[5],
				// "BirthDate":request.array[6],
				"DisplayPicture": request.array[7],
				"Address": request.array[8],
				"InAppUser" : request.array[9],
				"IsActive": request.array[10]
				}

				const record = await delegate.create(body);
				const response = new CustomerCreateResponse();
				const result = record;

				response.setId(result.id)
				response.setPrefix(result.Prefix)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setGender(result.Gender)
				response.setDisplaypicture(result.DisplayPicture)
				response.setAddress(result.Address)
				response.setInappuser(result.InAppUser)
				response.setIsactive(result.IsActive)
				console.log("Customer created successfully")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	async getById(call: ServerUnaryCall<CustomerGetByIdModel, CustomerGetByIdResponse>,
		callback: sendUnaryData<CustomerGetByIdResponse>): Promise<void> {
			try {
				const request : CustomerGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new CustomerGetByIdResponse();
				response.id = request.array[0];
				const result = record;

				response.setId(result.id)
				response.setPrefix(result.Prefix)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setGender(result.Gender)
				response.setDisplaypicture(result.DisplayPicture)
				response.setAddress(result.Address)
				response.setInappuser(result.InAppUser)
				response.setIsactive(result.IsActive)
				console.log("Customer retrieved successfully")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	async search(call: ServerUnaryCall<CustomerSearchModel, CustomerSearchResponse>,
		callback: sendUnaryData<CustomerSearchResponse>): Promise<void> {
			try {
				const request : CustomerSearchModel = call.request;
				const query = {
					"email": request.array[0],
					"firstName": request.array[1],
					"lastName": request.array[2],
					"mobile": request.array[3],
					"name": request.array[4],
				}

				const searchResults = await delegate.search(query);
				const response = new CustomerSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);
				response.setPageindex(searchResults.PageIndex);
				response.setItemsperpage(searchResults.ItemsPerPage);
				response.setOrder(searchResults.Order);

				const itemsList = searchResults.Items.map((item: CustomerSearchResponseItem) => {
					const responseItem = new CustomerSearchResponseItem();
					responseItem.setId(item.id);
					responseItem.setFirstname(item.FirstName);
					responseItem.setLastname(item.LastName);
					responseItem.setPrefix(item.Prefix);
					responseItem.setName(item.Name);
					responseItem.setMobile(item.Mobile);
					responseItem.setEmail(item.Email);
					responseItem.setGender(item.Gender);
					responseItem.setDisplaypicture(item.DisplayPicture);
					responseItem.setAddress(item.Address);
					responseItem.setInappuser(item.InAppUser);
					responseItem.setIsactive(item.IsActive);
					// responseItem.setCreatedat(item.CreatedAt);
                    // responseItem.setUpdatedat(item.UpdatedAt);
                    // responseItem.setDeletedat(item.DeletedAt);
                    // responseItem.setIsdeleted(item.IsDeleted);
					return responseItem;
					});

					response.setItemsList(itemsList);
					console.log("record====",searchResults)
					console.log("Customer retrieved successfully")
					callback(null, response); 
					
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},		

	update: async (call: ServerUnaryCall<CustomerUpdateModel, CustomerUpdateResponse>,
		callback: sendUnaryData<CustomerUpdateResponse>) => {
			try {
				const request: CustomerUpdateModel = call.request;
				const id = request.array[0]
				const body = {
					"Prefix": request.array[1],
					"FirstName": request.array[2],
					"LastName": request.array[3],
					"Mobile": request.array[4],
					"Email": request.array[5],
					"Gender": request.array[6],
					// "BirthDate":request.array[6],
					"DisplayPicture": request.array[8],
					"Address": request.array[9],
					"InAppUser" : request.array[10],
					"IsActive": request.array[11]
				}

				const record = await delegate.update(id, body);
				const response = new CustomerUpdateResponse();
				const result = record;

				response.setId(result.id)
				response.setPrefix(result.Prefix)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setGender(result.Gender)
				response.setDisplaypicture(result.DisplayPicture)
				response.setAddress(result.Address)
				response.setInappuser(result.InAppUser)
				response.setIsactive(result.IsActive)
				console.log("Customer updated successfully")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	async delete(call: ServerUnaryCall<CustomerDeleteModel, CustomerDeleteResponse>,
		callback: sendUnaryData<CustomerDeleteResponse>): Promise<void> {
			try {
				const request : CustomerDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new CustomerDeleteResponse();

				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Customer deleted successfully.");
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