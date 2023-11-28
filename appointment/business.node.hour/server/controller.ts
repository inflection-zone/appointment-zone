import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  BusinessNodeHourCreateModel,
  BusinessNodeHourCreateResponse,
  BusinessNodeHourGetByIdModel,
  BusinessNodeHourGetByIdResponse,
  BusinessNodeHourUpdateModel,
  BusinessNodeHourUpdateResponse,
  BusinessNodeHourDeleteModel,
  BusinessNodeHourDeleteResponse,
  BusinessNodeHourSearchModel,
  BusinessNodeHourSearchResponse
 } from '../proto/businessnodehour_pb';
import { BusinessNodeHourControllerDelegate } from '../../../src/api/business.node.hour/business.node.hour.controller.delegate';

const delegate = new BusinessNodeHourControllerDelegate();
export const businessNodeHourService = {

  create: (call: ServerUnaryCall<BusinessNodeHourCreateModel, BusinessNodeHourCreateResponse>,
    callback: sendUnaryData<BusinessNodeHourCreateResponse>) => {
    try {
    const request: BusinessNodeHourCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "Type": request.array[1],
        "Day": request.array[2],
        "Date": request.array[3],
        "IsOpen": request.array[4],
        "IsActive": request.array[5],
    }
    
    const record = delegate.create(body);
    const response = new BusinessNodeHourCreateResponse();
    console.log("Business node hour created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<BusinessNodeHourGetByIdModel, BusinessNodeHourGetByIdResponse>,
    callback: sendUnaryData<BusinessNodeHourGetByIdResponse>): Promise<void> {
    try {
    const request : BusinessNodeHourGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new BusinessNodeHourGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Business node hour retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<BusinessNodeHourUpdateModel, BusinessNodeHourUpdateResponse>,
    callback: sendUnaryData<BusinessNodeHourUpdateResponse>) => {
    try {
    const request: BusinessNodeHourUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      "BusinessNodeId": request.array[1],
        "Type": request.array[2],
        "Day": request.array[3],
        "Date": request.array[4],
        "IsOpen": request.array[5],
        "IsActive": request.array[6],
  }
    const record = delegate.update(id, body);
    const response = new BusinessNodeHourUpdateResponse();
    console.log("Business node hour updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<BusinessNodeHourDeleteModel, BusinessNodeHourDeleteResponse>,
    callback: sendUnaryData<BusinessNodeHourDeleteResponse>): Promise<void> {
    try {
    const request : BusinessNodeHourDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new BusinessNodeHourDeleteResponse();
    console.log("record====",record)
    console.log("Business node hour deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<BusinessNodeHourSearchModel, BusinessNodeHourSearchResponse>,
    callback: sendUnaryData<BusinessNodeHourSearchResponse>): Promise<void> {
    try {
    const request : BusinessNodeHourSearchModel = call.request;
    const query = {
      "businessNodeId": request.array[0],
      "type": request.array[1],
      "day": request.array[2],
      "date": request.array[3],
      "isOpen": request.array[4],
      "isActive": request.array[5]
    }
    const searchResults = await delegate.search(query);
    const response = new BusinessNodeHourSearchResponse();
    console.log("record====",searchResults)
    console.log("Business node hour retrieved successfully")
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
