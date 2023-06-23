import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Notification negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create notification negative test', function(done) {
        loadNotificationCreateModel();
        const createModel = getTestData("NotificationCreateModel");
        agent
            .post(`/api/v1/notification/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get notification by id negative test', function(done) {
        const id = `${getTestData("NotificationId")}`
        agent
            .get(`/api/v1/notification/${getTestData("NotificationId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Search notification records negative test', function(done) {
      loadNotificationQueryString();
        agent
            .get(`/api/v1/notifications/search${loadNotificationQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Delete notification negative test', function(done) {
        const id = `${getTestData("NotificationId")}`

        //Delete
        agent
            .delete(`/api/v1/notifications/${getTestData("NotificationId")}`)
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

export const loadNotificationCreateModel = async (
  Title = faker.lorem.word(),
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  IsRead = faker.datatype.boolean(0.9),
  Message = faker.lorem.words(),
  IsSent = faker.datatype.boolean(0.9),
  IsActive = faker.datatype.boolean(0.9)
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Title: Title,
      Body: Body,
      Type: Type,
      IsRead: true,
      TypeId: 1,
      Message: Message,
      IsSent: true,
      IsActive: true
    };
    setTestData(model, "NotificationCreateModel");
}

export const loadNotificationUpdateModel = async (
  Title = faker.lorem.word(),
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  Message = faker.lorem.words(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Title: Title,
      Body: Body,
      Type: Type,
      IsRead: true,
      TypeId: 1,
      Message: Message,
      IsSent: true,
      IsActive: true
  };
  setTestData(model, "NotificationUpdateModel");
}

function loadNotificationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?isActive=true&businessNodeId=d73ebeb6-c4f6-4a4b-9cc8-9d691de09246&customerId=f593adf1-8ca6-4ede-849e-19e94b1fb926'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
