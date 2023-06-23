import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Appointment status negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create appointment status negative test', function(done) {
        loadAppointmentStatusCreateModel();
        const createModel = getTestData("AppointmentStatusCreateModel");
        agent
            .post(`/api/v1/appointment-statuse/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Search appointment status records negative test', function(done) {
      loadAppointmentStatusQueryString();
        agent
            .get(`/api/v1/appointment-statuses/search${loadAppointmentStatusQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Update appointment status negative test', function(done) {
        loadAppointmentStatusUpdateModel();
        const updateModel = getTestData("AppointmentStatusUpdateModel");
        const id = `${getTestData("AppointmentStatusId")}`
        agent
            .put(`/api/v1/appointment-statuses/${getTestData("AppointmentStatusId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(401, done);
    });

    it('Delete appointment status negative test', function(done) {
        const id = `${getTestData("AppointmentStatusId")}`

        //Delete
        agent
            .delete(`/api/v1/appointment-statuses/${getTestData("AppointmentStatusId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('failure');
            })
            .expect(401, done);
    });

});

///////////////////////////////////////////////////////////////////////////

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
      Status: Status,
      StatusCode:  StatusCode,
      StatusColor:  StatusColor,
      Sequence:  Sequence,
      IsCancellationStatus: true,
      IsConfirmedStatus: true,
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

export const loadAppointmentStatusUpdateModel = async (
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
      Status: Status,
      StatusCode:  StatusCode,
      StatusColor:  StatusColor,
      Sequence:  Sequence,
      IsCancellationStatus: true,
      IsConfirmedStatus: true,
      SendNotification:  true,
      NotificationText: NotificationText,
      SendSms:  true,
      SmsText: SmsText,
      IsDashboardStatus: true,
      IsCompletedStatus: true,
      IsWalkinEntryStatus: true,
      IsActive: true
  };
  setTestData(model, "AppointmentStatusUpdateModel");
}

function loadAppointmentStatusQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
