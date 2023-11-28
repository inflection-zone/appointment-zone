import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  BusinessNodeCustomerCreateModel,
  BusinessNodeCustomerCreateResponse,
  BusinessNodeCustomerGetByIdModel,
  BusinessNodeCustomerGetByIdResponse,
  BusinessNodeCustomerUpdateModel,
  BusinessNodeCustomerUpdateResponse,
  BusinessNodeCustomerDeleteModel,
  BusinessNodeCustomerDeleteResponse,
  BusinessNodeCustomerSearchModel,
  BusinessNodeCustomerSearchResponse
 } from '../proto/businessnodecustomer_pb';
import { BusinessNodeCustomerControllerDelegate } from '../../../src/api/business.node.customer/business.node.customer.controller.delegate';
import { BaseController } from '../../../src/api/base.controller';

const delegate = new BusinessNodeCustomerControllerDelegate();
// delegate BusinessNodeCustomerControllerDelegate() ;
// const delegate = new BusinessNodeCustomerControllerDelegate();
class  BusinessNodeCustomerService  {

  create= async (call: ServerUnaryCall<BusinessNodeCustomerCreateModel, BusinessNodeCustomerCreateResponse>,
    callback: sendUnaryData<BusinessNodeCustomerCreateResponse>): Promise <void> => {
    try {
    const request: BusinessNodeCustomerCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "CustomerId": request.array[1],
        "SmsConsent": request.array[2],
        "IsActive": request.array[3],
    }
    
    const record = delegate.create(body);
    const response = new BusinessNodeCustomerCreateResponse();
    console.log("Business node customer created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  }
  
  getById = async (call: ServerUnaryCall<BusinessNodeCustomerGetByIdModel, BusinessNodeCustomerGetByIdResponse>,
    callback: sendUnaryData<BusinessNodeCustomerGetByIdResponse>): Promise <void> => {
    try {
    const request : BusinessNodeCustomerGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new BusinessNodeCustomerGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Business node customer retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  };

  search = async (call: ServerUnaryCall<BusinessNodeCustomerSearchModel, BusinessNodeCustomerSearchResponse>,
    callback: sendUnaryData<BusinessNodeCustomerSearchResponse>): Promise <void> => {
    try {
    const request : BusinessNodeCustomerSearchModel = call.request;
    const query = {
      "businessNodeId": request.array[0],
      "customerId": request.array[1],
      "isActive": request.array[2]
    }
    const searchResults = await delegate.search(query);
    const response = new BusinessNodeCustomerSearchResponse();
    console.log("record====",searchResults)
    console.log("Business node customer retrieved successfully")
    callback(null, response); 
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  };

  update = async (call: ServerUnaryCall<BusinessNodeCustomerUpdateModel, BusinessNodeCustomerUpdateResponse>,
    callback: sendUnaryData<BusinessNodeCustomerUpdateResponse>): Promise <void> => {
    try {
    const request: BusinessNodeCustomerUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      "BusinessNodeId": request.array[1],
      "CustomerId": request.array[2],
      "SmsConsent": request.array[3],
      "IsActive": request.array[4],
  }
    const record = delegate.update(id, body);
    const response = new BusinessNodeCustomerUpdateResponse();
    console.log("Business node customer updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  };
  
  delete = async (call: ServerUnaryCall<BusinessNodeCustomerDeleteModel, BusinessNodeCustomerDeleteResponse>,
    callback: sendUnaryData<BusinessNodeCustomerDeleteResponse>): Promise <void> => {
    try {
    const request : BusinessNodeCustomerDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new BusinessNodeCustomerDeleteResponse();
    console.log("record====",record)
    console.log("Business node customer deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  };

  // search = async (call: ServerUnaryCall<BusinessNodeCustomerSearchModel, BusinessNodeCustomerSearchResponse>,
  //   callback: sendUnaryData<BusinessNodeCustomerSearchResponse>): Promise <void> => {
  //   try {
  //   const request : BusinessNodeCustomerSearchModel = call.request;
  //   const query = {
  //     "businessNodeId": request.array[0],
  //     "customerId": request.array[1],
  //     "isActive": request.array[2]
  //   }
  //   const searchResults = await delegate.search(query);
  //   const response = new BusinessNodeCustomerSearchResponse();
  //   console.log("record====",searchResults)
  //   console.log("Business node customer retrieved successfully")
  //   callback(null, response); 
    
  // } catch (error) {
  //   console.log(error)
  //   callback({
  //     code: grpc.status.INTERNAL,
  //     details: 'Internal Server Error',
  //   }, null);
  // }
  // };
}

const businessNodeCustomerServiceInstance = new BusinessNodeCustomerService();

export default businessNodeCustomerServiceInstance;