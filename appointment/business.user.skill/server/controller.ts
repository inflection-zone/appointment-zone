import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
  BusinessUserSkillCreateModel,
  BusinessUserSkillCreateResponse,
  BusinessUserSkillGetByIdModel,
  BusinessUserSkillGetByIdResponse,
  BusinessUserSkillUpdateModel,
  BusinessUserSkillUpdateResponse,
  BusinessUserSkillDeleteModel,
  BusinessUserSkillDeleteResponse,
  BusinessUserSkillSearchModel,
  BusinessUserSkillSearchResponse
 } from '../proto/businessuserskill_pb';
import { BusinessUserSkillControllerDelegate } from '../../../src/api/business.user.skill/business.user.skill.controller.delegate';

const delegate = new BusinessUserSkillControllerDelegate();
export const businessUserSkillService = {

  create: (call: ServerUnaryCall<BusinessUserSkillCreateModel, BusinessUserSkillCreateResponse>,
    callback: sendUnaryData<BusinessUserSkillCreateResponse>) => {
    try {
    const request: BusinessUserSkillCreateModel = call.request;
    const body = {      
        "BusinessSkillId": request.array[0],
        "BusinessUserId": request.array[1],
        "IsActive": request.array[2],
    }
    
    const record = delegate.create(body);
    const response = new BusinessUserSkillCreateResponse();
    console.log("Business user skill created successfully") 
    callback(null, response);  
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async getById(call: ServerUnaryCall<BusinessUserSkillGetByIdModel, BusinessUserSkillGetByIdResponse>,
    callback: sendUnaryData<BusinessUserSkillGetByIdResponse>): Promise<void> {
    try {
    const request : BusinessUserSkillGetByIdModel = call.request;
    const record = await delegate.getById(request.array[0]);
    const response = new BusinessUserSkillGetByIdResponse();
    response.id = request.array[0];
    console.log("record====",record)
    console.log("Business user skill retrieved successfully")
    callback(null, response);
    
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  update :async (call: ServerUnaryCall<BusinessUserSkillUpdateModel, BusinessUserSkillUpdateResponse>,
    callback: sendUnaryData<BusinessUserSkillUpdateResponse>) => {
    try {
    const request: BusinessUserSkillUpdateModel = call.request;
    const id = request.array[0]
    const body = {
        "BusinessSkillId": request.array[1],
        "BusinessUserId": request.array[2],
        "IsActive": request.array[3],
  }
    const record = delegate.update(id, body);
    const response = new BusinessUserSkillUpdateResponse();
    console.log("Business user skill updated successfully")
    callback(null, response);
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },
  
  async delete(call: ServerUnaryCall<BusinessUserSkillDeleteModel, BusinessUserSkillDeleteResponse>,
    callback: sendUnaryData<BusinessUserSkillDeleteResponse>): Promise<void> {
    try {
    const request : BusinessUserSkillDeleteModel = call.request;
    const record = await delegate.delete(request.array[0]);
    const response = new BusinessUserSkillDeleteResponse();
    console.log("record====",record)
    console.log("Business user skill deleted successfully")
    callback(null, response); 
  } catch (error) {
    console.log(error)
    callback({
      code: grpc.status.INTERNAL,
      details: 'Internal Server Error',
    }, null);
  }
  },

  async search(call: ServerUnaryCall<BusinessUserSkillSearchModel, BusinessUserSkillSearchResponse>,
    callback: sendUnaryData<BusinessUserSkillSearchResponse>): Promise<void> {
    try {
    const request : BusinessUserSkillSearchModel = call.request;
    const query = {
        "businessSkillId": request.array[0],
        "businessUserId": request.array[1],
        "isActive": request.array[2],
    }
    const searchResults = await delegate.search(query);
    const response = new BusinessUserSkillSearchResponse();
    console.log("record====",searchResults)
    console.log("Business user skill retrieved successfully")
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
