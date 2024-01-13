import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
    BusinessUserCreateModel,
    BusinessUserCreateResponse,
    BusinessUserGetByIdModel,
    BusinessUserGetByIdResponse,
    BusinessUserUpdateModel,
    BusinessUserUpdateResponse,
    BusinessUserDeleteModel,
    BusinessUserDeleteResponse,
    BusinessUserSearchModel,
    BusinessUserSearchResponse,
    BusinessUserSearchResponseItem
} from '../proto/businessuser_pb';
import { BusinessUserControllerDelegate } from '../../../src/api/business.user/business.user.controller.delegate';

const delegate = new BusinessUserControllerDelegate();
export const businessUserService = {

	create: async (call: ServerUnaryCall<BusinessUserCreateModel, BusinessUserCreateResponse>,
		callback: sendUnaryData<BusinessUserCreateResponse>) => {
			try {
				const request: BusinessUserCreateModel = call.request;
				const body = {      
					"BusinessNodeId": request.array[0],
					"FirstName": request.array[1],
					"LastName": request.array[2],
					"Prefix": request.array[3],
					"Mobile": request.array[4],
					"Email": request.array[5],
					"Dob": request.array[6],
					"Gender":request.array[7],
					"DisplayPicture": request.array[8],
					"AboutMe": request.array[9],
					"Qualification" : request.array[10],
					"Experience": request.array[11],
					"IsAvailableForEmergency": request.array[12],
					"Facebook": request.array[13],
					"Linkedin" : request.array[14],
					"Twitter": request.array[15],
					"Instagram": request.array[16],
					"Yelp": request.array[17],
					"IsActive" : request.array[18],
				}

				const record = await delegate.create(body);
				const response = new BusinessUserCreateResponse();
				const result = record;

				response.setId(result.UserRecords.id)
				response.setBusinessnodeid(result.UserRecords.BusinessNodeId)
				response.setFirstname(result.UserRecords.FirstName)
				response.setLastname(result.UserRecords.LastName)
				response.setMobile(result.UserRecords.Mobile)
				response.setEmail(result.UserRecords.Email)
				response.setPrefix(result.UserRecords.Prefix)
				response.setDob(result.UserRecords.Dob)
				response.setDisplaypicture(result.UserRecords.DisplayPicture)
				response.setGender(result.UserRecords.Gender)
				response.setAboutme(result.UserRecords.AboutMe)
				response.setQualification(result.UserRecords.Qualification)
				response.setExperience(result.UserRecords.Experience)
				response.setIsavailableforemergency(result.UserRecords.IsAvailableForEmergency)
				response.setFacebook(result.UserRecords.Facebook)
				response.setInstagram(result.UserRecords.Instagram)
				response.setTwitter(result.UserRecords.Twitter)
				response.setLinkedin(result.UserRecords.Linkedin)
				response.setYelp(result.UserRecords.Yelp)
				response.setIsactive(result.UserRecords.IsActive)
				console.log("Business user created successfully") 
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
	},

	async getById(call: ServerUnaryCall<BusinessUserGetByIdModel, BusinessUserGetByIdResponse>,
		callback: sendUnaryData<BusinessUserGetByIdResponse>): Promise<void> {
			try {
				const request : BusinessUserGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new BusinessUserGetByIdResponse();
				response.id = request.array[0];
				const result = record;

				response.setId(result.id)
				response.setBusinessnodeid(result.BusinessNodeId)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setPrefix(result.Prefix)
				response.setDob(result.Dob)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setGender(result.Gender)
				response.setAboutme(result.AboutMe)
				response.setQualification(result.Qualification)
				response.setExperience(result.Experience)
				response.setIsavailableforemergency(result.IsAvailableForEmergency)
				response.setDisplaypicture(result.DisplayPicture)
				response.setFacebook(result.Facebook)
				response.setInstagram(result.Instagram)
				response.setTwitter(result.Twitter)
				response.setLinkedin(result.Linkedin)
				response.setYelp(result.Yelp)
				response.setIsactive(result.IsActive)
				console.log("record====",record)
				console.log("Business user retrieved successfully")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
	},

	async search(call: ServerUnaryCall<BusinessUserSearchModel, BusinessUserSearchResponse>,
		callback: sendUnaryData<BusinessUserSearchResponse>): Promise<void> {
			try {
				const request : BusinessUserSearchModel = call.request;
				const query = {
					"businessNodeId": request.array[0],
					"businessId": request.array[1],
					"businessServiceId": request.array[2],
					"name": request.array[3]
				}

				const searchResults = await delegate.search(query);
				const response = new BusinessUserSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);

                const itemsList = searchResults.Items.map((item: BusinessUserSearchResponseItem) => {
                const responseItem = new BusinessUserSearchResponseItem();
                responseItem.setId(item.id);
                responseItem.setBusinessnodeid(item.BusinessNodeId);
                responseItem.setFirstname(item.FirstName)
                responseItem.setLastname(item.LastName)
                responseItem.setPrefix(item.Prefix)
                responseItem.setDob(item.Dob)
                responseItem.setMobile(item.Mobile)
                responseItem.setEmail(item.Email)
                responseItem.setGender(item.Gender)
                responseItem.setAboutme(item.AboutMe)
                responseItem.setQualification(item.Qualification)
                responseItem.setExperience(item.Experience)
                responseItem.setIsavailableforemergency(item.IsAvailableForEmergency)
                responseItem.setDisplaypicture(item.DisplayPicture)
                responseItem.setFacebook(item.Facebook)
                responseItem.setInstagram(item.Instagram)
                responseItem.setTwitter(item.Twitter)
                responseItem.setLinkedin(item.Linkedin)
                responseItem.setYelp(item.Yelp)
                responseItem.setIsactive(item.IsActive);
                return responseItem;
              });

              response.setItemsList(itemsList);
              console.log("record====",searchResults)
              console.log("Business user retrieved successfully")
              callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
	},

	update :async (call: ServerUnaryCall<BusinessUserUpdateModel, BusinessUserUpdateResponse>,
		callback: sendUnaryData<BusinessUserUpdateResponse>) => {
			try {
				const request: BusinessUserUpdateModel = call.request;
				const id = request.array[0]
				const body = {
					"BusinessNodeId": request.array[1],
					"FirstName": request.array[2],
					"LastName": request.array[3],
					"Prefix": request.array[4],
					"Mobile": request.array[5],
					"Email": request.array[6],
					"Gender":request.array[7],
					"DisplayPicture": request.array[8],
					"AboutMe": request.array[9],
					"Qualification" : request.array[10],
					"Experience": request.array[11],
					"IsAvailableForEmergency": request.array[12],
					"Facebook": request.array[13],
					"Linkedin" : request.array[14],
					"Twitter": request.array[15],
					"Instagram": request.array[16],
					"Yelp": request.array[17],
					"IsActive" : request.array[18],
				}
				const record = await delegate.update(id, body);
				const response = new BusinessUserUpdateResponse();
				const result = record;
				response.setId(result.id)
				response.setBusinessnodeid(result.BusinessNodeId)
				response.setFirstname(result.FirstName)
				response.setLastname(result.LastName)
				response.setPrefix(result.Prefix)
				response.setDob(result.Dob)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setGender(result.Gender)
				response.setAboutme(result.AboutMe)
				response.setQualification(result.Qualification)
				response.setExperience(result.Experience)
				response.setIsavailableforemergency(result.IsAvailableForEmergency)
				response.setDisplaypicture(result.DisplayPicture)
				response.setFacebook(result.Facebook)
				response.setInstagram(result.Instagram)
				response.setTwitter(result.Twitter)
				response.setLinkedin(result.Linkedin)
				response.setYelp(result.Yelp)
				response.setIsactive(result.IsActive)
				console.log("Business user updated successfully")
				callback(null, response);
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
		},
		
	async delete(call: ServerUnaryCall<BusinessUserDeleteModel, BusinessUserDeleteResponse>,
		callback: sendUnaryData<BusinessUserDeleteResponse>): Promise<void> {
			try {
				const request : BusinessUserDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new BusinessUserDeleteResponse();

				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Business user deleted successfully")
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
