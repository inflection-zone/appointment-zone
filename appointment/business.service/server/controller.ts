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
  BusinessServiceSearchResponse
 } from '../proto/businessservice_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { BusinessServiceControllerDelegate } from '../../../src/api/business.service/business.service.controller.delegate';
import { request, response } from 'express';
import { ResponseHandler } from '../../../src/common/response.handler';

const delegate = new BusinessServiceControllerDelegate();
export const businessServiceService = {

  create: (call: ServerUnaryCall<BusinessServiceCreateModel, BusinessServiceCreateResponse>,
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
    
    const record = delegate.create(body);
    const response = new BusinessServiceCreateResponse();
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
    console.log("record====",record)
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
    const record = delegate.update(id, body);
    const response = new BusinessServiceUpdateResponse();
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
    console.log("record====",record)
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
}
