  import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
  import { 
    BusinessCreateModel,
    BusinessCreateResponse,
    BusinessGetByIdModel,
    BusinessGetByIdResponse,
    BusinessUpdateModel,
    BusinessUpdateResponse,
    BusinessDeleteModel,
    BusinessDeleteResponse,
    BusinessSearchModel,
    BusinessSearchResponse,
    BusinessSearchResponseItem,
  } from '../proto/business_pb';
  import { BusinessControllerDelegate } from '../../../src/api/business/business.controller.delegate';
  
  const delegate = new BusinessControllerDelegate();
  export const businessService = {

    create: async (call: ServerUnaryCall<BusinessCreateModel, BusinessCreateResponse>,
		callback: sendUnaryData<BusinessCreateResponse>) => {
			try {
				const request: BusinessCreateModel = call.request;
				const body = {      
					"ExternalId": request.array[0],
					"Name": request.array[1],
					"Mobile": request.array[2],
					"Email": request.array[3],
					"AboutUs": request.array[4],
					"ApiKey": request.array[5],
					"Logo": request.array[6],
					"DisplayPicture":request.array[7],
					"Address": request.array[8],
					"Facebook": request.array[9],
					"Twitter" : request.array[10],
					"Linkedin": request.array[11],
					"Instagram": request.array[12],
					"Yelp": request.array[13],
					"IsActive" : request.array[14],
				}

				const record = await delegate.create(body);
				const response = new BusinessCreateResponse();
				const result = record;

				response.setId(result.BusinessRecords.id)
				response.setExternalid(result.BusinessRecords.ExternalId)
				response.setName(result.BusinessRecords.Name)
				response.setMobile(result.BusinessRecords.Mobile)
				response.setEmail(result.BusinessRecords.Email)
				response.setAboutus(result.BusinessRecords.AboutUs)
				response.setApikey(result.BusinessRecords.ApiKey)
				response.setLogo(result.BusinessRecords.Logo)
				response.setDisplaypicture(result.BusinessRecords.DisplayPicture)
				response.setFacebook(result.BusinessRecords.Facebook)
				response.setInstagram(result.BusinessRecords.Instagram)
				response.setTwitter(result.BusinessRecords.Twitter)
				response.setLinkedin(result.BusinessRecords.Linkedin)
				response.setYelp(result.BusinessRecords.Yelp)
				response.setAddress(result.BusinessRecords.Address)
				response.setIsactive(result.BusinessRecords.IsActive)
				console.log("Business created successfully", record);
				callback(null, response);  
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
	},
    
    async getById(call: ServerUnaryCall<BusinessGetByIdModel, BusinessGetByIdResponse>,
		callback: sendUnaryData<BusinessGetByIdResponse>): Promise<void> {
			try {
				const request : BusinessGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new BusinessGetByIdResponse();
				response.id = request.array[0];
				const result = record;

				response.setId(result.id)
				response.setExternalid(result.ExternalId)
				response.setName(result.Name)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setAboutus(result.AboutUs)
				response.setApikey(result.ApiKey)
				response.setLogo(result.Logo)
				response.setDisplaypicture(result.DisplayPicture)
				response.setFacebook(result.Facebook)
				response.setInstagram(result.Instagram)
				response.setTwitter(result.Twitter)
				response.setLinkedin(result.Linkedin)
				response.setYelp(result.Yelp)
				response.setAddress(result.Address)
				response.setIsactive(result.IsActive)
				console.log("record====",record)
				console.log("Business retrieved successfully")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
			}, null);
		}
    },

	async search(call: ServerUnaryCall<BusinessSearchModel, BusinessSearchResponse>,
		callback: sendUnaryData<BusinessSearchResponse>): Promise<void> {
			try {
				const request : BusinessSearchModel = call.request;
				const query = {
					"isActive": request.array[0]
				}

				const searchResults = await delegate.search(query);
				const response = new BusinessSearchResponse();
		
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);
				response.setPageindex(searchResults.PageIndex);
				response.setItemsperpage(searchResults.ItemsPerPage);
				response.setOrder(searchResults.Order);

				const itemsList = searchResults.Items.map((item: BusinessSearchResponseItem) => {
					const responseItem = new BusinessSearchResponseItem();
					responseItem.setId(item.id);
					responseItem.setExternalid(item.ExternalId);
					responseItem.setName(item.Name);
					responseItem.setMobile(item.Mobile);
					responseItem.setEmail(item.Email);
					responseItem.setAboutus(item.AboutUs);
					responseItem.setApikey(item.ApiKey);
					responseItem.setLogo(item.Logo);
					responseItem.setDisplaypicture(item.DisplayPicture);
					responseItem.setAddress(item.Address);
					responseItem.setFacebook(item.Facebook);
					responseItem.setTwitter(item.Twitter);
					responseItem.setLinkedin(item.Linkedin);
					responseItem.setInstagram(item.Instagram);
					responseItem.setYelp(item.Yelp);
					responseItem.setIsactive(item.IsActive);
					// responseItem.setCreatedat(item.CreatedAt);
					// responseItem.setUpdatedat(item.UpdatedAt);
					// responseItem.setDeletedat(item.DeletedAt);
					return responseItem;
				});
				
				response.setItemsList(itemsList);
					console.log("record====",searchResults)
					console.log("Business retrieved successfully.")
					callback(null, response); 
				} catch (error) {
					console.log(error)
					callback({
						code: grpc.status.INTERNAL,
						details: 'Internal Server Error',
					}, null);
				}
			},

    update :async (call: ServerUnaryCall<BusinessUpdateModel, BusinessUpdateResponse>,
		callback: sendUnaryData<BusinessUpdateResponse>) => {
			try {
				const request: BusinessUpdateModel = call.request;
				const id = request.array[0]
				const body = {
					"ExternalId": request.array[1],
					"Name": request.array[2],
					"Mobile": request.array[3],
					"Email": request.array[4],
					"AboutUs": request.array[5],
					"Logo": request.array[6],
					"DisplayPicture":request.array[7],
					"Address": request.array[8],
					"Facebook": request.array[9],
					"Twitter" : request.array[10],
					"Linkedin": request.array[11],
					"Instagram": request.array[12],
					"Yelp": request.array[13],
					"IsActive" : request.array[14],
				}

				const record = await delegate.update(id, body);
				const response = new BusinessUpdateResponse();
				const result = record;

				response.setId(result.id)
				response.setExternalid(result.ExternalId)
				response.setName(result.Name)
				response.setMobile(result.Mobile)
				response.setEmail(result.Email)
				response.setAboutus(result.AboutUs)
				response.setApikey(result.ApiKey)
				response.setLogo(result.Logo)
				response.setDisplaypicture(result.DisplayPicture)
				response.setFacebook(result.Facebook)
				response.setInstagram(result.Instagram)
				response.setTwitter(result.Twitter)
				response.setLinkedin(result.Linkedin)
				response.setYelp(result.Yelp)
				response.setAddress(result.Address)
				response.setIsactive(result.IsActive)
				console.log("Business updated successfully")
				callback(null, response);
			} catch (error) {
				console.log(error)
				callback({
					code: grpc.status.INTERNAL,
					details: 'Internal Server Error',
				}, null);
			}
		},
    
    async delete(call: ServerUnaryCall<BusinessDeleteModel, BusinessDeleteResponse>,
		callback: sendUnaryData<BusinessDeleteResponse>): Promise<void> {
			try {
				const request : BusinessDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new BusinessDeleteResponse();

				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Business deleted successfully");
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