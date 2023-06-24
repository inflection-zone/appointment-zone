import { ErrorHandler } from "../../common/error.handler";
import { PrismaClientInit } from "../../startup/prisma.client.init";
import { ApiError } from "../../common/api.error";
import { uuid } from "../../domain.types/miscellaneous/system.types";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjsBusinessDays from 'dayjs-business-days2';
import { TimeHelper as th} from '../../common/time.helper';

 ///////////////////////////////////////////////////////////////////////////

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(updateLocale);
dayjs.extend(dayjsBusinessDays);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class AppointmentService{
    prisma = PrismaClientInit.instance().prisma();

    public static instance:AppointmentService=null;
    public static getInstance():AppointmentService{
        return this.instance || (this.instance=new this());
    }

    create = async (createModel) => {
        try {
            var record = await this.prisma.appointments.create({data:createModel});
            return record;
        }catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to book appointment!',error);
        } 
    };

    canCustomerBookThisSlot = async(customerId, startTime, endTime) => {
        try {
            const start = th.utc(startTime);
            const end = th.utc(endTime);
            const record = await this.prisma.appointments.findMany({
                where : {
                    CustomerId      : customerId,
                    IsCancelled     : false,
                    IsActive        : true,
                    OR :
                    [
                        {
                        StartTime   :
                        {
                            gte : start,
                            lte : end,
                        },
                    },
                    {
                        EndTime : {
                            gte : start,
                            lte : end,
                        },
                    },
                ],
            },
        });
        if(record.length > 0){
            return {
                    CanBook                 : false,
                    ConflictingAppointment  : record[0]
                }
            }
            const appointments = await this.prisma.appointments.findMany({
                where : {
                    CustomerId      : customerId,
                    IsCancelled     : false,
                    IsActive        : true,
                    OR : [
                        {
                            StartTime : {
                                lte : start,
                            },
                            EndTime : {
                                gte : end,
                            },
                        },
                        {
                            StartTime : {
                                gte : start,
                            },
                            EndTime : {
                                lte : end,
                            },
                        },
                    ],
                },
            });
            if(appointments.length > 0) {
                return {
                    CanBook                 : false,
                    ConflictingAppointment  : appointments[0]
                };
            }
            return {
                CanBook                 : true,
                ConflictingAppointment  : null
            };
        }
        catch (error) {
           ErrorHandler.throwDbAccessError("Unable to check slot conflict!", error);
        }
    };

    checkConflictWithCustomerAppointments = async(customerId: uuid, startTime, endTime) => {
        const start = th.utc(startTime); //dayjs.utc(startTime)
        const end = th.utc(endTime); //dayjs.utc(endTime)
        const record = await this.prisma.appointments.findMany({
            where : {
                CustomerId     : customerId,
                IsCancelled    : false,
                IsActive       : true,
                OR : [
                    {
                        StartTime : {
                            gte : start,
                            lte : end,
                        },
                    },
                    {
                        EndTime  : {
                            gte : start,
                            lte : end,
                        },
                    },
                ],
            },
        });
        if(record.length > 0) {
            return true;
        }
        const appointments = await this.prisma.appointments.findMany({
            where : {
                CustomerId     : customerId,
                IsCancelled    : false,
                IsActive       : true,
                OR : [
                    {
                        StartTime : {
                            lte : start,
                        },
                        EndTime : {
                            gte : end,
                        },
                    },
                    {
                        StartTime : {
                            gte : start,
                        },
                        EndTime  : {
                            lte : end,
                        },
                    },
                ],
            },
        });
        if(appointments.length > 0) {
            return true;
        }
        return false;
    };

    getByDisplayId = async (Displayid) => {
        try {
            var record = await this.prisma.appointments.findUnique({where : {id : Displayid}
            });
            return record;
        } catch (error) {
        ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve appointment!', error);
        }
    };   

    getAvailableSlots = async (timeZone: string, slotsByDate, businessNodeId, businessUserId, businessServiceId, numDaysForSlots: number) => {
        var endDate = th.businessDaysAdd(numDaysForSlots);
        var appointments = await this.prisma.appointments.findMany({
            where : {
                BusinessNodeId      : businessNodeId,
                BusinessUserId      : businessUserId,
                BusinessServiceId   : businessServiceId,
                StartTime           : {
                    gte : dayjs.utc().toDate()
                },
                EndTime             : {
                    lte : dayjs.utc(endDate).toDate()
                },
                IsCancelled         : false,
                IsActive            : true
            },
        });

        for (var j = 0; j < slotsByDate.length; j++) {
            var sd = slotsByDate[j];
            var slotDay = sd.CurrentMoment;

            for(var i = 0; i < appointments.length; i++) {
                var appointment = appointments[i];
                var appointmentDay = th.getStartOfDayUtc(appointment.StartTime); //dayjs.utc(appointment.StartTime).startOf('day');
                if(!th.isSame(appointmentDay, slotDay)) {
                    continue;
                }
                
                const start  = th.utc(appointment.StartTime);
                const end = th.utc(appointment.EndTime);

                for(var k = 0; k < sd.Slots.length; k++) 
                {
                    var slotStart = sd.Slots[k].slotStart;
                    var slotEnd = sd.Slots[k].slotEnd;

                    if(th.isSame(start, slotStart) && th.isSame(end, slotEnd)) {
                        slotsByDate[j].Slots[k].available = false;
                    }
                }
            }
        }
        return slotsByDate;
    };

}