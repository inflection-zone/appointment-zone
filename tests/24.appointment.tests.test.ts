import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

  var agent = request.agent(infra._app);

  it('Only fromDate or toDate is given', function(done) {
    loadAppointmentGetModel();
    const BusinessId = getTestData("BusinessId");
    const BusinessNodeId = getTestData("BusinessNodeId");
    const BusinessServiceId = getTestData("BusinessServiceId");
      agent
          .get(`/api/v1/appointments/business/${BusinessId}/node/${BusinessNodeId}/service/${BusinessServiceId}/slots?toDate=2023-07-18`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('failure');
          })
          .expect(404, done);
  });

  it('Create multiple business node hour', function(done) {
    loadBusinessNodeHourCreateMultipleModel();
    const createModel = getTestData("BusinessNodeHourCreateMultipleModel");
    agent
        .post(`/api/v1/business-node-hours/add-multiple`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
          for(const res of response.body.Data){
            setTestData(res.id, 'BusinessNodeHourIds')
              expect(res).to.have.property('id');
              expect(res).to.have.property('BusinessNodeId');
              expect(res).to.have.property('Type');
              expect(res).to.have.property('Day');
              expect(res).to.have.property('Date');
              expect(res).to.have.property('IsOpen');
              expect(res).to.have.property('Message');
              expect(res).to.have.property('StartTime');
              expect(res).to.have.property('EndTime');
              expect(res).to.have.property('IsActive');
              expect(res).to.have.property('IsDeleted');
          }
          })
      .expect(201, done);
  })

  it('Create multiple business user hour', function(done) {
    loadBusinessUserHourCreateMultipleModel();
    const createModel = getTestData("BusinessUserHourCreateMultipleModel");
    agent
        .post(`/api/v1/business-user-hours/create-multiple`)
        .set('Content-Type', 'application/json')
        .send(createModel)
        .expect(response => {
          for(const res of response.body.Data){
            setTestData(res.id, 'BusinessUserHourIds')
              expect(res).to.have.property('id');
              expect(res).to.have.property('BusinessUserId');
              expect(res).to.have.property('Type');
              expect(res).to.have.property('Day');
              expect(res).to.have.property('Date');
              expect(res).to.have.property('IsOpen');
              expect(res).to.have.property('Message');
              expect(res).to.have.property('StartTime');
              expect(res).to.have.property('EndTime');
              expect(res).to.have.property('IsActive');
          }
          })
      .expect(201, done);
  })
  

    it('Create appointment status for cancelled/completed/confirmed the appointment but the status is undefined or null', function(done) {
      loadAppointmentStatusMultipleModel();
      const createModel = getTestData("AppointmentStatusCreateMultipleModel");
      agent
          .post(`/api/v1/appointment-statuses/add-multiple`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('success');
          })
          .expect(201, done);
    });

    it('Appointment is booked & try to cancelled/completed/confirmed the appointment but the status is undefined or null', function(done) {
      loadAppointmentBookCreateModel();
      const createModel = getTestData("AppointmentBookCreateModel");
      agent
          .post(`/api/v1/appointments/book`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
          .send(createModel)
          .expect(response => {
            setTestData(response.body.Data.id, 'AppointmentId_1');
          })
          .expect(201, done);

           //cancel appointment
          agent
          .get(`/api/v1/appointments/cancel/${getTestData("AppointmentId_1")}`)
          .set('Content-Type', 'application/json')
          .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
          .expect(response => {
            expect(response.body).to.have.property('Status');
            expect(response.body.Status).to.equal('failure');
      })
  });

});

// // ///////////////////////////////////////////////////////////////////////////

export const loadAppointmentGetModel = async (
  ) => {
      const model = {
        BusinessId: getTestData("BusinessId"),
        BusinessNodeId: getTestData("BusinessNodeId"),
        BusinessServiceId: getTestData("BusinessServiceId"),
      };
      setTestData(model, "AppointmentGetModel");
  }

  function loadAppointmentQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?fromDate=2023-07-18'
    return queryString;
}

export const loadBusinessNodeHourCreateMultipleModel = async (
  Type = faker.lorem.word(),
  Day = faker.number.int({ min: 10 }),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      DayWiseWorkingHours: [
        {
          Day: 1,
          StartTime: "09:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 2,
          StartTime: "09:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 3,
          StartTime: "09:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 4,
          StartTime: "14:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 5,
          StartTime: "16:00:00",
          EndTime: "22:00:00"
        },
        {
          Day: 6,
          StartTime: "16:00:00",
          EndTime: "22:00:00"
        }
      ]
    };
    setTestData(model, "BusinessNodeHourCreateMultipleModel");
}

export const loadBusinessUserHourCreateMultipleModel = async (
  Type = faker.lorem.word(),
  Day = faker.number.int({ min: 10 }),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
	    DayWiseWorkingHours: [
		  {
			  Day: 1,
			  StartTime: "08:00:00",
			  EndTime: "22:00:00"
		  },
		  {
			  Day: 2,
			  IsOpen: false,
			  StartTime: "00:00:00",
			  EndTime: "00:00:00"
		  },
		  {
			  Day: 3,
			  StartTime: "09:00:00",
			  EndTime: "22:00:00"
		  },
		  {
			  Day: 4,
			  StartTime: "14:00:00",
			  EndTime: "22:00:00"
		  },
		  {
			  Day: 5,
			  StartTime: "16:00:00",
			  EndTime: "22:00:00"
		  },
		  {
			  Day: 6,
			  StartTime: "16:00:00",
			  EndTime: "22:00:00"
		  }
	  ]
  };
  setTestData(model, "BusinessUserHourCreateMultipleModel");
}

