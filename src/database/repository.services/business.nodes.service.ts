import { BusinessNodesSearchResults, BusinessNodesSearchFilters } from "../../domain.types/business.nodes/business.nodes.domain.types";
import instance from "tsyringe/dist/typings/dependency-container";
import { Logger } from '../../common/logger';
import { Helper } from "../../common/helper";
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class BusinessNodesService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessNodesService=null;

    public static getInstance():BusinessNodesService{
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





}
