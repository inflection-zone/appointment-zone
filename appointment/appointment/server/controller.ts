import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  AppointmentCreateModel,
  AppointmentCreateResponse,
  AppointmentGetByIdModel,
  AppointmentGetByIdResponse,
  AppointmentUpdateModel,
  AppointmentUpdateResponse,
  AppointmentDeleteModel,
  AppointmentDeleteResponse,
  AppointmentSearchModel,
  AppointmentSearchResponse
 } from '../proto/appointment_pb';
import { AppointmentControllerDelegate } from '../../../src/api/appointment/appointment.controller.delegate';

const delegate = new AppointmentControllerDelegate();
export const appointmentService = {

  create: (call: ServerUnaryCall<AppointmentCreateModel, AppointmentCreateResponse>,
    callback: sendUnaryData<AppointmentCreateResponse>) => {
    try {
    const request: AppointmentCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "CustomerId": request.array[1],
        "BusinessUserId": request.array[2],
        "BusinessServiceId": request.array[3],
        "StartTime": request.array[4],
        "EndTime": request.array[5],
        "Type": request.array[6],
        "Note": request.array[7],
        "StatusCode": request.array[8],
        "Fees": request.array[9],
        "Tax": request.array[10],
        "Tip": request.array[11],
        "Discount": request.array[12],
        "Total": request.array[13],
        "IsPaid": request.array[14],
    }
    
    const record = delegate.bookAppointment(body);
    const response = new AppointmentCreateResponse();
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
  
  async getById(call: ServerUnaryCall<AppointmentGetByIdModel, AppointmentGetByIdResponse>,
    callback: sendUnaryData<AppointmentGetByIdResponse>): Promise<void> {
    try {
    const request : AppointmentGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new AppointmentGetByIdResponse();
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

  update :async (call: ServerUnaryCall<AppointmentUpdateModel, AppointmentUpdateResponse>,
    callback: sendUnaryData<AppointmentUpdateResponse>) => {
    try {
    const request: AppointmentUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      BusinessNodeId: request.array[1],
      CustomerId: request.array[2],
      BusinessUserId: request.array[3],
      BusinessServiceId: request.array[4],
      StartTime: request.array[5],
      EndTime: request.array[6],
      Type: request.array[7],
      Note: request.array[8],
      StatusCode: request.array[9],
      Fees: request.array[10],
      Tax: request.array[11],
      Tip: request.array[12],
      Discount: request.array[13],
      Total: request.array[14],
      IsPaid: request.array[15],
  }
    const record = delegate.update(id, body);
    const response = new AppointmentUpdateResponse();
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
  
  async delete(call: ServerUnaryCall<AppointmentDeleteModel, AppointmentDeleteResponse>,
    callback: sendUnaryData<AppointmentDeleteResponse>): Promise<void> {
    try {
    const request : AppointmentDeleteModel = call.request;
    const record = await delegate.cancelAppointment(request.array[0]);
    const response = new AppointmentDeleteResponse();
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

  // async search(call: ServerUnaryCall<AppointmentSearchModel, AppointmentSearchResponse>,
  //   callback: sendUnaryData<AppointmentSearchResponse>): Promise<void> {
  //   try {
  //   const request : AppointmentSearchModel = call.request;
  //   const query = {
  //       "businessNodeId": request.array[0],
  //       "customerId": request.array[1],
  //       "isActive": request.array[2],
  //   }
  //   const searchResults = await delegate.search(query);
  //   const response = new AppointmentSearchResponse();
  //   console.log("record====",searchResults)
  //   console.log("User message retrieved successfully")
  //   callback(null, response); 
    
  // } catch (error) {
  //   console.log(error)
  //   callback({
  //     code: grpc.status.INTERNAL,
  //     details: 'Internal Server Error',
  //   }, null);
  // }
  // },
}
