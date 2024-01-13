import grpc, { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { 
    BusinessNodeHourCreateModel,
    BusinessNodeHourCreateResponse,
    BusinessNodeHourGetByIdModel,
    BusinessNodeHourGetByIdResponse,
    BusinessNodeHourUpdateModel,
    BusinessNodeHourUpdateResponse,
    BusinessNodeHourDeleteModel,
    BusinessNodeHourDeleteResponse,
    BusinessNodeHourSearchModel,
    BusinessNodeHourSearchResponse,
    BusinessNodeHourSearchResponseItem,
    BusinessNodeHourCreateMultipleModel,
    BusinessNodeHourCreateMultipleResponse,
    BusinessNodeHourCreateMultipleResponseItem,
} from '../proto/businessnodehour_pb';
import { BusinessNodeHourControllerDelegate } from '../../../src/api/business.node.hour/business.node.hour.controller.delegate';

const delegate = new BusinessNodeHourControllerDelegate();
export const businessNodeHourService = {

    create: async(call: ServerUnaryCall<BusinessNodeHourCreateModel, BusinessNodeHourCreateResponse>,
        callback: sendUnaryData<BusinessNodeHourCreateResponse>) => {
            try {
                const request: BusinessNodeHourCreateModel = call.request;
                const body = {      
                    "BusinessNodeId": request.array[0],
                    "Type": request.array[1],
                    "Day": request.array[2],
                    "Date": request.array[3],
                    "IsOpen": request.array[4],
                    "IsActive": request.array[5],
                    "Message": request.array[6]
                }
                const record = await delegate.create(body);
                const response = new BusinessNodeHourCreateResponse();
                const result = record;
                response.setId(result.id)
                response.setBusinessnodeid(result.BusinessNodeId)
                response.setType(result.Type)
                response.setDay(result.Day)
                response.setIsopen(result.IsOpen)
                response.setDate(result.Date)
                response.setMessage(result.Message)
                response.setStarttime(result.StartTime)
                response.setEndtime(result.EndTime)
                response.setIsactive(result.IsActive)
                console.log("Business node hour created successfully") 
                callback(null, response);
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
        },

    createMultiple: async (call: ServerUnaryCall<BusinessNodeHourCreateMultipleModel, BusinessNodeHourCreateMultipleResponse>,
        callback: sendUnaryData<BusinessNodeHourCreateMultipleResponse>): Promise<void> => {
        try {
            const request: BusinessNodeHourCreateMultipleModel = call.request;
            const items = request.getItemsList();
            const response = new BusinessNodeHourCreateMultipleResponse();
            const responseItems: BusinessNodeHourCreateMultipleResponseItem[] = [];
    
            for (const item of items) {
                const body = {
                    "BusinessUserId": item.array[0],
                    "Type": item.array[1],
                    "Day": item.array[2],
                    "Date": item.array[3],
                    "IsOpen": item.array[4],
                    "IsActive": item.array[5],
                };
    
                const record = await delegate.create(body);
                const responseItem = new BusinessNodeHourCreateMultipleResponseItem();
                const result = record;
    
                responseItem.setId(result.id);
                responseItem.setBusinessnodeid(result.BusinessNodeId);
                responseItem.setType(result.Type);
                responseItem.setDay(result.Day);
                responseItem.setIsopen(result.IsOpen);
                responseItem.setDate(result.Date);
                responseItem.setMessage(result.Message);
                responseItem.setStarttime(result.StartTime);
                responseItem.setEndtime(result.EndTime);
                responseItem.setIsactive(result.IsActive);
                responseItems.push(responseItem);
            }

            response.setItemsList(responseItems);
            console.log("Business node hours created successfully");
            callback(null, response);
        } catch (error) {
            console.log(error);
            callback({
                code: grpc.status.INTERNAL,
                details: 'Internal Server Error',
            }, null);
        }
    },

    async getById(call: ServerUnaryCall<BusinessNodeHourGetByIdModel, BusinessNodeHourGetByIdResponse>,
        callback: sendUnaryData<BusinessNodeHourGetByIdResponse>): Promise<void> {
            try {
                const request : BusinessNodeHourGetByIdModel = call.request;
                const record = await delegate.getById(request.array[0]);
                const response = new BusinessNodeHourGetByIdResponse();
                response.id = request.array[0];
                const result = record;
                response.setId(result.id)
                response.setBusinessnodeid(result.BusinessNodeId)
                response.setType(result.Type)
                response.setDay(result.Day)
                response.setIsopen(result.IsOpen)
                response.setDate(result.Date)
                response.setMessage(result.Message)
                response.setStarttime(result.StartTime)
                response.setEndtime(result.EndTime)
                response.setIsactive(result.IsActive)
                console.log("record====", record)
                console.log("Business node hour retrieved successfully")
                callback(null, response);
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
        },

    async search(call: ServerUnaryCall<BusinessNodeHourSearchModel, BusinessNodeHourSearchResponse>,
        callback: sendUnaryData<BusinessNodeHourSearchResponse>): Promise<void> {
            try {
                const request : BusinessNodeHourSearchModel = call.request;
                const query = {
                    "businessNodeId": request.array[0],
                    "isActive": request.array[1],
                }
                const searchResults = await delegate.search(query);
                const response = new BusinessNodeHourSearchResponse();
                response.setTotalcount(searchResults.TotalCount);
                response.setRetrievedcount(searchResults.RetrievedCount);
                response.setPageindex(searchResults.PageIndex);
                response.setItemsperpage(searchResults.ItemsPerPage);
                response.setOrder(searchResults.Order);

                const itemsList = searchResults.Items.map((item: BusinessNodeHourSearchResponseItem) => {
                    const responseItem = new BusinessNodeHourSearchResponseItem();
                    responseItem.setId(item.id);
                    responseItem.setType(item.Type);
                    responseItem.setBusinessnodeid(item.BusinessNodeId);
                    responseItem.setDay(item.Day);
                    responseItem.setDate(item.Date);
                    responseItem.setIsopen(item.IsOpen);
                    responseItem.setIsactive(item.IsActive);
                    responseItem.setMessage(item.Message);
                    responseItem.setStarttime(item.StartTime);
                    responseItem.setEndtime(item.EndTime);
                    // responseItem.setCreatedat(item.CreatedAt);
                    // responseItem.setUpdatedat(item.UpdatedAt);
                    // responseItem.setDeletedat(item.DeletedAt);
                    // responseItem.setIsdeleted(item.IsDeleted);
                    return responseItem;
                });
                response.setItemsList(itemsList);
                console.log("record====", searchResults);
                console.log("Business node hour retrieved successfully");
                callback(null, response);     
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
        },        

    update :async (call: ServerUnaryCall<BusinessNodeHourUpdateModel, BusinessNodeHourUpdateResponse>,
        callback: sendUnaryData<BusinessNodeHourUpdateResponse>) => {
            try {
                const request: BusinessNodeHourUpdateModel = call.request;
                const id = request.array[0]
                const body = {
                    "BusinessNodeId": request.array[1],
                    "Type": request.array[2],
                    "Day": request.array[3],
                    "Date": request.array[4],
                    "IsOpen": request.array[5],
                    "IsActive": request.array[6],
                }

                const record =await delegate.update(id, body);
                const response = new BusinessNodeHourUpdateResponse();
                const result = record;

                response.setId(result.id)
                response.setBusinessnodeid(result.BusinessNodeId)
                response.setType(result.Type)
                response.setDay(result.Day)
                response.setIsopen(result.IsOpen)
                response.setDate(result.Date)
                response.setMessage(result.Message)
                response.setStarttime(result.StartTime)
                response.setEndtime(result.EndTime)
                response.setIsactive(result.IsActive)
                console.log("Business node hour updated successfully")
                callback(null, response);
            } catch (error) {
                console.log(error)
                callback({
                    code: grpc.status.INTERNAL,
                    details: 'Internal Server Error',
                }, null);
            }
        },
    
    async delete(call: ServerUnaryCall<BusinessNodeHourDeleteModel, BusinessNodeHourDeleteResponse>,
        callback: sendUnaryData<BusinessNodeHourDeleteResponse>): Promise<void> {
            try {
                const request : BusinessNodeHourDeleteModel = call.request;
                const record = await delegate.delete(request.array[0]);
                const response = new BusinessNodeHourDeleteResponse();
                
                response.setCount(record.Deleted.count);
                console.log("record====", record.Deleted.count);
                console.log("Business node hour deleted successfully")
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
