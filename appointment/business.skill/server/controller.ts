import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  BusinessSkillCreateModel,
  BusinessSkillCreateResponse,
  BusinessSkillGetByIdModel,
  BusinessSkillGetByIdResponse,
  BusinessSkillUpdateModel,
  BusinessSkillUpdateResponse,
  BusinessSkillDeleteModel,
  BusinessSkillDeleteResponse,
  BusinessSkillSearchModel,
  BusinessSkillSearchResponse
 } from '../proto/businessskill_pb';
import { BusinessSkillControllerDelegate } from '../../../src/api/business.skill/business.skill.controller.delegate';

const delegate = new BusinessSkillControllerDelegate();
export const businessSkillService = {

  create: (call: ServerUnaryCall<BusinessSkillCreateModel, BusinessSkillCreateResponse>,
    callback: sendUnaryData<BusinessSkillCreateResponse>) => {
    try {
    const request: BusinessSkillCreateModel = call.request;
    const body = {      
        "BusinessNodeId": request.array[0],
        "Name": request.array[1],
        "Description": request.array[2],
        "DisplayPicture": request.array[3],
        "IsActive": request.array[4],
    }
    
    const record = delegate.create(body);
    const response = new BusinessSkillCreateResponse();
    console.log("Business skill created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<BusinessSkillGetByIdModel, BusinessSkillGetByIdResponse>,
    callback: sendUnaryData<BusinessSkillGetByIdResponse>): Promise<void> {
    try {
    const request : BusinessSkillGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new BusinessSkillGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Business skill retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<BusinessSkillUpdateModel, BusinessSkillUpdateResponse>,
    callback: sendUnaryData<BusinessSkillUpdateResponse>) => {
    try {
    const request: BusinessSkillUpdateModel = call.request;
    const id = request.array[0]
    const body = {
      "BusinessNodeId": request.array[1],
      "Name": request.array[2],
      "Description": request.array[3],
      "DisplayPicture": request.array[4],
      "IsActive": request.array[5],
  }
    const record = delegate.update(id, body);
    const response = new BusinessSkillUpdateResponse();
    console.log("Business skill updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<BusinessSkillDeleteModel, BusinessSkillDeleteResponse>,
    callback: sendUnaryData<BusinessSkillDeleteResponse>): Promise<void> {
    try {
    const request : BusinessSkillDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new BusinessSkillDeleteResponse();
    console.log("record====",record)
    console.log("Business skill deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<BusinessSkillSearchModel, BusinessSkillSearchResponse>,
    callback: sendUnaryData<BusinessSkillSearchResponse>): Promise<void> {
    try {
    const request : BusinessSkillSearchModel = call.request;
    const query = {
      "businessNodeId": request.array[0],
      "name": request.array[1],
      "isActive": request.array[2]
    }
    const searchResults = await delegate.search(query);
    const response = new BusinessSkillSearchResponse();
    console.log("record====",searchResults)
    console.log("Business skill retrieved successfully")
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
