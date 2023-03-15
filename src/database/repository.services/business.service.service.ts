import { BusinessSearchResults, BusinessSearchFilters } from "../../domain.types/business/business.domain.types";
import { Logger } from '../../common/logger';
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
import { request } from "http";

export class BusinessServiceService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessServiceService=null;

    public static getInstance():BusinessServiceService{
        return this.instance || (this.instance=new this());

    }

    create = async (createModel) => {
        try{
            var record = await this.prisma.business_services.create({data:createModel});
            console.log(record);
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business service!',error)
    } 

    }

    getById = async (id) => {
            try {
                var record = await this.prisma.business_services.findUnique({where : {id : id}
                });

                return record;
            } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business service!', error);
        }

    }

    // getByBusiness = async (filters) => {
    //     try {
    //         const search : Prisma.business_servicesFindManyArgs = {};
            
    //         const businessId = await this.prisma.businesses.findUnique({where : {id :filters.id}
    //         });
    //             return businessId;  
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of business services!', error);
    //     }
    // }
   
    exists = async (id) => {
        try {
            const record = await this.prisma.business_services.findUnique({where:{id:id}});
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of business services!', error);
        }
    }

    search = async (filters) => {
        try {
                const search : Prisma.business_servicesFindManyArgs = {};

                search.where = {
                    IsActive : true,
                }
                if (filters.Name != null) {
                    search.where =   {
                        Name : filters.Name,
                        }
                }
                if (filters.BusinessNodeId != null) {
                    search.where =   {
                        BusinessNodeId : filters.BusinessNodeId,
                        }
                }
                // if (filters.IsActive != null) {
                //     search.where =   {
                //         IsActive : true,
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
            
                const foundResults = await this.prisma.business_services.findMany(search)
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search business service records!', error);
        }
    }
    
    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_services.updateMany({data:updateModel,
                        where :{
                        id : id
                    }
                 });                
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business service!', error);
        }
    }

    delete = async (id) => {
        try {
            const result = await this.prisma.business_services.delete({ where: 
                { id: id } 
            });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete business service!', error);
  
        }
    };


}  