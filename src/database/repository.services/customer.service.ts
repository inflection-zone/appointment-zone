import { any, number } from "joi";
import { where } from "sequelize";
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
        var search;
       if(filters.FirstName || filters.LastName || filters.Mobile || filters.Email ){
         search= await this.prisma.customers.findMany({
            where   : {OR:[
                { FirstName: { contains: filters.FirstName } },
                { LastName: { contains: filters.LastName } },
                { Mobile: { contains: filters.Mobile } },
                { Email: { contains: filters.Email } }
                
                
            ]}})}else{
                search= await this.prisma.customers.findMany()

            }
            
                // select:{
                //     FirstName: true,
                //     LastName: true,
                    
                //     Mobile: true,
                //     Email: true
                //    }
            // include : {}
            // var results = await this.prisma.$transaction([
            //     count=this.prisma.customers.count({
            //         where   : {OR:[{ Email: { contains: filters.Email } },
            //             { Mobile: { contains: filters.Mobile } }]}
            //     }),
            //     this.prisma.customers.findMany({
            //     where   : {OR:[{ Email: { contains: filters.Email } },
            //         { Mobile: { contains: filters.Mobile } }]}
        
   
        
        // if (filters.Email) {
        //     search['Email'] = filters.Email;
        // }
        // if (filters.Mobile) {
        //     search['Mobile'] = filters.Mobile;
        // }
        // if (filters.LastName) 
        //     search['LastName'] = filters.LastName;
        

        
       

        // Sorting
        let orderByColumn = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy;
        }
        let order = 'ASC';
        if (filters.Order === 'descending') {
            order = 'DESC';
        }
        search['order'] = [
            [orderByColumn, order]
        ];

        if (filters.OrderBy) {
        //     //In case the order-by attribute is on associated model
        //     //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
        }

        // //Pagination
        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }
        let offset = 0;
        let pageIndex = 0;
        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
            offset = pageIndex * limit;
        }
        search['limit'] = limit;
        search['offset'] = offset;

        const foundResults = search
        const searchResults = {
            TotalCount     : foundResults.length,
            RetrievedCount : foundResults.length,
            PageIndex      : pageIndex,
            ItemsPerPage   : limit,
            Order          : order === 'DESC' ? 'descending' : 'ascending',
            OrderedBy      : orderByColumn,
            Items          : foundResults,
        };

        return searchResults;
        // return results;
    
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
