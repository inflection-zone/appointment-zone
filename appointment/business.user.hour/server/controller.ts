import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  BusinessUserHourCreateModel,
  BusinessUserHourCreateResponse,
  BusinessUserHourGetByIdModel,
  BusinessUserHourGetByIdResponse,
  BusinessUserHourUpdateModel,
  BusinessUserHourUpdateResponse,
  BusinessUserHourDeleteModel,
  BusinessUserHourDeleteResponse,
  BusinessUserHourSearchModel,
  BusinessUserHourSearchResponse
 } from '../proto/businessuserhour_pb';
import { BusinessUserHourControllerDelegate } from '../../../src/api/business.user.hour/business.user.hour.controller.delegate';

const delegate = new BusinessUserHourControllerDelegate();
export const businessUserHourService = {

  create: (call: ServerUnaryCall<BusinessUserHourCreateModel, BusinessUserHourCreateResponse>,
    callback: sendUnaryData<BusinessUserHourCreateResponse>) => {
    try {
    const request: BusinessUserHourCreateModel = call.request;
    const body = {      
        "BusinessUserId": request.array[0],
        "Type": request.array[1],
        "Day": request.array[2],
        "Date": request.array[3],
        "IsOpen": request.array[4],
        "IsActive": request.array[5],
    }
    
    const record = delegate.create(body);
    const response = new BusinessUserHourCreateResponse();
    console.log("Business user hour created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<BusinessUserHourGetByIdModel, BusinessUserHourGetByIdResponse>,
    callback: sendUnaryData<BusinessUserHourGetByIdResponse>): Promise<void> {
    try {
    const request : BusinessUserHourGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new BusinessUserHourGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Business user hour retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<BusinessUserHourUpdateModel, BusinessUserHourUpdateResponse>,
    callback: sendUnaryData<BusinessUserHourUpdateResponse>) => {
    try {
    const request: BusinessUserHourUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      "BusinessUserId": request.array[1],
      "Type": request.array[2],
      "Day": request.array[3],
      "Date": request.array[4],
      "IsOpen": request.array[5],
      "IsActive": request.array[6],
  }
    const record = delegate.update(id, body);
    const response = new BusinessUserHourUpdateResponse();
    console.log("Business user hour updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<BusinessUserHourDeleteModel, BusinessUserHourDeleteResponse>,
    callback: sendUnaryData<BusinessUserHourDeleteResponse>): Promise<void> {
    try {
    const request : BusinessUserHourDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new BusinessUserHourDeleteResponse();
    console.log("record====",record)
    console.log("Business user hour deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<BusinessUserHourSearchModel, BusinessUserHourSearchResponse>,
    callback: sendUnaryData<BusinessUserHourSearchResponse>): Promise<void> {
    try {
    const request : BusinessUserHourSearchModel = call.request;
    const query = {
      "businessUserId": request.array[0],
      "isActive": request.array[1],
    }
    const searchResults = await delegate.search(query);
    const response = new BusinessUserHourSearchResponse();
    console.log("record====",searchResults)
    console.log("Business user hour retrieved successfully")
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
