import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
import { TimeHelper } from "../../common/time.helper"; 
export class BusinessUserHourService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessUserHourService=null;
   
    public static getInstance():BusinessUserHourService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record = await this.prisma.business_user_hours.create({data:createModel});
            console.log(record);
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business user hours!', error)
        } 

    };

    createMany = async (createModels) => {
        try{
            var records = await this.prisma.business_user_hours.createMany({data:createModels});
            return records;
            }catch (error) {
                ErrorHandler.throwDbAccessError('DB Error: Unable to create business user service!', error)
        } 
    };

    getById = async (id) => {
        try {
            var record = await this.prisma.business_user_hours.findUnique({where : {id : id}
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business user hours!', error);
        }

    };

    // exists = async (requestBody) => {
    //     try {
    //         const search : Prisma.business_user_hoursFindManyArgs = {};
            
    //         var businessUserId = requestBody.BusinessUserId;
    //         var type = requestBody.Type;
    //         var day = requestBody.Day;
    //         var date = requestBody.Date;

    //         search.where = {
    //             IsActive : true,
    //             BusinessUserId : businessUserId,
    //             Type : type,
    //             Day : day,
    //             Date : date,
    //         }
    //         const record = await this.prisma.business_user_hours.findMany(search);
    //         return record;
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of business user hours!', error);
    //     }
    // };

    search = async (filters) => {
        try {
            const search : Prisma.business_user_hoursFindManyArgs = {};
            search.where =   {
                    IsActive : true,
                    }
            if (filters.BusinessUserId != null) {
                search.where =   {
                    BusinessUserId : filters.BusinessUserId,
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
            
            const foundResults = await this.prisma.business_user_hours.findMany(search)
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
            ErrorHandler.throwDbAccessError('DB Error: Unable to search business user hours records!', error);
        }
    };

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_user_hours.updateMany({data:updateModel,
                        where :{
                        id : id
                    }
                 });
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business user hours!', error);
        }
    };

    updateMany = async (id, updateModel) => {
        try {
            for await (var wh of updateModel){
                var businessUserId = wh.BusinessUserId;
                const search  : Prisma.business_user_hoursFindManyArgs = {};
                search.where = {
                    BusinessUserId : wh.BusinessUserId,
                    Day : wh.Day,
                    Date : null,
                    IsActive : true
                };
                var userHoursList = await this.prisma.business_user_hours.findMany(search)
                var nodeHoursList = await this.prisma.business_node_hours.findMany({select: {
                    BusinessNodeId : businessUserId,
                    Day : wh.Day,
                    Date : null,
                    StartTime : wh.StartTime,
                    EndTime : wh.EndTime,
                    IsActive : true
                }})
                var nodeHoursForDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null
                if (nodeHoursForDay != null && wh.StartTime != null && wh.EndTime != null) {
                  var nodeStartTime = nodeHoursForDay.StartTime
                  var nodeEndTime = nodeHoursForDay.EndTime
            }
            if (TimeHelper.isBefore(wh.StartTime, nodeStartTime)) {
                wh.StartTime = nodeStartTime;
            }
            if (TimeHelper.isAfter(wh.EndTime, nodeEndTime)) {
                wh.EndTime = nodeEndTime;
            }
            var updateIsOpen = wh.hasOwnProperty('IsOpen') ? wh.IsOpen :null;
            var type = "WORK-DAY"
        if (!updateIsOpen || nodeHoursForDay == null) {
            type = "NON-WORKING-DAY"
        }
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.business_user_hours.updateMany({data:updateModel,
                        where :{
                        id : id
                    }
                 });
            }
            return await this.getById(id);
        }
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update business user hours!', error);
        }
    };
    
    delete = async (id, updateModel) => {
        try {
            const result = await this.prisma.business_user_hours.delete({ where: { id: id } });
            // const deleted = await this.prisma.business_user_hours.updateMany({data : {IsActive: false , id:id},
            //     where : { IsActive: true}
            // });
            return result;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete business user hours!', error);
    
        }
    };

    getNodeDetails = async(requestBody) => {
        try{
            var nodeHoursList = await this.prisma.business_node_hours.findMany({where : {
                BusinessNodeId : requestBody.id,
                Day : requestBody.Day,
                Date : null,
                IsActive : true
            }
            });
            var nodeHoursDay = nodeHoursList.length > 0 ? nodeHoursList[0] : null;
            if(nodeHoursDay != null && requestBody.StartTime !=null && requestBody.EndTime != null){
                    var nodeStartTime = nodeHoursDay.StartTime;
                    var nodeEndTime = nodeHoursDay.EndTime;

                    if (TimeHelper.isBefore(requestBody.StartTime, nodeStartTime)) {
                        requestBody.StartTime = nodeStartTime;
                    }
                    if (TimeHelper.isAfter(requestBody.EndTime, nodeEndTime)) {
                        requestBody.EndTime = nodeEndTime;
                    }
                }
            } catch (error) {
                ErrorHandler.throwDbAccessError('DB Error: Unable to search business node hours!', error);
        
            }
        }
}