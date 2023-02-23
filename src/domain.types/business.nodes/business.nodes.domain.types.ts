import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BusinessNodesCreateModel {
    id?                       : String
    BusinessId?               : String   
    Name                      : String  
    Mobile                    : String   
    Email                     : String  
    DisplayPicture?           : String
    Address?                   : String
    Longitude?                 : String
    Lattitude?                 : String
    OverallRating?            : number
    TimeZone?                 : String  
    AllowWalkinAppointments?  : Boolean  
    AllowFutureBookingFor?    : String  
    IsActive                  : Boolean 
  }
  


export interface BusinessNodesUpdateModel {
    id?                       : String
    BusinessId?               : String   
    Name?                     : String  
    Mobile?                   : String   
    Email?                    : String  
    DisplayPicture?           : String
    Address?                  : String
    Longitude?                : String
    Lattitude?                : String
    OverallRating?            : number
    TimeZone?                 : String  
    AllowWalkinAppointments?  : Boolean  
    AllowFutureBookingFor?    : String  
    IsActive?                 : Boolean 
}

export interface BusinessNodesDto {
   
    id                       : String
    BusinessId               : String   
    Name                     : String  
    Mobile                   : String   
    Email                    : String  
    DisplayPicture           : String
    Address                  : String
    Longitude                : String
    Lattitude                : String
    OverallRating            : number
    TimeZone                 : String  
    AllowWalkinAppointments  : Boolean  
    AllowFutureBookingFor    : String  
    IsActive                 : Boolean 
      
}

export interface BusinessNodesSearchFilters extends BaseSearchFilters {
    
    id?                       : String
    BusinessId?               : String   
    Name?                     : String  
    Mobile?                   : String   
    Email?                    : String  
    DisplayPicture?           : String
    Address?                  : String
    Longitude?                : String
    Lattitude?                : String
    OverallRating?            : number
    TimeZone?                 : String  
    AllowWalkinAppointments?  : Boolean  
    AllowFutureBookingFor?    : String  
    IsActive?                 : Boolean 

    
}

export interface BusinessNodesSearchResults extends BaseSearchResults {
    Items: BusinessNodesDto[];
}

