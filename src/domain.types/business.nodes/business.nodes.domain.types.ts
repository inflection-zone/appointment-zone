import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BusinessNodesCreateModel {
    id?                       : String
    BusinessId?               : String   
    Name                     : String  
    Mobile                   : String   
    Email                    : String  
    DisplayPicture?           : String
    Address                  : String
    Longitude                : String
    Lattitude                : String
    OverallRating?            : number
    TimeZone?                 : String  
    AllowWalkinAppointments?  : Boolean  
    AllowFutureBookingFor?    : String  
    IsActive                 : Boolean 
  }
  


export interface BusinessNodesUpdateModel {
    ExternalId?      : string
    Name?            : string;
    Mobile?          : string;   
    Email?           : string;
    AboutUs?         : string;
    Logo?            : string; 
    DisplayPicture?  : string;
    OverallRating?   : number;
    Address?         : string; 
    ApiKey?          : string;
    Facebook?        : string;
    Linkedin?        : string;
    Twitter?         : string;
    Instagram?       : string;
    Yelp?            : string;
    IsActive?        : Boolean;
           
}

export interface BusinessNodesDto {
   
    ExternalId      : string;
    Name            : string;
    Mobile          : string;  
    Email           : string;
    AboutUs         : string;
    Logo            : string; 
    DisplayPicture  : string;
    OverallRating   : number;
    Address         : string; 
    ApiKey          : string;
    Facebook        : string;
    Linkedin        : string;
    Twitter         : string;
    Instagram       : string;
    Yelp            : string;
    IsActive        : Boolean;
    // createdAt       : Date;
    // updatedAt       : Date;
      
}

export interface BusinessNodesSearchFilters extends BaseSearchFilters {
    
    ExternalId ?     : string;
    Name ?           : string;
    Mobile?          : string;  
    Email?           : string;
    AboutUs?         : string;
    Logo?            : string; 
    DisplayPicture?  : string;
    OverallRating ?  : number;
    Address?         : string; 
    Facebook?        : string;
    Linkedin?        : string;
    Twitter?         : string;
    Instagram?       : string;
    Yelp?            : string;
    IsActive?        : Boolean;

    
}

export interface BusinessNodesSearchResults extends BaseSearchResults {
    Items: BusinessNodesDto[];
}

