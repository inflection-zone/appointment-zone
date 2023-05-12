import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
import { BusinessNodeHourCreateModel } from "../../domain.types/business.node.hour/business.node.hour.domain.types";
import { resourceLimits } from "worker_threads";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessNodeHourService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessNodeHourService=null;

    public static getInstance():BusinessNodeHourService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try{
            var record=await this.prisma.business_node_hours.create({data:createModel});
            console.log(record);
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business node hour!',error);
        } 
    };

    // createMany = async (createModels) => {
    //     try{
    //         var records = await this.prisma.business_node_hours.createMany({data:createModels});
    //         return records;
    //         }catch (error) {
    //             ErrorHandler.throwDbAccessError('DB Error: Unable to create business node hour!', error)
    //     } 
    // };

    // getBusinessNodeHours = async (businessNodeId, day) => {
    //     try{
    //         // const search : Prisma.business_node_hoursFindManyArgs = {};         
    //         //     search.where = { 
    //         //         BusinessNodeId : businessNodeId,
    //         //         Day : day,
    //         //      //   IsActive : true
    //         //      }
    //             const result = await this.prisma.business_node_hours.findMany({where : {BusinessNodeId : businessNodeId, Day : day, IsActive : true },
    //         });
    //             if(result.length > 0)
    //             {
    //               return result[0];
    //             }
    //     }catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to create business node hour!', error)
    //     } 
    // };

    getById = async (id) => {
        try {
            var record = await this.prisma.business_node_hours.findUnique({where : {id : id}
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business node hour!', error);
        }
    };

    exists = async (requestBody) => {
        try {
            const search : Prisma.business_node_hoursFindManyArgs = {};
            var businessNodeId = requestBody.BusinessNodeId;
            var type = requestBody.Type;
            var day = requestBody.Day;
            var date = requestBody.Date;

            search.where = {
                BusinessNodeId : businessNodeId,
                Type : type,
                Day : day,
                Date : date,
                IsActive : true
            }
            const result = await this.prisma.business_node_hours.findMany(search);
            if(result.length > 0) {
                return result[0];
            }
            return null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business node hours!', error);
        }
    };

    search = async (filters) => {
    try {
        const search : Prisma.business_node_hoursFindManyArgs = {};

        search.where = {
            IsActive : true,
        }
        if (filters.businessNodeId != null) {
            search.where = {
                BusinessNodeId : filters.businessNodeId
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
        const foundResults = await this.prisma.business_node_hours.findMany(search)
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
        ErrorHandler.throwDbAccessError('DB Error: Unable to search business node hour records!', error);
    }
}

update = async (id, updateModel) => {
    try {
        if (Object.keys(updateModel).length > 0) {
            var res = await this.prisma.business_node_hours.updateMany({data:updateModel,
                    where :{
                    id : id
                }
             });        
        }
        return await this.getById(id);
    } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to update business node hour!', error);
    }
};

delete = async (id) => {
    try {
        const result = await this.prisma.business_node_hours.delete({ where: 
            { id: id } 
        });
    } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to delete business node hour!', error);

    }
};


}
