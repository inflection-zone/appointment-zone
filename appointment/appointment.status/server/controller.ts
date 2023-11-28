import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
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
  AppointmentStatusSearchResponse
 } from '../proto/appointmentstatus_pb';
import { AppointmentStatusControllerDelegate } from '../../../src/api/appointment.status/appointment.status.controller.delegate';

const delegate = new AppointmentStatusControllerDelegate();
export const appointmentStatusService = {

  create: (call: ServerUnaryCall<AppointmentStatusCreateModel, AppointmentStatusCreateResponse>,
    callback: sendUnaryData<AppointmentStatusCreateResponse>) => {
    try {
    const request: AppointmentStatusCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "Status": request.array[1],
        "StatusCode": request.array[2],
        "StatusColor": request.array[3],
        "Sequence": request.array[4],
        "IsCancellationStatus": request.array[5],
        "SendNotification": request.array[6],
        "NotificationText": request.array[7],
        "SendSms": request.array[8],
        "SmsText": request.array[9],
        "IsDashboardStatus": request.array[10],
        "IsCompletedStatus": request.array[11],
        "IsWalkinEntryStatus": request.array[12],
        "IsActive": request.array[13],
    }
    
    const record = delegate.create(body);
    const response = new AppointmentStatusCreateResponse();
    console.log("Appointment status created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<AppointmentStatusGetByIdModel, AppointmentStatusGetByIdResponse>,
    callback: sendUnaryData<AppointmentStatusGetByIdResponse>): Promise<void> {
    try {
    const request : AppointmentStatusGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new AppointmentStatusGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Appointment status retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<AppointmentStatusUpdateModel, AppointmentStatusUpdateResponse>,
    callback: sendUnaryData<AppointmentStatusUpdateResponse>) => {
    try {
    const request: AppointmentStatusUpdateModel = call.request;
    const id = request.array[0]
    const body = {
        "BusinessNodeId": request.array[1],
        "Status": request.array[2],
        "StatusCode": request.array[3],
        "StatusColor": request.array[4],
        "Sequence": request.array[5],
        "IsCancellationStatus": request.array[6],
        "SendNotification": request.array[7],
        "NotificationText": request.array[8],
        "SendSms": request.array[9],
        "SmsText": request.array[10],
        "IsDashboardStatus": request.array[11],
        "IsCompletedStatus": request.array[12],
        "IsWalkinEntryStatus": request.array[13],
        "IsActive": request.array[14],
  }
    const record = delegate.update(id, body);
    const response = new AppointmentStatusUpdateResponse();
    console.log("Appointment status updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<AppointmentStatusDeleteModel, AppointmentStatusDeleteResponse>,
    callback: sendUnaryData<AppointmentStatusDeleteResponse>): Promise<void> {
    try {
    const request : AppointmentStatusDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new AppointmentStatusDeleteResponse();
    console.log("record====",record)
    console.log("Appointment status deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<AppointmentStatusSearchModel, AppointmentStatusSearchResponse>,
    callback: sendUnaryData<AppointmentStatusSearchResponse>): Promise<void> {
    try {
    const request : AppointmentStatusSearchModel = call.request;
    const query = {
        "businessNodeId": request.array[0],
    }
    const searchResults = await delegate.search(query);
    const response = new AppointmentStatusSearchResponse();
    console.log("record====",searchResults)
    console.log("Appointment status retrieved successfully")
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
