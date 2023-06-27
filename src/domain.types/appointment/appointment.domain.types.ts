import { float } from "aws-sdk/clients/cloudfront";
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";

export interface AppointmentCreateModel {
    id ?	                    : string;
    BusinessNodeId              : string;
    BusinessServiceId           : string;
    BusinessUserId              : string;
    CustomerId                  : string;
    CancelledOn ?               : Date;
    CompletedOn ?               : Date;
    ConfirmedOn ?               : Date;
    CouponCode  ?               : string;
    DisplayId                   : string;
    Discount                    : float;
    EndTime     ?               : Date;
    Fees                        : float;
    IsCancelled                 : boolean;
    IsCompleted		            : boolean;
    IsConfirmed                 : boolean;
    IsPaid                      : boolean;
    IsRescheduled               : boolean;
    Note ?                      : string;
    RescheduledAppointmentId ?  : number;
    RescheduledOn  ?            : Date;
    StartTime                   : number;
    Status                      : string;
    StatusCode                  : string;
    Tax		                    : float;
    Tip		                    : float;
    Total		                : float;
    TransactionId ?             : string;
    Type                        : string;
    IsActive		            : boolean;
}

export interface AppointmentUpdateModel {
    BusinessNodeId        ?      : string;
    BusinessServiceId     ?      : string;
    BusinessUserId        ?      : string;
    CustomerId            ?      : string;
    StartTime             ?      : number;
    EndTime               ?      : Date;
    Type                  ?      : string;
    Note                  ?      : string;
    Status                ?      : string;
    StatusCode            ?      : string;
    Fees                  ?      : float;
    Tax		              ?      : float;
    Tip		              ?      : float;
    Discount              ?      : float;
    CouponCode            ?      : string;
    Total		          ?      : float;
    IsPaid                ?      : boolean;
    TransactionId         ?      : string;   
}

export interface AppointmentDto {
    id ?	                    : string;
    BusinessNodeId              : string;
    BusinessServiceId           : string;
    BusinessUserId              : string;
    CustomerId                  : string;
    CancelledOn ?               : Date;
    CompletedOn ?               : Date;
    ConfirmedOn ?               : Date;
    CouponCode  ?               : string;
    DisplayId                   : string;
    Discount                    : float;
    EndTime     ?               : Date;
    Fees                        : float;
    IsCancelled                 : boolean;
    IsCompleted		            : boolean;
    IsConfirmed                 : boolean;
    IsPaid                      : boolean;
    IsRescheduled               : boolean;
    Note ?                      : string;
    RescheduledAppointmentId ?  : number;
    RescheduledOn  ?            : Date;
    StartTime                   : number;
    Status                      : string;
    StatusCode                  : string;
    Tax		                    : float;
    Tip		                    : float;
    Total		                : float;
    TransactionId ?             : string;
    Type                        : string;
    IsActive		            : boolean;
}

export interface AppointmentSearchFilters extends BaseSearchFilters {
    BusinessNodeId ?        : string;
}

export interface AppointmentSearchResults extends BaseSearchResults {
Items : AppointmentDto[];
}

