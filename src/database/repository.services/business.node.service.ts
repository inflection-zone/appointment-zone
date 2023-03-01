import { BusinessNodeSearchResults, BusinessNodeSearchFilters } from "../../domain.types/business.node/business.node.domain.types";
//import instance from "tsyringe/dist/typings/dependency-container";
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
        //return result ===1;
    } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to delete Business node!', error);

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

getBusinessNodeWithEmail = async (email) => {
    try {
        const record = await this.prisma.business_nodes.findUnique({ where : {Email : email}
        });
        return record;
    } catch (error) {
        ErrorHandler.throwDbAccessError('Unable to check if business node exists with email!', error);
    }
}

// getBusinessNodeWithMobile = async (Mobile) => {
//     try {
//         const record = await this.prisma.business_nodes.findUnique({ where : { Mobile: Mobile }
//         });
//         return record;
//     } catch (error) {
//         ErrorHandler.throwDbAccessError('Unable to check if business node exists with mobile!', error);
//     }
// }





}
