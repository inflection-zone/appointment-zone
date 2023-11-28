import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  CustomerCreateModel,
  CustomerCreateResponse,
  CustomerGetByIdModel,
  CustomerGetByIdResponse,
  CustomerUpdateModel,
  CustomerUpdateResponse,
  CustomerDeleteModel,
  CustomerDeleteResponse,
  CustomerSearchModel,
  CustomerSearchResponse
 } from '../proto/customer_pb';
import { CustomerControllerDelegate } from '../../../src/api/customer/customer.controller.delegate';

const delegate = new CustomerControllerDelegate();
export const customerService = {

  create: (call: ServerUnaryCall<CustomerCreateModel, CustomerCreateResponse>,
    callback: sendUnaryData<CustomerCreateResponse>) => {
    try {
    const request: CustomerCreateModel = call.request;
    const body = {      
        "Prefix": request.array[0],
        "FirstName": request.array[1],
        "LastName": request.array[2],
        "Mobile": request.array[3],
        "Email": request.array[4],
        "Gender": request.array[5],
        // "BirthDate":request.array[6],
        "DisplayPicture": request.array[7],
        "Address": request.array[8],
        "InAppUser" : request.array[9],
        "IsActive": request.array[10]
    }
    
    const record = delegate.create(body);
    const response = new CustomerCreateResponse();
    console.log("Customer created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<CustomerGetByIdModel, CustomerGetByIdResponse>,
    callback: sendUnaryData<CustomerGetByIdResponse>): Promise<void> {
    try {
    const request : CustomerGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new CustomerGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Customer retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<CustomerUpdateModel, CustomerUpdateResponse>,
    callback: sendUnaryData<CustomerUpdateResponse>) => {
    try {
    const request: CustomerUpdateModel = call.request;
    // const id = "110c16d6-2bc5-446b-b020-d79fded47f2a"
    const id = request.array[0]
    const body = {
      "Prefix": request.array[1],
      "FirstName": request.array[2],
      "LastName": request.array[3],
      "Mobile": request.array[4],
      "Email": request.array[5],
      "Gender": request.array[6],
      // "BirthDate":request.array[6],
      "DisplayPicture": request.array[8],
      "Address": request.array[9],
      "InAppUser" : request.array[10],
      "IsActive": request.array[11]
  }
    const record = delegate.update(id, body);
    const response = new CustomerUpdateResponse();
    console.log("Customer updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<CustomerDeleteModel, CustomerDeleteResponse>,
    callback: sendUnaryData<CustomerDeleteResponse>): Promise<void> {
    try {
    const request : CustomerDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new CustomerDeleteResponse();
    console.log("record====",record)
    console.log("Customer deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<CustomerSearchModel, CustomerSearchResponse>,
    callback: sendUnaryData<CustomerSearchResponse>): Promise<void> {
    try {
    const request : CustomerSearchModel = call.request;
    const email = request.getEmail();
    if (typeof email === 'string') {
      const query = {
        "email": email,
      };
    const searchResults = await delegate.search(query);
    const response = new CustomerSearchResponse();
    console.log("record====",searchResults)
    console.log("Customer retrieved successfully")
    callback(null, response); 
    }  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
}
