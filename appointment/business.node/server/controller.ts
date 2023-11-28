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
  BusinessNodeSearchResponse
 } from '../proto/businessnode_pb';
import { BusinessNodeControllerDelegate } from '../../../src/api/business.node/business.node.controller.delegate';

const delegate = new BusinessNodeControllerDelegate();
export const businessNodeService = {

  create: (call: ServerUnaryCall<BusinessNodeCreateModel, BusinessNodeCreateResponse>,
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
    
    const record = delegate.create(body);
    const response = new BusinessNodeCreateResponse();
    console.log("Business node created successfully") 
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
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Business node retrieved successfully")
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
    const record = delegate.update(id, body);
    const response = new BusinessNodeUpdateResponse();
    console.log("Business node updated successfully")
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
    console.log("record====",record)
    console.log("Business node deleted successfully")
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
    console.log("record====",searchResults)
    console.log("Business node retrieved successfully")
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
