// import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
// import { BusinessUpdateRequest, BusinessIdResponse, BusinessId, DeleteResponse, DeleteRequest, BusinessSearchRequest, BusinessRequest, BusinessResponse } from '../../proto/customer_pb';
// import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
// import { BusinessControllerDelegate } from '../../../src/api/business/business.controller.delegate';
// import { request, response } from 'express';
// import { ResponseHandler } from '../../../src/common/response.handler';

// const delegate = new BusinessControllerDelegate();
// export const businessService = {

//   create: (call: ServerUnaryCall<BusinessRequest, BusinessResponse>,
//     callback: sendUnaryData<BusinessResponse>) => {
//     try {
//     const request: BusinessRequest = call.request;
//     const body = {      
//         "ExternalId": request.array[0],
//         "Name": request.array[1],
//         "Mobile": request.array[2],
//         "Email": request.array[3],
//         "AboutUs": request.array[4],
//         "Logo": request.array[5],
//         "DisplayPicture":request.array[6],
//         "Address": request.array[7],
//         "Facebook": request.array[8],
//         "Twitter" : request.array[9],
//         "Linkedin": request.array[10],
//         "Instagram": request.array[11],
//         "Yelp": request.array[12],
//         "IsActive" : request.array[13],
//     }
    
//     const record = delegate.create(body);
//     const response = new BusinessResponse();
//     console.log("Business created successfully") 
//     callback(null, response);  
//   } catch (error) {
//     console.log(error)
//     callback({
//       code: grpc.status.INTERNAL,
//       details: 'Internal Server Error',
//     }, null);
//   }
//   },
  
//   async getById(call: ServerUnaryCall<BusinessRequest, BusinessResponse>,
//     callback: sendUnaryData<BusinessResponse>): Promise<void> {
//     try {
//     const request : BusinessId = call.request;
//     const record = await delegate.getById(request.array[0]);
//     const response = new BusinessIdResponse();
//     response.id = request.array[0];
//     console.log("record====",record)
//     console.log("Business retrieved successfully")
//     callback(null, response);
    
//   } catch (error) {
//     console.log(error)
//     callback({
//       code: grpc.status.INTERNAL,
//       details: 'Internal Server Error',
//     }, null);
//   }
//   },

//   update :async (call: ServerUnaryCall<BusinessRequest, BusinessResponse>,
//     callback: sendUnaryData<BusinessResponse>) => {
//     try {
//     const request: BusinessRequest = call.request;
//     const id = "110c16d6-2bc5-446b-b020-d79fded47f2a"
//     const body = {
//       "Prefix": request.array[0],
//       "FirstName": request.array[1],
//       "LastName": request.array[2],
//       "Mobile": request.array[3],
//       "Email": request.array[4],
//       "Gender": request.array[5],
//       // "BirthDate":request.array[6],
//       "DisplayPicture": request.array[7],
//       "Address": request.array[8],
//       "InAppUser" : request.array[9],
//       "IsActive": request.array[10]
//   }
//     const record = delegate.update(id, body);
//     const response = new BusinessResponse();
//     console.log("Business updated successfully")
//     callback(null, response);
//   } catch (error) {
//     console.log(error)
//     callback({
//       code: grpc.status.INTERNAL,
//       details: 'Internal Server Error',
//     }, null);
//   }
//   },
  
//   async delete(call: ServerUnaryCall<BusinessRequest, BusinessResponse>,
//     callback: sendUnaryData<BusinessResponse>): Promise<void> {
//     try {
//     const request : DeleteRequest = call.request;
//     const record = await delegate.delete(request.array[0]);
//     const response = new DeleteResponse();
//     console.log("record====",record)
//     console.log("Business deleted successfully")
//     callback(null, response); 
//   } catch (error) {
//     console.log(error)
//     callback({
//       code: grpc.status.INTERNAL,
//       details: 'Internal Server Error',
//     }, null);
//   }
//   },

//   async search(call: ServerUnaryCall<BusinessRequest, BusinessResponse>,
//     callback: sendUnaryData<BusinessResponse>): Promise<void> {
//     try {
//     const request : BusinessSearchRequest = call.request;
//     const email = request.getEmail();
//     if (typeof email === 'string') {
//       const query = {
//         "email": email,
//       };
//     const searchResults = await delegate.search(query);
//     const response = new BusinessResponse();
//     console.log("record====",searchResults)
//     console.log("Business retrieved successfully")
//     callback(null, response); 
//     }  
//   } catch (error) {
//     console.log(error)
//     callback({
//       code: grpc.status.INTERNAL,
//       details: 'Internal Server Error',
//     }, null);
//   }
//   },
// }
