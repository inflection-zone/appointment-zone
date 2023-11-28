import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  PaymentTransactionCreateModel,
  PaymentTransactionCreateResponse,
  PaymentTransactionGetByIdModel,
  PaymentTransactionGetByIdResponse,
  PaymentTransactionUpdateModel,
  PaymentTransactionUpdateResponse,
  PaymentTransactionDeleteModel,
  PaymentTransactionDeleteResponse,
  PaymentTransactionSearchModel,
  PaymentTransactionSearchResponse
 } from '../proto/paymenttransaction_pb';
import { PaymentTransactionControllerDelegate } from '../../../src/api/payment.transaction/payment.transaction.controller.delegate';


const delegate = new PaymentTransactionControllerDelegate();
export const paymentTransactionService = {

  create: (call: ServerUnaryCall<PaymentTransactionCreateModel, PaymentTransactionCreateResponse>,
    callback: sendUnaryData<PaymentTransactionCreateResponse>) => {
    try {
    const request: PaymentTransactionCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "CustomerId": request.array[1],
        "TotalAmount": request.array[2],
        "ExternalId": request.array[3],
        "Currency": request.array[4],
        "Status": request.array[5],
        "IsComplete": request.array[6],
        "InitiatedOn": request.array[7],
        "CompletedOn": request.array[8],
        "IsActive": request.array[9],
    }
    
    const record = delegate.create(body);
    const response = new PaymentTransactionCreateResponse();
    console.log("Payment transaction created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<PaymentTransactionGetByIdModel, PaymentTransactionGetByIdResponse>,
    callback: sendUnaryData<PaymentTransactionGetByIdResponse>): Promise<void> {
    try {
    const request : PaymentTransactionGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new PaymentTransactionGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Payment transaction retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<PaymentTransactionUpdateModel, PaymentTransactionUpdateResponse>,
    callback: sendUnaryData<PaymentTransactionUpdateResponse>) => {
    try {
    const request: PaymentTransactionUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      "BusinessNodeId": request.array[1],
      "CustomerId": request.array[2],
      "TotalAmount": request.array[3],
      "ExternalId": request.array[4],
      "Currency": request.array[5],
      "Status": request.array[6],
      "IsComplete": request.array[7],
      "InitiatedOn": request.array[8],
      "CompletedOn": request.array[9],
      "IsActive": request.array[10],
  }
    const record = delegate.update(id, body);
    const response = new PaymentTransactionUpdateResponse();
    console.log("Payment transaction updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<PaymentTransactionDeleteModel, PaymentTransactionDeleteResponse>,
    callback: sendUnaryData<PaymentTransactionDeleteResponse>): Promise<void> {
    try {
    const request : PaymentTransactionDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new PaymentTransactionDeleteResponse();
    console.log("record====",record)
    console.log("Payment transaction deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<PaymentTransactionSearchModel, PaymentTransactionSearchResponse>,
    callback: sendUnaryData<PaymentTransactionSearchResponse>): Promise<void> {
    try {
    const request : PaymentTransactionSearchModel = call.request;
    const query = {
        "businessNodeId": request.array[0],
        "customerId": request.array[1],
        "appointmentId": request.array[2],
        "isActive": request.array[3],
    }
    const searchResults = await delegate.search(query);
    const response = new PaymentTransactionSearchResponse();
    console.log("record====",searchResults)
    console.log("Payment transaction retrieved successfully")
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
