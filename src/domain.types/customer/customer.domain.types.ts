
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

export interface CustomerCreateModel {
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
};

export interface CustomerModel {
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
    id              : uuid;
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
