import grpc, { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import {
  AppointmentStatusCreateModel,
  AppointmentStatusCreateResponse,
  AppointmentStatusGetByIdModel,
  AppointmentStatusGetByIdResponse,
  AppointmentStatusUpdateModel,
  AppointmentStatusUpdateResponse,
  AppointmentStatusDeleteModel,
  AppointmentStatusDeleteResponse,
  AppointmentStatusSearchModel,
  AppointmentStatusSearchResponse,
  AppointmentStatusSearchResponseItem,
} from "../proto/appointmentstatus_pb";
import { AppointmentStatusControllerDelegate } from "../../../src/api/appointment.status/appointment.status.controller.delegate";

const delegate = new AppointmentStatusControllerDelegate();
export const appointmentStatusService = {
  	create: async (call: ServerUnaryCall<AppointmentStatusCreateModel,AppointmentStatusCreateResponse>,
    	callback: sendUnaryData<AppointmentStatusCreateResponse>) => {
    		try {
				const request: AppointmentStatusCreateModel = call.request;
				const body = {
					BusinessNodeId: request.array[0],
					Status: request.array[1],
					StatusCode: request.array[2],
					StatusColor: request.array[3],
					Sequence: request.array[4],
					IsCancellationStatus: request.array[5],
					SendNotification: request.array[6],
					NotificationText: request.array[7],
					SendSms: request.array[8],
					SmsText: request.array[9],
					IsDashboardStatus: request.array[10],
					IsCompletedStatus: request.array[11],
					IsWalkinEntryStatus: request.array[12],
					IsActive: request.array[13],
				};
				const record = await delegate.create(body);
				const response = new AppointmentStatusCreateResponse();
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setStatus(result.Status);
				response.setStatuscode(result.StatusCode);
				response.setStatuscolor(result.StatusColor);
				response.setSequence(result.Sequence);
				response.setIscancellationstatus(result.IsCancellationStatus);
				response.setSendnotification(result.SendNotification);
				response.setNotificationtext(result.NotificationText);
				response.setSendsms(result.SendSms);
				response.setIsdashboardstatus(result.IsDashboardStatus);
				response.setIscompletedstatus(result.IsCompletedStatus);
				response.setIswalkinentrystatus(result.IsWalkinEntryStatus);
				response.setIsactive(result.IsActive);
				console.log("Appointment status created successfully");
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

    async getById(call: ServerUnaryCall<AppointmentStatusGetByIdModel,AppointmentStatusGetByIdResponse>,
    	callback: sendUnaryData<AppointmentStatusGetByIdResponse>): Promise<void> {
    		try {
				const request: AppointmentStatusGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new AppointmentStatusGetByIdResponse();
				response.id = request.array[0];
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setStatus(result.Status);
				response.setStatuscode(result.StatusCode);
				response.setStatuscolor(result.StatusColor);
				response.setSequence(result.Sequence);
				response.setIscancellationstatus(result.IsCancellationStatus);
				response.setSendnotification(result.SendNotification);
				response.setNotificationtext(result.NotificationText);
				response.setSendsms(result.SendSms);
				response.setIsdashboardstatus(result.IsDashboardStatus);
				response.setIscompletedstatus(result.IsCompletedStatus);
				response.setIswalkinentrystatus(result.IsWalkinEntryStatus);
				response.setIsactive(result.IsActive);
				console.log("record====", record);
				console.log("Appointment status retrieved successfully");
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

	async search(call: ServerUnaryCall<AppointmentStatusSearchModel,AppointmentStatusSearchResponse>,
    	callback: sendUnaryData<AppointmentStatusSearchResponse>): Promise<void> {
    		try {
				const request: AppointmentStatusSearchModel = call.request;
				const query = {
					businessNodeId: request.array[0],
				};
				const searchResults = await delegate.search(query);
				const response = new AppointmentStatusSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);
				response.setPageindex(searchResults.PageIndex);
				response.setItemsperpage(searchResults.ItemsPerPage);
				response.setOrder(searchResults.Order);
				const itemsList = searchResults.Items.map((item: AppointmentStatusSearchResponseItem) => {
					const responseItem = new AppointmentStatusSearchResponseItem();
					responseItem.setId(item.id);
					responseItem.setBusinessnodeid(item.BusinessNodeId);
					responseItem.setStatus(item.Status);
					responseItem.setStatuscode(item.StatusCode);
					responseItem.setStatuscolor(item.StatusColor);
					responseItem.setSequence(item.Sequence);
					responseItem.setIscancellationstatus(item.IsCancellationStatus);
					responseItem.setSendnotification(item.SendNotification);
					responseItem.setNotificationtext(item.NotificationText);
					responseItem.setSendsms(item.SendSms);
					responseItem.setSmstext(item.SmsText);
					responseItem.setIsdashboardstatus(item.IsDashboardStatus);
					responseItem.setIscompletedstatus(item.IsCompletedStatus);
					responseItem.setIswalkinentrystatus(item.IsWalkinEntryStatus);
					responseItem.setIsactive(item.IsActive);
					// responseItem.setCreatedat(item.CreatedAt);
					// responseItem.setUpdatedat(item.UpdatedAt);
					// responseItem.setDeletedat(item.DeletedAt);
					// responseItem.setIsdeleted(item.IsDeleted);
					return responseItem;
				}
				);
				response.setItemsList(itemsList);
				console.log("record====", searchResults);
				console.log("Appointment Status retrived successfully");
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

    update: async (call: ServerUnaryCall<AppointmentStatusUpdateModel,AppointmentStatusUpdateResponse>,
    	callback: sendUnaryData<AppointmentStatusUpdateResponse>) => {
    		try {
				const request: AppointmentStatusUpdateModel = call.request;
				const id = request.array[0];
				const body = {
					BusinessNodeId: request.array[1],
					Status: request.array[2],
					StatusCode: request.array[3],
					StatusColor: request.array[4],
					Sequence: request.array[5],
					IsCancellationStatus: request.array[6],
					SendNotification: request.array[7],
					NotificationText: request.array[8],
					SendSms: request.array[9],
					SmsText: request.array[10],
					IsDashboardStatus: request.array[11],
					IsCompletedStatus: request.array[12],
					IsWalkinEntryStatus: request.array[13],
					IsActive: request.array[14],
				};
				const record = await delegate.update(id, body);
				const response = new AppointmentStatusUpdateResponse();
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setStatus(result.Status);
				response.setStatuscode(result.StatusCode);
				response.setStatuscolor(result.StatusColor);
				response.setSequence(result.Sequence);
				response.setIscancellationstatus(result.IsCancellationStatus);
				response.setSendnotification(result.SendNotification);
				response.setNotificationtext(result.NotificationText);
				response.setSendsms(result.SendSms);
				response.setIsdashboardstatus(result.IsDashboardStatus);
				response.setIscompletedstatus(result.IsCompletedStatus);
				response.setIswalkinentrystatus(result.IsWalkinEntryStatus);
				response.setIsactive(result.IsActive);
				console.log("Appointment status updated successfully");
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

    async delete(call: ServerUnaryCall<AppointmentStatusDeleteModel,AppointmentStatusDeleteResponse>,
    	callback: sendUnaryData<AppointmentStatusDeleteResponse>): Promise<void> {
    		try {
				const request: AppointmentStatusDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new AppointmentStatusDeleteResponse();
				console.log("record====", record);
				console.log("Appointment status deleted successfully");
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