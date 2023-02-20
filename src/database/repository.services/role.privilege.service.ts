import { PrismaClientInit } from "../../startup/prisma.client.init";
import { ErrorHandler } from '../../common/error.handler';
import { Op } from 'sequelize';

///////////////////////////////////////////////////////////////////////////////////////////////
export class RolePrivilegeService {
    prisma = PrismaClientInit.instance().prisma();

    public static instance:RolePrivilegeService =null;

    public static getInstance():RolePrivilegeService {
        return this.instance || (this.instance=new this());

    }


    create = async (createModel) => {
        try {
            return await this.prisma.role_privileges.create(createModel);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to create role privilege!', error);
        }
    };

    getById = async (id) => {
        try {
            return await this.prisma.role_privileges.findUnique(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role privilege!', error);
        }
    };

    getPrivilegesForRole = async (roleId) => {
        try {
            const rolePrivileges = await this.prisma.role_privileges.findMany({
                where : {
                    RoleId : roleId,
                },
            });
            return rolePrivileges.map((x) => x.Privilege);
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to retrieve role privileges!', error);
        }
    };

    hasPrivilegeForRole = async (roleId, privilege) => {
        try {
            const rolePrivileges = await this.prisma.role_privileges.findMany({
                where : {RoleId  : roleId, Privilege :  privilege ,},
            });
            return rolePrivileges.length > 0;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to validate role and privilege!', error);
        }
    };
    
}
