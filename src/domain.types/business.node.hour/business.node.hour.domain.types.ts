import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BusinessNodeHourCreateModel {
  id?             :             String
  BusinessNodeId ?:            String  
  Type ?          :            String  
  Day  ?          :            Number
  Date?           :            Date
  IsOpen?         :            Boolean 
  Message?        :            String
  StartTime?      :            String
  EndTime ?       :            String
  IsActive?       :            Boolean 
  IsDeleted?      :            Boolean 
  DayWiseWorkingHours? :       NodeHourCreateModel[]
  }

  export interface NodeHourCreateModel{
    Day             : Number;
    StartTime       : String;
    EndTime         : String;

  }
  
export interface BusinessNodeHourUpdateModel {
  id?             :             String
  BusinessNodeId? :            String  
  Type?           :            String  
  Day?            :            Number
  Date?           :            Date
  IsOpen?         :            Boolean 
  Message?        :            String
  StartTime?      :            String
  EndTime?        :            String
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
  StartTime      :            String
  EndTime        :            String
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
  StartTime?      :            String
  EndTime?        :            String
  IsActive?       :            Boolean 
  IsDeleted?      :            Boolean   

    
}

export interface BusinessNodeHourSearchResults extends BaseSearchResults {
    Items: BusinessNodeHourDto[];
}

