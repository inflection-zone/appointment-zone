import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
	BusinessServiceCreateModel,
	BusinessServiceCreateResponse,
	BusinessServiceGetByIdModel,
	BusinessServiceGetByIdResponse,
	BusinessServiceUpdateModel,
	BusinessServiceUpdateResponse,
	BusinessServiceDeleteModel,
	BusinessServiceDeleteResponse,
	BusinessServiceSearchModel,
	BusinessServiceSearchResponse,
	BusinessServiceSearchResponseItem
} from '../proto/businessservice_pb';
import { BusinessServiceControllerDelegate } from '../../../src/api/business.service/business.service.controller.delegate';

const delegate = new BusinessServiceControllerDelegate();
export const businessServiceService = {

	create: async (call: ServerUnaryCall<BusinessServiceCreateModel, BusinessServiceCreateResponse>,
		callback: sendUnaryData<BusinessServiceCreateResponse>) => {
			try {
				const request: BusinessServiceCreateModel = call.request;
				const body = {      
					"BusinessNodeId": request.array[0],
					"Name": request.array[1],
					"Description": request.array[2],
					"ServiceDuration": request.array[3],
					"Fees": request.array[4],
					"IsTaxable": request.array[5],
					"TaxRate": request.array[6],
					"PaymentRequired":request.array[7],
					"PaymentPercent": request.array[8],
					"PriorBookingWindow": request.array[9],
					"SendReminder" : request.array[10],
					"ReminderWindow": request.array[11],
					"ReminderType": request.array[12],
					"AllowCancellation": request.array[13],
					"CancellationWindow" : request.array[14],
					"CancellationCharges": request.array[15],
					"EnableLoyalty": request.array[16],
					"IsActive" : request.array[17],
				}
			
				const record = await delegate.create(body);
				const response = new BusinessServiceCreateResponse();
				const result = record;

				response.setId(result.id)
				response.setBusinessnodeid(result.BusinessNodeId)
				response.setName(result.Name)
				response.setDescription(result.Description)
				response.setServiceduration(result.ServiceDuration)
				response.setFees(result.Fees)
				response.setIstaxable(result.IsTaxable)
				response.setTaxrate(result.TaxRate)
				response.setPaymentrequired(result.PaymentRequired)
				response.setPaymentpercent(result.PaymentPercent)
				response.setPriorbookingwindow(result.PriorBookingWindow)
				response.setSendreminder(result.SendReminder)
				response.setReminderwindow(result.ReminderWindow)
				response.setRemindertype(result.ReminderType)
				response.setAllowcancellation(result.AllowCancellation)
				response.setCancellationwindow(result.CancellationWindow)
				response.setCancellationcharges(result.CancellationCharges)
				response.setEnableloyalty(result.EnableLoyalty)
				response.setIsactive(result.IsActive)
				console.log("Business service created successfully") 
				callback(null, response);  
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},
		
	async getById(call: ServerUnaryCall<BusinessServiceGetByIdModel, BusinessServiceGetByIdResponse>,
		callback: sendUnaryData<BusinessServiceGetByIdResponse>): Promise<void> {
			try {
				const request : BusinessServiceGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new BusinessServiceGetByIdResponse();
				response.id = request.array[0];
				const result = record;

				response.setId(result.id)
				response.setBusinessnodeid(result.BusinessNodeId)
				response.setName(result.Name)
				response.setDescription(result.Description)
				response.setServiceduration(result.ServiceDuration)
				response.setFees(result.Fees)
				response.setIstaxable(result.IsTaxable)
				response.setTaxrate(result.TaxRate)
				response.setPaymentrequired(result.PaymentRequired)
				response.setPaymentpercent(result.PaymentPercent)
				response.setPriorbookingwindow(result.PriorBookingWindow)
				response.setSendreminder(result.SendReminder)
				response.setReminderwindow(result.ReminderWindow)
				response.setRemindertype(result.ReminderType)
				response.setAllowcancellation(result.AllowCancellation)
				response.setCancellationwindow(result.CancellationWindow)
				response.setCancellationcharges(result.CancellationCharges)
				response.setEnableloyalty(result.EnableLoyalty)
				response.setIsactive(result.IsActive)
				console.log("Business service retrieved successfully")
				callback(null, response);
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},

	async search(call: ServerUnaryCall<BusinessServiceSearchModel, BusinessServiceSearchResponse>,
		callback: sendUnaryData<BusinessServiceSearchResponse>): Promise<void> {
			try {
				const request : BusinessServiceSearchModel = call.request;
				const query = {
					"businessNodeId": request.array[0],
					"name": request.array[1],
					"isActive": request.array[2]
				}

				const searchResults = await delegate.search(query);
				const response = new BusinessServiceSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);
				response.setPageindex(searchResults.PageIndex);
				response.setItemsperpage(searchResults.ItemsPerPage);
				response.setOrder(searchResults.Order);

				const itemsList = searchResults.Items.map((item: BusinessServiceSearchResponseItem) => {
					const responseItem = new BusinessServiceSearchResponseItem();
					responseItem.setId(item.id);
					responseItem.setBusinessnodeid(item.BusinessNodeId);
					responseItem.setName(item.Name)
					responseItem.setDescription(item.Description)
					responseItem.setServiceduration(item.ServiceDuration)
					responseItem.setFees(item.Fees)
					responseItem.setIstaxable(item.IsTaxable)
					responseItem.setTaxrate(item.TaxRate)
					responseItem.setPaymentrequired(item.PaymentRequired)
					responseItem.setPaymentpercent(item.PaymentPercent)
					responseItem.setPriorbookingwindow(item.PriorBookingWindow)
					responseItem.setSendreminder(item.SendReminder)
					responseItem.setReminderwindow(item.ReminderWindow)
					responseItem.setRemindertype(item.ReminderType)
					responseItem.setAllowcancellation(item.Allowcancellation)
					responseItem.setCancellationwindow(item.CancellationWindow)
					responseItem.setCancellationcharges(item.CancellationCharges)
					responseItem.setEnableloyalty(item.EnableLoyalty)
					responseItem.setIsactive(item.IsActive);
					return responseItem;
				});

				response.setItemsList(itemsList);
				console.log("record====",searchResults)
				console.log("Business service retrieved successfully")
				callback(null, response); 
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},

	update :async (call: ServerUnaryCall<BusinessServiceUpdateModel, BusinessServiceUpdateResponse>,
		callback: sendUnaryData<BusinessServiceUpdateResponse>) => {
			try {
				const request: BusinessServiceUpdateModel = call.request;
				const id = request.array[0]
				const body = {
					"BusinessNodeId": request.array[1],
					"Name": request.array[2],
					"Description": request.array[3],
					"ServiceDuration": request.array[4],
					"Fees": request.array[5],
					"IsTaxable": request.array[6],
					"TaxRate": request.array[7],
					"PaymentRequired":request.array[8],
					"PaymentPercent": request.array[9],
					"PriorBookingWindow": request.array[10],
					"SendReminder" : request.array[11],
					"ReminderWindow": request.array[12],
					"ReminderType": request.array[13],
					"AllowCancellation": request.array[14],
					"CancellationWindow" : request.array[15],
					"CancellationCharges": request.array[16],
					"EnableLoyalty": request.array[17],
					"IsActive" : request.array[18],
				}

				const record = await delegate.update(id, body);
				const response = new BusinessServiceUpdateResponse();
				const result = record;

				response.setId(result.id)
				response.setBusinessnodeid(result.BusinessNodeId)
				response.setName(result.Name)
				response.setDescription(result.Description)
				response.setServiceduration(result.ServiceDuration)
				response.setFees(result.Fees)
				response.setIstaxable(result.IsTaxable)
				response.setTaxrate(result.TaxRate)
				response.setPaymentrequired(result.PaymentRequired)
				response.setPaymentpercent(result.PaymentPercent)
				response.setPriorbookingwindow(result.PriorBookingWindow)
				response.setSendreminder(result.SendReminder)
				response.setReminderwindow(result.ReminderWindow)
				response.setRemindertype(result.ReminderType)
				response.setAllowcancellation(result.AllowCancellation)
				response.setCancellationwindow(result.CancellationWindow)
				response.setCancellationcharges(result.CancellationCharges)
				response.setEnableloyalty(result.EnableLoyalty)
				response.setIsactive(result.IsActive)
				console.log("Business service updated successfully")
				callback(null, response);
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},
	
	async delete(call: ServerUnaryCall<BusinessServiceDeleteModel, BusinessServiceDeleteResponse>,
		callback: sendUnaryData<BusinessServiceDeleteResponse>): Promise<void> {
			try {
				const request : BusinessServiceDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new BusinessServiceDeleteResponse();

				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Business service deleted successfully")
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
