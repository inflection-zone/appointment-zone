import { any, number } from "joi";
import { where } from "sequelize";
import instance from "tsyringe/dist/typings/dependency-container";
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { Prisma } from '@prisma/client';
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

    getById = async (id) => {
      try {
          var record = await this.prisma.customers.findUnique({where : {id : id}
          });

          return record;
      } catch (error) {
      ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve customers!', error);
  }

}

exists = async (id) => {
    try {
        const record = await this.prisma.customers.findUnique(id);
        return record !== null;
    } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of Customer!', error);
    }
}

search = async (filters) => {
    try {
        const search : Prisma.customersFindManyArgs = {};
        if (filters.FirstName != null) {
            search.where['FirstName'] = filters.FirstName;
        }
        if (filters.LastName != null) {
            search.where['LastName'] =  filters.LastName 
        }
        if (filters.Mobile != null) {
            search.where['Mobile'] = filters.Mobile
        }
        if (filters.Email != null) {
            search.where['Email'] = filters.Email;
        }

        // let orderByColumn = 'createdAt';
        // if (filters.OrderBy) {
        //     orderByColumn = filters.OrderBy;
        // }
        // let order = 'asc';
        // if (filters.Order === 'descending') {
        //     order = 'desc';
        // }
        // search['orderBy'] = [[orderByColumn, order]];
        search.orderBy = {
                createdAt : 'asc'
        }
        if (filters.Order === 'descending') {
            search.orderBy = {
                createdAt : 'desc'
        }
        }
        search.take = 25;
        if (filters.ItemsPerPage) {
           search.take = filters.ItemsPerPage;
        }
        search.skip = 0;
        let pageIndex = 0;
        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
            search.skip = pageIndex * search.take;
        }
        // search[''] = limit;
        // search['offset'] = offset;
        const foundResults = await this.prisma.customers.findMany(search)
        const searchResults = {
            TotalCount     : foundResults.length,
            RetrievedCount : foundResults.length,
            PageIndex      : pageIndex,
            ItemsPerPage   : search.take,
            Order          :  search.orderBy,
            // OrderedBy      : orderByColumn,
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
          var res = await this.prisma.customers.updateMany({data:updateModel,
                  where :{
                  id : id
              }
           });
          
      }
      return await this.getById(id);
  } catch (error) {
      ErrorHandler.throwDbAccessError('DB Error: Unable to update customers!', error);
  }
}


delete = async (id) => {
  try {
      const result = await this.prisma.customers.delete({ where: 
          { id: id } 
      });
      //return result ===1;
  } catch (error) {
      ErrorHandler.throwDbAccessError('DB Error: Unable to delete customers!', error);

  }
}
}
