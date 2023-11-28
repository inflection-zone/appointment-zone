import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  UserMessageCreateModel,
  UserMessageCreateResponse,
  UserMessageGetByIdModel,
  UserMessageGetByIdResponse,
  UserMessageUpdateModel,
  UserMessageUpdateResponse,
  UserMessageDeleteModel,
  UserMessageDeleteResponse,
  UserMessageSearchModel,
  UserMessageSearchResponse
 } from '../proto/usermessage_pb';
import { UserMessageControllerDelegate } from '../../../src/api/user.message/user.message.controller.delegate';


const delegate = new UserMessageControllerDelegate();
export const userMessageService = {

  create: (call: ServerUnaryCall<UserMessageCreateModel, UserMessageCreateResponse>,
    callback: sendUnaryData<UserMessageCreateResponse>) => {
    try {
    const request: UserMessageCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "CustomerId": request.array[1],
        "Body": request.array[2],
        "Type": request.array[3],
        "TypeId": request.array[4],
        "MessageId": request.array[5],
        "IsSent": request.array[6],
        "IsActive": request.array[7],
    }
    
    const record = delegate.create(body);
    const response = new UserMessageCreateResponse();
    console.log("User message created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<UserMessageGetByIdModel, UserMessageGetByIdResponse>,
    callback: sendUnaryData<UserMessageGetByIdResponse>): Promise<void> {
    try {
    const request : UserMessageGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new UserMessageGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("User message retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<UserMessageUpdateModel, UserMessageUpdateResponse>,
    callback: sendUnaryData<UserMessageUpdateResponse>) => {
    try {
    const request: UserMessageUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      "BusinessNodeId": request.array[1],
        "CustomerId": request.array[2],
        "Body": request.array[3],
        "Type": request.array[4],
        "TypeId": request.array[5],
        "MessageId": request.array[6],
        "IsSent": request.array[7],
        "IsActive": request.array[8],
  }
    const record = delegate.update(id, body);
    const response = new UserMessageUpdateResponse();
    console.log("User message updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<UserMessageDeleteModel, UserMessageDeleteResponse>,
    callback: sendUnaryData<UserMessageDeleteResponse>): Promise<void> {
    try {
    const request : UserMessageDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new UserMessageDeleteResponse();
    console.log("record====",record)
    console.log("User message deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<UserMessageSearchModel, UserMessageSearchResponse>,
    callback: sendUnaryData<UserMessageSearchResponse>): Promise<void> {
    try {
    const request : UserMessageSearchModel = call.request;
    const query = {
        "businessNodeId": request.array[0],
        "customerId": request.array[1],
        "isActive": request.array[2],
    }
    const searchResults = await delegate.search(query);
    const response = new UserMessageSearchResponse();
    console.log("record====",searchResults)
    console.log("User message retrieved successfully")
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
