import grpc, { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
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
  PaymentTransactionSearchResponse,
  PaymentTransactionSearchResponseItem,
} from "../proto/paymenttransaction_pb";
import { PaymentTransactionControllerDelegate } from "../../../src/api/payment.transaction/payment.transaction.controller.delegate";

const delegate = new PaymentTransactionControllerDelegate();
export const paymentTransactionService = {

    create: async (call: ServerUnaryCall<PaymentTransactionCreateModel,PaymentTransactionCreateResponse>,
    	callback: sendUnaryData<PaymentTransactionCreateResponse>) => {
			try {
				const request: PaymentTransactionCreateModel = call.request;
				const body = {
					BusinessNodeId: request.array[0],
					CustomerId: request.array[1],
					TotalAmount: request.array[2],
					ExternalId: request.array[3],
					Currency: request.array[4],
					Status: request.array[5],
					IsComplete: request.array[6],
					InitiatedOn: request.array[7],
					CompletedOn: request.array[8],
					IsActive: request.array[9],
      			};
				const record = await delegate.create(body);
				const response = new PaymentTransactionCreateResponse();
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setCustomerid(result.CustomerId);
				response.setTotalamount(result.TotalAmount);
				response.setExternalid(result.ExternalId);
				response.setCurrency(result.Currency);
				response.setStatus(result.Status);
				response.setIscomplete(result.IsComplete);
				response.setInitiatedon(result.InitiatedOn);
				response.setCompletedon(result.CompletedOn);
				response.setIsactive(result.IsActive);
				console.log("Payment transaction created successfully");
				callback(null, response);
			} catch (error) {
				console.log(error);
      			callback(
					{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
        			},
					null
					);
				}
	},

    async getById(call: ServerUnaryCall<PaymentTransactionGetByIdModel,PaymentTransactionGetByIdResponse>,
		callback: sendUnaryData<PaymentTransactionGetByIdResponse>): Promise<void> {
			try {
				const request: PaymentTransactionGetByIdModel = call.request;
				const record = await delegate.getById(request.array[0]);
				const response = new PaymentTransactionGetByIdResponse();
				response.id = request.array[0];
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setCustomerid(result.CustomerId);
				response.setTotalamount(result.TotalAmount);
				response.setExternalid(result.ExternalId);
				response.setCurrency(result.Currency);
				response.setStatus(result.Status);
				response.setIscomplete(result.IsComplete);
				response.setInitiatedon(result.InitiatedOn);
				response.setCompletedon(result.CompletedOn);
				response.setIsactive(result.IsActive);
				console.log("record====", record);
				console.log("Payment transaction retrieved successfully");
				callback(null, response);
			} catch (error) {
				console.log(error);
				callback(
					{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
        			},
					null
					);
				}
	},

	async search(call: ServerUnaryCall<PaymentTransactionSearchModel,PaymentTransactionSearchResponse>,
    	callback: sendUnaryData<PaymentTransactionSearchResponse>): Promise<void> {
    		try {
				const request: PaymentTransactionSearchModel = call.request;
				const query = {
				businessNodeId: request.array[0],
				customerId: request.array[1],
				isActive: request.array[2],
				appointmentId: request.array[2],
				};
				const searchResults = await delegate.search(query);
				const response = new PaymentTransactionSearchResponse();
				response.setTotalcount(searchResults.TotalCount);
				response.setRetrievedcount(searchResults.RetrievedCount);
				response.setPageindex(searchResults.PageIndex);
				response.setItemsperpage(searchResults.ItemsPerPage);
				response.setOrder(searchResults.Order);
				const itemsList = searchResults.Items.map((item: PaymentTransactionSearchResponseItem) => {
					const responseItem = new PaymentTransactionSearchResponseItem();
					responseItem.setId(item.id);
					responseItem.setBusinessnodeid(item.BusinessNodeId);
					responseItem.setCustomerid(item.CustomerId);
					responseItem.setTotalamount(item.TotalAmount);
					responseItem.setExternalid(item.ExternalId);
					responseItem.setCurrency(item.Currency);
					responseItem.setStatus(item.Status);
					responseItem.setIscomplete(item.IsComplete);
					responseItem.setIsactive(item.IsActive);
					responseItem.setInitiatedon(item.InitiatedOn);
					responseItem.setCompletedon(item.CompletedOn);
					// responseItem.setCreatedat(item.CreatedAt);
					// responseItem.setUpdatedat(item.UpdatedAt);
					// responseItem.setDeletedat(item.DeletedAt);
					// responseItem.setIsdeleted(item.IsDeleted);
					return responseItem;
				});
				response.setItemsList(itemsList);
				console.log("record====", searchResults);
				console.log("Payment transaction retrived successfully");
				callback(null, response);
			} catch (error) {
				console.log(error);
				callback(
        			{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
        			},
					null
					);
			}
	},

    update: async (call: ServerUnaryCall<PaymentTransactionUpdateModel,PaymentTransactionUpdateResponse>,
    	callback: sendUnaryData<PaymentTransactionUpdateResponse>) => {
			try {
				const request: PaymentTransactionUpdateModel = call.request;
				const id = request.array[0];
				const body = {
					BusinessNodeId: request.array[1],
					CustomerId: request.array[2],
					TotalAmount: request.array[3],
					ExternalId: request.array[4],
					Currency: request.array[5],
					Status: request.array[6],
					IsComplete: request.array[7],
					InitiatedOn: request.array[8],
					CompletedOn: request.array[9],
					IsActive: request.array[10],
				};
				const record = await delegate.update(id, body);
				const response = new PaymentTransactionUpdateResponse();
				const result = record;
				response.setId(result.id);
				response.setBusinessnodeid(result.BusinessNodeId);
				response.setCustomerid(result.CustomerId);
				response.setTotalamount(result.TotalAmount);
				response.setExternalid(result.ExternalId);
				response.setCurrency(result.Currency);
				response.setStatus(result.Status);
				response.setIscomplete(result.IsComplete);
				response.setInitiatedon(result.InitiatedOn);
				response.setCompletedon(result.CompletedOn);
				response.setIsactive(result.IsActive);
				console.log("Payment transaction updated successfully");
				callback(null, response);
			} catch (error) {
				console.log(error);
				callback(
					{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
        			},
					null
					);
				}
    },

    async delete(call: ServerUnaryCall<PaymentTransactionDeleteModel,PaymentTransactionDeleteResponse>,
		callback: sendUnaryData<PaymentTransactionDeleteResponse>): Promise<void> {
			try {
				const request: PaymentTransactionDeleteModel = call.request;
				const record = await delegate.delete(request.array[0]);
				const response = new PaymentTransactionDeleteResponse();
				response.setCount(record.Deleted.count);
				console.log("record====", record.Deleted.count);
				console.log("Payment transaction deleted successfully");
				callback(null, response);
			} catch (error) {
				console.log(error);
				callback(
					{
						code: grpc.status.INTERNAL,
						details: "Internal Server Error",
        			},
					null
					);
			}
	},
};