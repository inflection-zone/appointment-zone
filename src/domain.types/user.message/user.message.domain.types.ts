import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface UserMessageCreateModel {
    Body   ?		: string;
    BusinessNodeId  : string;
    CustomerId	    : string;
    Error		?   : string;
    IsSent		    : boolean;
    MessageId	?	: string;
    SentOn	?	    : Date;
    Type	?	    : string;
    TypeId		    : number;
    IsActive		: boolean;
}

export interface UserMessageUpdateModel {
    Body   ?		: string;
    BusinessNodeId? : string;
    CustomerId?	    : string;
    Error	?	    : string;
    IsSent	?	    : boolean;
    MessageId   ?	: string;
    SentOn	?	    : Date;
    Type	?	    : string;
    TypeId	?	    : number;
    IsActive ?	    : boolean;
}

export interface UserMessageDto {
    id              : string;
    Body        ?	: string;
    BusinessNodeId  : string;
    CustomerId	    : string;
    Error	    ?   : string;
    IsSent		    : boolean;
    MessageId   ?	: string;
    SentOn      ?    : Date;
    Type		?   : string;
    TypeId		    : number;
    IsActive		: boolean;
    CreatedAt       : Date;
    UpdatedAt       : Date;
    IsDeleted  ?    : boolean; 
    DeletedAt       : Date;
}

export interface UserMessageSearchFilters extends BaseSearchFilters {
    Body            ? : string;
    BusinessNodeId  ? : string;
    CustomerId      ? : string;
    Error	        ? : string;
    IsSent	        ? : boolean;
    MessageId       ? : string;
    SentOn	        ? : Date;
    Type	        ? : string;
    TypeId		    ? : number;
    IsActive		? : boolean;
}

export interface UserMessageSearchResults extends BaseSearchResults {
    Items: UserMessageDto[];
}
