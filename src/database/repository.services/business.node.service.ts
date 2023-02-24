import { BusinessNodeSearchResults, BusinessNodeSearchFilters } from "../../domain.types/business.node/business.node.domain.types";
import instance from "tsyringe/dist/typings/dependency-container";
import { Logger } from '../../common/logger';
import { Helper } from "../../common/helper";
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";

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

}





}
