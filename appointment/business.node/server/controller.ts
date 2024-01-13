import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
	BusinessNodeCreateModel,
	BusinessNodeCreateResponse,
	BusinessNodeGetByIdModel,
	BusinessNodeGetByIdResponse,
	BusinessNodeUpdateModel,
	BusinessNodeUpdateResponse,
	BusinessNodeDeleteModel,
	BusinessNodeDeleteResponse,
	BusinessNodeSearchModel,
	BusinessNodeSearchResponse,
	BusinessNodeSearchResponseItem
} from '../proto/business.node_pb';
import { BusinessNodeControllerDelegate } from '../../../src/api/business.node/business.node.controller.delegate';

const delegate = new BusinessNodeControllerDelegate();
export const businessNodeService = {

	create: async (call: ServerUnaryCall<BusinessNodeCreateModel, BusinessNodeCreateResponse>,
		callback: sendUnaryData<BusinessNodeCreateResponse>) => {
			try {
				const request: BusinessNodeCreateModel = call.request;
				const body = {      
					"BusinessId": request.array[0],
					"Name": request.array[1],
					"Mobile": request.array[2],
					"Email": request.array[3],
					"DisplayPicture": request.array[4],
					"Address": request.array[5],
					"Longitude": request.array[6],
					"Lattitude":request.array[7],
					"OverallRating": request.array[8],
					"AllowWalkinAppointments": request.array[9],
					"AllowFutureBookingFor" : request.array[10],
					"IsActive": request.array[11],
				}

				const record = await delegate.create(body);
				const response = new BusinessNodeCreateResponse();
				const result = record;
				
				response.setId(result.Node.id)
				response.setBusinessid(result.Node.BusinessId)
				response.setName(result.Node.Name)
				response.setMobile(result.Node.Mobile)
				response.setEmail(result.Node.Email)
				response.setAddress(result.Node.Address)
				response.setLongitude(result.Node.Longitude)
				response.setLattitude(result.Node.Lattitude)
				response.setDisplaypicture(result.Node.DisplayPicture)
				response.setOverallrating(result.Node.OverallRating)
				response.setAllowwalkinappointments(result.Node.AllowWalkinAppointments)
				response.setAllowfuturebookingfor(result.Node.AllowFutureBookingFor)
				response.setIsactive(result.Node.IsActive)
				console.log("Business node created successfully.") 
				callback(null, response);  
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
	},
			
	async getById(call: ServerUnaryCall<BusinessNodeGetByIdModel, BusinessNodeGetByIdResponse>,
		callback: sendUnaryData<BusinessNodeGetByIdResponse>): Promise<void> {
			try {
				const request : BusinessNodeGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new BusinessNodeGetByIdResponse();
				const result = record;
				response.id = request.array[0];

				response.setId(result.id)
				response.setBusinessid(result.BusinessId)
				response.setName(result.Name)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setAddress(result.Address)
				response.setLongitude(result.Longitude)
				response.setLattitude(result.Lattitude)
				response.setDisplaypicture(result.DisplayPicture)
				response.setOverallrating(result.OverallRating)
				response.setAllowwalkinappointments(result.AllowWalkinAppointments)
				response.setAllowfuturebookingfor(result.AllowFutureBookingFor)
				response.setIsactive(result.IsActive)
				console.log("record====",record)
				console.log("Business node retrieved successfully.")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
				}
		},

	async search(call: ServerUnaryCall<BusinessNodeSearchModel, BusinessNodeSearchResponse>,
		callback: sendUnaryData<BusinessNodeSearchResponse>): Promise<void> {
			try {
				const request : BusinessNodeSearchModel = call.request;
				const query = {
					"businessId": request.array[0],
					"name": request.array[1],
					"isActive": request.array[2]
				}

				const searchResults = await delegate.search(query);
				const response = new BusinessNodeSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
                response.setRetrievedcount(searchResults.RetrievedCount);
                response.setPageindex(searchResults.PageIndex);
                response.setItemsperpage(searchResults.ItemsPerPage);
                response.setOrder(searchResults.Order);

				const itemsList = searchResults.Items.map((item: BusinessNodeSearchResponseItem) => {
                    const responseItem = new BusinessNodeSearchResponseItem();
                    responseItem.setId(item.id);
                    responseItem.setBusinessid(item.BusinessId);
					responseItem.setName(item.Name);
                    responseItem.setMobile(item.Mobile);
                    responseItem.setEmail(item.Email);
                    responseItem.setAddress(item.Address);
                    responseItem.setLongitude(item.Longitude);
					responseItem.setLattitude(item.Lattitude);
					responseItem.setDisplaypicture(item.DisplayPicture);
                    responseItem.setOverallrating(item.OverallRating);
                    responseItem.setAllowwalkinappointments(item.AllowWalkinAppointments);
                    responseItem.setAllowfuturebookingfor(item.AllowFutureBookingFor);
                    responseItem.setIsactive(item.IsActive);
					return responseItem;
				});

				response.setItemsList(itemsList);
				console.log("record====",searchResults)
				console.log("Business node retrieved successfully.")
				callback(null, response); 
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},

	update :async (call: ServerUnaryCall<BusinessNodeUpdateModel, BusinessNodeUpdateResponse>,
		callback: sendUnaryData<BusinessNodeUpdateResponse>) => {
			try {
				const request: BusinessNodeUpdateModel = call.request;
				const id = request.array[0]
				const body = {
					"BusinessId": request.array[1],
					"Name": request.array[2],
					"Mobile": request.array[3],
					"Email": request.array[4],
					"DisplayPicture": request.array[5],
					"Address": request.array[6],
					"Longitude": request.array[7],
					"Lattitude":request.array[8],
					"OverallRating": request.array[9],
					"AllowWalkinAppointments": request.array[10],
					"AllowFutureBookingFor" : request.array[11],
					"IsActive": request.array[12],
				}

				const record = await delegate.update(id, body);
				const response = new BusinessNodeUpdateResponse();
				const result = record;

				response.setId(result.id)
				response.setBusinessid(result.BusinessId)
				response.setName(result.Name)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setAddress(result.Address)
				response.setLongitude(result.Longitude)
				response.setLattitude(result.Lattitude)
				response.setDisplaypicture(result.DisplayPicture)
				response.setOverallrating(result.OverallRating)
				response.setAllowwalkinappointments(result.AllowWalkinAppointments)
				response.setAllowfuturebookingfor(result.AllowFutureBookingFor)
				response.setIsactive(result.IsActive)
				console.log("Business node updated successfully.")
				callback(null, response);
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},
	
	async delete(call: ServerUnaryCall<BusinessNodeDeleteModel, BusinessNodeDeleteResponse>,
		callback: sendUnaryData<BusinessNodeDeleteResponse>): Promise<void> {
			try {
				const request : BusinessNodeDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new BusinessNodeDeleteResponse();
				
				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Business node deleted successfully.");
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
