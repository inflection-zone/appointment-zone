import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface BusinessUserHourCreateModel {
    id               ? : string;
    BusinessUserId     : string;
    Type               : string;
    Day                : number;
    Date             ? : Date;
    IsOpen             : boolean;
    Message          ? : string;
    StartTime          : string;
    EndTime            : string;
    IsActive           : boolean;
}

export interface BusinessUserHourUpdateModel {
    BusinessUserId   ? : string;
    Type             ? : string;
    Day              ? : number;
    Date             ? : Date;
    IsOpen           ? : boolean;
    Message          ? : string;
    StartTime        ? : string;
    EndTime          ? : string;
    IsActive         ? : boolean;
}

export interface BusinessUserHourDto {
    BusinessUserId     : string;
    Type               : string;
    Day                : number;
    Date               : Date;
    IsOpen             : boolean;
    Message            : string;
    StartTime          : string;
    EndTime            : string;
    IsActive           : boolean;
}

export interface BusinessUserHourSearchFilters extends BaseSearchFilters {
    BusinessUserId   ? : string;
    Type             ? : string;
    Day              ? : number;
    Date             ? : Date;
    IsOpen           ? : boolean;
    Message          ? : string;
    StartTime        ? : string;
    EndTime          ? : string;
    IsActive         ? : boolean;
}

export interface BusinessUserHourSearchResults extends BaseSearchResults {
    Items: BusinessUserHourDto[];
}