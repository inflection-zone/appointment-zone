
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

export interface CustomerCreateModel {
    id ?             :string;
    Prefix ?         : string;
    FirstName?       : string;
    LastName?        : string;
    Mobile          : string   
    Email?           : string;
    BirthDate?       : Date;
    Gender?          : string; 
    DisplayPicture?  : string;
    Address ?        : string; 
    InAppUser       : Boolean;  
    IsActive        : Boolean;       
};

export interface CustomerUpdateModel {
    Prefix?          : string;
    FirstName?       : string;
    LastName ?       : string;
    Mobile ?         : string   
    Email ?          : string;
    BirthDate ?      : Date;
    Gender ?         : string; 
    DisplayPicture?  : string;
    Address?         : string;
    InAppUser ?      : Boolean; 
    IsActive ?       : Boolean;  
}

export interface CustomerDto {
   
    Prefix          : string;
    FirstName       : string;
    LastName        : string;
    Mobile          : string   
    Email           : string;
    BirthDate       : Date;
    Gender          : string; 
    DisplayPicture  : string;
    Address         : string; 
    InAppUser       : Boolean;  
    IsActive        : Boolean; 
}

export interface CustomerSearchFilters extends BaseSearchFilters {
    FirstName?: string;
    LastName? : string;
    Mobile?   : string;
    Email?    : string;
}

export interface CustomerSearchResults extends BaseSearchResults {
    Items: CustomerDto[];
}
