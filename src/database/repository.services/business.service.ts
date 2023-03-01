import { BusinessSearchResults, BusinessSearchFilters } from "../../domain.types/business/business.domain.types";
import instance from "tsyringe/dist/typings/dependency-container";
import { Logger } from '../../common/logger';
import { Helper } from "../../common/helper";
import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";

export class BusinessService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:BusinessService=null;

    public static getInstance():BusinessService{
        return this.instance || (this.instance=new this());

    }

    create = async (createModel) => {
        try{
            var record=await this.prisma.businesses.create({data:createModel});
            console.log(record);
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create business!',error)
    } 

    }

    getById = async (id) => {
            try {
                var record = await this.prisma.businesses.findUnique({where : {id : id}
                });

                return record;
            } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve business!', error);
        }

    }

    exists = async (id) => {
        try {
            const record = await this.prisma.businesses.findUnique({where:{id:id}});
            return record !== null;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of business!', error);
        }
    }

    search = async (filters: BusinessSearchFilters): Promise <BusinessSearchResults> => {            
        try{
            var search = this.getSearchModel(filters);
            var {
                order,
                orderByColumn
            } = this.addSortingToSearch(search, filters);
            var {
                pageIndex,
                limit
            } = this.addPaginationToSearch(search, filters);

            const foundResults = await this.prisma.businesses.findMany(search)
            const searchResults: BusinessSearchResults = {
                TotalCount     : foundResults.length,
                RetrievedCount : foundResults.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : foundResults,

            }
                
             return searchResults;
            }catch (error) {
                ErrorHandler.throwDbAccessError('DB Error: Unable to create business!',error)
        } 

      }

    update = async (id, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.businesses.updateMany({data:updateModel,
                        where :{
                        id : id
                    }
                 });
                
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update Business!', error);
        }
    }

    delete = async (id) => {
        try {
            const result = await this.prisma.businesses.delete({ where: 
                { id: id } 
            });
            //return result ===1;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete Business!', error);
  
        }
    };


    getBusinessWithName = async (Name) => {
        try {
            const record = await this.prisma.businesses.findMany({ 
                where:
                { 
                    Name : Name, 
                }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business exists with name!', error);
        }
    };

 getBusinessWithEmail = async (email) => {
        try {
            const record = await this.prisma.businesses.findMany({ 
                where : 
                {
                    Email : email,
                 }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business exists with email!', error);
        }
    }

getBusinessWithMobile = async (Mobile) => {
        try {
            const record = await this.prisma.businesses.findMany({ where : { Mobile: Mobile }
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('Unable to check if business exists with mobile!', error);
        }
    }

    getBusiness = async (
        Name,
        Mobile,
        Email
    ) => {

        var filters = [];

       if (Name !== null) {
            filters.push({
               Name : Name
            });
        }
        else if (Mobile !== null ) {
            filters.push({
                Mobile :  Mobile,
            });
        }
        else if (Email !== null) {
            filters.push({
                Email : Email,
            });
        }

    }

private getSearchModel = (filters) => {
    var search = {
        where   : {},
        orderBy: {   
        },
        take:25
        // include :{}
    };
    var {
        order,
        orderByColumn
    } = this.addSortingToSearch(search, filters);
    var {
                pageIndex,
                limit
    } = this.addPaginationToSearch(search, filters);

    if (filters.ExternalId) {
        search.where['ExternalId'] = filters.ExternalId
        }
    
    if (filters.Name) {
        search.where['Name'] = filters.Name
        }
   
    if (filters.Mobile) {
        search.where['Mobile'] = filters.Mobile;
        }

    if (filters.Email) {
        search.where['Email'] = filters.Email;
        }

    if (filters.AboutUs) {
        search.where['AboutUs'] = filters.AboutUs;
        }

    if (filters.Logo) {
        search.where['Logo'] = filters.Logo;
        }
    
    if (filters.Address) {
        search.where['Address'] = filters.Address;
        }
    
    if (filters.DisplayPicture) {
        search.where['DisplayPicture'] = filters.DisplayPicture;
        }
    if (filters.OverallRating) {
        search.where['OverallRating'] = filters.OverallRating;
        }
    
    if (filters.Facebook) {
        search.where['Facebook'] = filters.Facebook;
        }

    if (filters.Linkedin) {
        search.where['Linkedin'] = filters.Linkedin;
        }
    if (filters.Instagram) {
        search.where['Instagram'] = filters.Instagram;
        }
    if (filters.Twitter) {
        search.where['Twitter'] = filters.Twitter;
        }

    if (filters.Yelp ) {
        search.where['Yelp '] = filters.Yelp;
        }

    return search;
    // return {
    //     search,
    //     orderByColumn,
    //     order,
    //     pageIndex,
    //     limit
    //     };

}

    private addSortingToSearch = (search, filters) => {

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
        //In case the 'order-by attribute' is on associated model
        //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
        }
        return {
            order,
            orderByColumn
    };
}

    private addPaginationToSearch = (search, filters) => {

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

        return {
             pageIndex,
             limit
    };
}


}