import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
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
  NotificationSearchResponse
 } from '../proto/notification_pb';
import { NotificationControllerDelegate } from '../../../src/api/notification/notification.controller.delegate';

const delegate = new NotificationControllerDelegate();
export const notificationService = {

  create: (call: ServerUnaryCall<NotificationCreateModel, NotificationCreateResponse>,
    callback: sendUnaryData<NotificationCreateResponse>) => {
    try {
    const request: NotificationCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "CustomerId": request.array[1],
        "Title": request.array[2],
        "Body": request.array[3],
        "Type": request.array[4],
        "IsRead": request.array[5],
        "TypeId": request.array[6],
        "Message":request.array[7],
        "IsSent": request.array[8],
        "IsActive": request.array[9],
    }
    
    const record = delegate.create(body);
    const response = new NotificationCreateResponse();
    console.log("Notification created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<NotificationGetByIdModel, NotificationGetByIdResponse>,
    callback: sendUnaryData<NotificationGetByIdResponse>): Promise<void> {
    try {
    const request : NotificationGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new NotificationGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Notification retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<NotificationUpdateModel, NotificationUpdateResponse>,
    callback: sendUnaryData<NotificationUpdateResponse>) => {
    try {
    const request: NotificationUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      "BusinessNodeId": request.array[1],
      "CustomerId": request.array[2],
      "Title": request.array[3],
      "Body": request.array[4],
      "Type": request.array[5],
      "IsRead": request.array[6],
      "TypeId": request.array[7],
      "Message":request.array[8],
      "IsSent": request.array[9],
      "IsActive": request.array[10],
  }
    const record = delegate.update(id, body);
    const response = new NotificationUpdateResponse();
    console.log("Notification updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<NotificationDeleteModel, NotificationDeleteResponse>,
    callback: sendUnaryData<NotificationDeleteResponse>): Promise<void> {
    try {
    const request : NotificationDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new NotificationDeleteResponse();
    console.log("record====",record)
    console.log("Notification deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<NotificationSearchModel, NotificationSearchResponse>,
    callback: sendUnaryData<NotificationSearchResponse>): Promise<void> {
    try {
    const request : NotificationSearchModel = call.request;
    const query = {
      "businessNodeId": request.array[0],
      "customerId": request.array[1],
      "isActive": request.array[2]
    }
    const searchResults = await delegate.search(query);
    const response = new NotificationSearchResponse();
    console.log("record====",searchResults)
    console.log("Notification retrieved successfully")
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
