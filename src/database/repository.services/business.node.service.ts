import { BusinessNodeSearchResults, BusinessNodeSearchFilters } from "../../domain.types/business.node/business.node.domain.types";
//import instance from "tsyringe/dist/typings/dependency-container";
import { Logger } from '../../common/logger';
import { Helper } from "../../common/helper";
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessNodeService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessNodeService=null;

    public static getInstance():BusinessNodeService{
        return this.instance || (this.instance=new this());

    }

    create = async (createModel) => {
        try{
            var record=await this.prisma.business_nodes.create({data:createModel});
            console.log(record);
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business node!',error)
    } 

    }

    getById = async (id) => {
        try {
            var record = await this.prisma.business_nodes.findUnique({where : {id : id}
            });

            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business node!', error);
    }

    };

    search = async (filters) => {
        try {
            const search : Prisma.business_nodesFindManyArgs = {};
            if (filters.Name != null) {
                search.where = {
                    Name : filters.Name
                }
            }
            if (filters.Mobile != null) {
                search.where =   {
                    Mobile : filters.Mobile
                }
            }
            if (filters.Email != null) {
                search.where =   {
                    Email : filters.Email
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
            const foundResults = await this.prisma.business_nodes.findMany(search)
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
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_nodes.updateMany({data:updateModel,
                    where :{
                    id : id
                }
             });   
        }
        return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update Business node!', error);
        }
    }

    delete = async (id) => {
        try {
            const result = await this.prisma.business_nodes.delete({ where: 
                { id: id } 
            });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete Business node!', error);
        }
    };

    getBusinessNodeWithEmail = async (email) => {
        try {
            const record = await this.prisma.business_nodes.findUnique({ where : {Email : email}
        });
        return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business node exists with email!', error);
        }
    };

    getBusinessNodeWithMobile = async (mobile) => {
        try {
            const record = await this.prisma.business_nodes.findUnique({ where : { Mobile: mobile }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business node exists with mobile!', error);
        }
    };

    createDefaultForBusiness = async (record) => {
        var newNode = {
            BusinessId              : record.id,
            Name                    : record.Name,
            Mobile                  : record.Mobile,
            Email                   : record.Email,
            DisplayPicture          : record.DisplayPicture,
            Address                 : record.Address,
            AllowWalkinAppointment  : true,
            IsActive                : true
        }
        const created = await this.prisma.business_nodes.create({data:newNode});
        return created;
    
    };
    
    



}
