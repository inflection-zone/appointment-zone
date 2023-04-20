import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class PaymentTransactionService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:PaymentTransactionService=null;
    public static getInstance():PaymentTransactionService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record=await this.prisma.payment_transactions.create({data:createModel});
            console.log(record);
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create payment transactions!',error)
        }
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.payment_transactions.findUnique({where : {id : id}
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve payment transactions!', error);
        }
    };

    search = async (filters) => {
        try {
            const search : Prisma.payment_transactionsFindManyArgs = {};

                search.where = {
                    IsActive : true,
                }
                if (filters.businessNodeId != null) {
                    search.where =   {
                        BusinessNodeId : filters.BusinessNodeId,
                        }
                }
                if (filters.customerId != null) {
                    search.where =   {
                            CustomerId : filters.CustomerId,
                        }
                }
                search.orderBy = {
                    CreatedAt : 'asc'
                }
                if (filters.Order === 'descending') {
                    search.orderBy = {
                        CreatedAt : 'desc'
                    }
                }
                search.take = 25;
                if (filters.ItemsPerPage) {
                    search.take = Number(filters.ItemsPerPage);
                }
                search.skip = 0;
                let pageIndex = 0;
                if (filters.PageIndex) {
                pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
                search.skip = pageIndex * search.take;
                }
                const foundResults = await this.prisma.payment_transactions.findMany(search)
                const searchResults = {
                    TotalCount     : foundResults.length,
                    RetrievedCount : foundResults.length,
                    PageIndex      : pageIndex,
                    ItemsPerPage   : search.take,
                    Order          : search.orderBy["CreatedAt"] === 'desc' ? 'descending' : 'ascending',
                    Items          : foundResults,
                };
                return searchResults; 
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search payment transactions records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
            var res = await this.prisma.payment_transactions.updateMany({data:updateModel,
                    where :{
                    id : id
                }
            }); 
        }
        return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update payment transactions!', error);
        }
    };

    delete = async (id) => {
        try {
        const result = await this.prisma.payment_transactions.delete({ where: 
            { id: id } 
        });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete payment transactions!', error);
        }
    };
}