export const loadAppointmentStatusMultipleModel = async (
  ) => {
    const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        Statuses: [
            {
                Status: "PAID/CONFIRMATION PENDING",
                StatusCode: "1",
                Sequence: 1,
                StatusColor: "#f9d232",
                SendNotification: true,
                NotificationText: "Confirmation is pending. (Payment for appointment is received)",
                SendSms: true,
                SmsText: "Appointment confirmation is pending.",
                IsDashboardStatus: true,
                IsCompletedStatus: false,
                IsCancellationStatus: false,
                IsWalkinEntryStatus: false,
                IsActive: true
            },
            {
                Status: "CONFIRMED",
                StatusCode: "2",
                Sequence: 2,
                StatusColor: "#f9d232",
                SendNotification: true,
                NotificationText: "Confirmed",
                SendSms: true,
                SmsText: "Appointment confirmed.",
                IsDashboardStatus: true,
                IsCompletedStatus: false,
                IsCancellationStatus: false,
                IsWalkinEntryStatus: false,
                IsConfirmedStatus: true
            },
            {
                Status: "IN-PROGRESS",
                StatusCode: "3",
                Sequence: 3,
                StatusColor: "#f9d242",
                SendNotification: false,
                NotificationText: "In progress",
                SendSms: false,
                SmsText: "Appointment in progress.",
                IsDashboardStatus: true,
                IsCompletedStatus: false,
                IsCancellationStatus: false,
                IsWalkinEntryStatus: false
            },
            {
                Status: "COMPLETED",
                StatusCode: "4",
                Sequence: 4,
                StatusColor: "#f9d242",
                SendNotification: false,
                NotificationText: "Completed",
                SendSms: false,
                SmsText: "Appointment is complete.",
                IsDashboardStatus: true,
                IsCompletedStatus: true,
                IsCancellationStatus: false,
                IsWalkinEntryStatus: false
            },
            {
                Status: "CANCELLED",
                StatusCode: "5",
                Sequence: 5,
                StatusColor: "#f9d242",
                SendNotification: false,
                NotificationText: "Cancelled",
                SendSms: false,
                SmsText: "Appointment is Cancelled.",
                IsDashboardStatus: true,
                IsCompletedStatus: false,
                IsCancellationStatus: true,
                IsWalkinEntryStatus: false
            },
            {
                Status: "POSTPONED",
                StatusCode: "6",
                Sequence: 6,
                StatusColor: "#f9d242",
                SendNotification: true,
                NotificationText: "Appointment postponed",
                SendSms: false,
                SmsText: "Appointment is postponed.",
                IsDashboardStatus: true,
                IsCompletedStatus: false,
                IsCancellationStatus: true,
                IsWalkinEntryStatus: false
            },
            {
                Status: "WALK-IN",
                StatusCode: "7",
                Sequence: 7,
                StatusColor: "#f9d242",
                SendNotification: true,
                NotificationText: "Walk-in apppointment started",
                SendSms: false,
                SmsText: "Walk-in apppointment started.",
                IsDashboardStatus: true,
                IsCompletedStatus: false,
                IsCancellationStatus: false
            }
        ]
    }
    setTestData(model, "AppointmentStatusCreateMultipleModel");
    }

  export const loadAppointmentStatusCreateModel = async (
    Status = faker.lorem.word(),
    StatusCode = faker.string.numeric(),
    StatusColor = faker.color.rgb({ format: 'hex', casing: 'lower' }),
    Sequence = faker.number.int(100),
    IsCancellationStatus = faker.datatype.boolean(0.9),
    IsConfirmedStatus = faker.datatype.boolean(0.9),
    SendNotification = faker.datatype.boolean(0.9),
    NotificationText = faker.lorem.text(),
    SendSms = faker.datatype.boolean(0.9),
    SmsText = faker.lorem.words(),
    IsDashboardStatus = faker.datatype.boolean(0.9),
    IsCompletedStatus= faker.datatype.boolean(0.9),
    IsWalkinEntryStatus = faker.datatype.boolean(0.9),
    IsActive = faker.datatype.boolean(0.9)
  ) => {
      const model = {
        BusinessNodeId: getTestData("BusinessNodeId"),
        Status: "PAID/CONFIRMATION PENDING",
        StatusCode:  StatusCode,
        StatusColor:  StatusColor,
        Sequence:  Sequence,
        IsCancellationStatus: true,
        IsConfirmedStatus: false,
        SendNotification:  true,
        NotificationText: NotificationText,
        SendSms:  true,
        SmsText: SmsText,
        IsDashboardStatus: true,
        IsCompletedStatus: true,
        IsWalkinEntryStatus: true,
        IsActive: true
      };
      setTestData(model, "AppointmentStatusCreateModel");
  }

  export const loadAppointmentBookCreateModel = async (
    ) => {
        const model = {
          BusinessNodeId: getTestData("BusinessNodeId"),
          CustomerId: getTestData("CustomerId"),
          BusinessUserId: getTestData("BusinessUserId"),
          BusinessServiceId: getTestData("BusinessServiceId"),
          StartTime:  "2023-07-26T14:30:00Z",
          EndTime: "2023-07-26T15:00:00Z",
          Type: "IN-PERSON",
          Note: "This is doctor appointment note",
          StatusCode: "1",
          Fees: 300,
          Tax:10,
          Tip: 0,
          Discount: 0,
          Total: 330,
          IsPaid: true
        };
        setTestData(model, "AppointmentBookCreateModel");
    }