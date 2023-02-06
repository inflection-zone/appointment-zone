import instance from "tsyringe/dist/typings/dependency-container";
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";

export class CustomerService {
  prisma = PrismaClientInit.instance().prisma();

  public static instance:CustomerService = null;

  // private constructor(){}

  public static getInstance():CustomerService{
    return this.instance || (this.instance = new this());
  }

    create = async (createModel) => {
        try {
            var record = await this.prisma.customers.create({data:createModel});
            console.log (record);
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create customer!', error);
        }
    }

}