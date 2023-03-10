import { BusinessNodeHourSearchResults, BusinessNodeHourSearchFilters } from "../../domain.types/business.node.hour/business.node.hour.domain.types";
//import instance from "tsyringe/dist/typings/dependency-container";
import { Logger } from '../../common/logger';
import { Helper } from "../../common/helper";
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';

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
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business user!',error)
    } 

    }

    getById = async (id) => {
        try {
            var record = await this.prisma.business_node_hours.findUnique({where : {id : id}
            });

            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business user!', error);
    }

}

search = async (filters) => {
    try {
        const search : Prisma.business_node_hoursFindManyArgs = {};
        if (filters.BusinessNodeId != null) {
            search.where = {
                BusinessNodeId : filters.BusinessNodeId
            }
        }
        // if (filters.LastName != null) {
        //     search.where = {
        //         LastName : filters.LastName
        //     }
        // }
        // if (filters.Mobile != null) {
        //     search.where =   {
        //         Mobile : filters.Mobile
        //         }
        // }
        // if (filters.Email != null) {
        //     search.where =   {
        //         Email : filters.Email
        //         }
        // }
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
        ErrorHandler.throwDbAccessError('DB Error: Unable to search user records!', error);
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
        ErrorHandler.throwDbAccessError('DB Error: Unable to update Business user!', error);
    }
}

delete = async (id) => {
    try {
        const result = await this.prisma.business_node_hours.delete({ where: 
            { id: id } 
        });
        //return result ===1;
    } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to delete Business user!', error);

    }
};

// getBusinessNodeWithName = async (Name) => {
//     try {
//         const record = await this.prisma.business_nodes.findUnique({ 
//             where:
//             { 
//                 Name : Name, 
//             }
//         });
//         return record;
//     } catch (error) {
//         ErrorHandler.throwDbAccessError('Unable to check if business node exists with name!', error);
//     }
// };

// getBusinessUserWithEmail = async (email) => {
//     try {
//         const record = await this.prisma.business_node_hours.findUnique({ where : {Email : email}
//         });
//         return record;
//     } catch (error) {

//         ErrorHandler.throwDbAccessError('Unable to check if business user exists with email!', error);
//     }
// }

// getBusinessUserWithMobile = async (mobile) => {
//     try {
//         const record = await this.prisma.business_node_hours.findUnique({ where : { Mobile: mobile }
//         });
//         return record;
//     } catch (error) {
//         ErrorHandler.throwDbAccessError('Unable to check if business user exists with mobile!', error);
//     }
// }








}
