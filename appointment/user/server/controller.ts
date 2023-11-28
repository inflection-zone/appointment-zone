import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  UserCreateModel,
  UserCreateResponse,
  UserGetByIdModel,
  UserGetByIdResponse,
  UserUpdateModel,
  UserUpdateResponse,
  UserDeleteModel,
  UserDeleteResponse,
  UserSearchModel,
  UserSearchResponse
 } from '../proto/user_pb';
import { UserControllerDelegate } from '../../../src/api/user/user.controller.delegate';

const delegate = new UserControllerDelegate();
export const userService = {

  create: (call: ServerUnaryCall<UserCreateModel, UserCreateResponse>,
    callback: sendUnaryData<UserCreateResponse>) => {
    try {
    const request: UserCreateModel = call.request;
    const body = {      
        "UserName": request.array[0],
        "Prefix": request.array[1],
        "FirstName": request.array[2],
        "LastName": request.array[3],
        "CountryCode": request.array[4],
        "Phone": request.array[5],
        "Email": request.array[6],
        "Gender":request.array[7],
        "BirthDate": request.array[8],
        "Password": request.array[9],
    }
    
    const record = delegate.create(body);
    const response = new UserCreateResponse();
    console.log("User created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<UserGetByIdModel, UserGetByIdResponse>,
    callback: sendUnaryData<UserGetByIdResponse>): Promise<void> {
    try {
    const request : UserGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new UserGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("User retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<UserUpdateModel, UserUpdateResponse>,
    callback: sendUnaryData<UserUpdateResponse>) => {
    try {
    const request: UserUpdateModel = call.request;
    // const id = "110c16d6-2bc5-446b-b020-d79fded47f2a"
    const id = request.array[0]
    const body = {
        "UserName": request.array[1],
        "Prefix": request.array[2],
        "FirstName": request.array[3],
        "LastName": request.array[4],
        "CountryCode": request.array[5],
        "Phone": request.array[6],
        "Email": request.array[7],
        "Gender":request.array[8],
        "BirthDate": request.array[9],
        "Password": request.array[10],
  }
    const record = delegate.update(id, body);
    const response = new UserUpdateResponse();
    console.log("User updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<UserDeleteModel, UserDeleteResponse>,
    callback: sendUnaryData<UserDeleteResponse>): Promise<void> {
    try {
    const request : UserDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new UserDeleteResponse();
    console.log("record====",record)
    console.log("User deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<UserSearchModel, UserSearchResponse>,
    callback: sendUnaryData<UserSearchResponse>): Promise<void> {
    try {
    const request : UserSearchModel = call.request;
    const query = {
        "roleId": request.array[0],
        "prefix": request.array[1],
        "firstName": request.array[2],
        "lastName": request.array[3],
        "phone": request.array[4],
        "email": request.array[5],
        "gender": request.array[6],
    }
    const searchResults = await delegate.search(query);
    const response = new UserSearchResponse();
    console.log("record====",searchResults)
    console.log("User retrieved successfully")
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
