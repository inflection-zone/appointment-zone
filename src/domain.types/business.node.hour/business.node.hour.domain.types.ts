import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { Gender, uuid } from "../miscellaneous/system.types";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BusinessNodeHourCreateModel {
  id?             :             String
  BusinessNodeId :            String  
  Type           :            String  
  Day            :            Number
  Date?           :            Date
  IsOpen?         :            Boolean 
  Message?        :            String
  StartTime?      :            Date
  EndTime?        :            Date
  IsActive?       :            Boolean 
  IsDeleted?      :            Boolean 
  }
  
export interface BusinessNodeHourUpdateModel {
  id?             :             String
  BusinessNodeId? :            String  
  Type?           :            String  
  Day?            :            Number
  Date?           :            Date
  IsOpen?         :            Boolean 
  Message?        :            String
  StartTime?      :            Date
  EndTime?        :            Date
  IsActive?       :            Boolean 
  IsDeleted?      :            Boolean  
}

export interface BusinessNodeHourDto {
  id             :             String
  BusinessNodeId :            String  
  Type           :            String  
  Day            :            Number
  Date           :            Date
  IsOpen         :            Boolean 
  Message        :            String
  StartTime      :            Date
  EndTime        :            Date
  IsActive       :            Boolean 
  IsDeleted      :            Boolean 
      
}

export interface BusinessNodeHourSearchFilters extends BaseSearchFilters {
    id?             :             String
  BusinessNodeId? :            String  
  Type?           :            String  
  Day?            :            Number
  Date?           :            Date
  IsOpen?         :            Boolean 
  Message?        :            String
  StartTime?      :            Date
  EndTime?        :            Date
  IsActive?       :            Boolean 
  IsDeleted?      :            Boolean   

    
}

export interface BusinessNodeHourSearchResults extends BaseSearchResults {
    Items: BusinessNodeHourDto[];
}

