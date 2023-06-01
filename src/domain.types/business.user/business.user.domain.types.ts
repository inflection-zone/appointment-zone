import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BusinessUserCreateModel {
  id?                            :   String  
  BusinessNodeId                :   String 
  FirstName                     :   String 
  LastName                      :   String 
  Prefix                        :   String  
  Mobile                        :   String 
  Email?                        :   String 
  DisplayPicture?               :   String 
  AboutMe?                      :   String
  Qualification?                :   String
  Experience?                   :   String 
  OverallRating?                :   number 
  Dob?                          :   Date
  Gender?                       :   String 
  IsAvailableForEmergency?      :   Boolean 
  Facebook?                     :   String 
  Linkedin?                     :   String
  Twitter?                      :   String
  Instagram?                    :   String 
  Yelp?                         :   String 
  IsActive                      :   Boolean 
}
  
export interface BusinessUserUpdateModel {
  id?                            :   String  
  BusinessNodeId?                :   String 
  FirstName?                     :   String 
  LastName?                      :   String 
  Prefix?                        :   String  
  Mobile?                        :   String 
  Email?                         :   String 
  DisplayPicture?                :   String 
  AboutMe?                       :   String
  Qualification?                 :   String
  Experience?                    :   String 
  OverallRating?                 :   number 
  Dob?                           :   Date
  Gender?                        :   String 
  IsAvailableForEmergency?       :   Boolean 
  Facebook?                      :   String 
  Linkedin?                      :   String
  Twitter?                       :   String
  Instagram?                     :   String 
  Yelp?                          :   String 
  IsActive?                      :   Boolean 
}

export interface BusinessUserDto {
    id                            :   String  
    BusinessNodeId                :   String 
    FirstName                     :   String 
    LastName                      :   String 
    Prefix                        :   String  
    Mobile                        :   String 
    Email                         :   String 
    DisplayPicture                :   String 
    AboutMe                       :   String
    Qualification                 :   String
    Experience                    :   String 
    OverallRating                 :   number 
    Dob                           :   Date
    Gender                        :   String 
    IsAvailableForEmergency       :   Boolean 
    Facebook                      :   String 
    Linkedin                      :   String
    Twitter                       :   String
    Instagram                     :   String 
    Yelp                          :   String 
    IsActive                      :   Boolean 
      
}

export interface BusinessUserSearchFilters extends BaseSearchFilters {
  BusinessNodeId?                :   String  
}

export interface BusinessUserSearchResults extends BaseSearchResults {
    Items: BusinessUserDto[];
}

