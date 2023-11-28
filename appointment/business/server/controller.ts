import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  BusinessCreateModel,
  BusinessCreateResponse,
  BusinessGetByIdModel,
  BusinessGetByIdResponse,
  BusinessUpdateModel,
  BusinessUpdateResponse,
  BusinessDeleteModel,
  BusinessDeleteResponse,
  BusinessSearchModel,
  BusinessSearchResponse
 } from '../proto/business_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { BusinessControllerDelegate } from '../../../src/api/business/business.controller.delegate';
import { request, response } from 'express';
import { ResponseHandler } from '../../../src/common/response.handler';

const delegate = new BusinessControllerDelegate();
export const businessService = {

  create: (call: ServerUnaryCall<BusinessCreateModel, BusinessCreateResponse>,
    callback: sendUnaryData<BusinessCreateResponse>) => {
    try {
    const request: BusinessCreateModel = call.request;
    const body = {      
        "ExternalId": request.array[0],
        "Name": request.array[1],
        "Mobile": request.array[2],
        "Email": request.array[3],
        "AboutUs": request.array[4],
        "ApiKey": request.array[5],
        "Logo": request.array[6],
        "DisplayPicture":request.array[7],
        "Address": request.array[8],
        "Facebook": request.array[9],
        "Twitter" : request.array[10],
        "Linkedin": request.array[11],
        "Instagram": request.array[12],
        "Yelp": request.array[13],
        "IsActive" : request.array[14],
    }
    
    const record = delegate.create(body);
    const response = new BusinessCreateResponse();
    console.log("Business created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<BusinessGetByIdModel, BusinessGetByIdResponse>,
    callback: sendUnaryData<BusinessGetByIdResponse>): Promise<void> {
    try {
    const request : BusinessGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new BusinessGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Business retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<BusinessUpdateModel, BusinessUpdateResponse>,
    callback: sendUnaryData<BusinessUpdateResponse>) => {
    try {
    const request: BusinessUpdateModel = call.request;
    const id = request.array[0]
    const body = {
        "ExternalId": request.array[1],
        "Name": request.array[2],
        "Mobile": request.array[3],
        "Email": request.array[4],
        "AboutUs": request.array[5],
        "Logo": request.array[6],
        "DisplayPicture":request.array[7],
        "Address": request.array[8],
        "Facebook": request.array[9],
        "Twitter" : request.array[10],
        "Linkedin": request.array[11],
        "Instagram": request.array[12],
        "Yelp": request.array[13],
        "IsActive" : request.array[14],
  }
    const record = delegate.update(id, body);
    const response = new BusinessUpdateResponse();
    console.log("Business updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<BusinessDeleteModel, BusinessDeleteResponse>,
    callback: sendUnaryData<BusinessDeleteResponse>): Promise<void> {
    try {
    const request : BusinessDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new BusinessDeleteResponse();
    console.log("record====",record)
    console.log("Business deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<BusinessSearchModel, BusinessSearchResponse>,
    callback: sendUnaryData<BusinessSearchResponse>): Promise<void> {
    try {
    const request : BusinessSearchModel = call.request;
    const query = {
      "isActive": request.array[0]
    }
    const searchResults = await delegate.search(query);
    const response = new BusinessSearchResponse();
    console.log("record====",searchResults)
    console.log("Business retrieved successfully")
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
