import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()


///////////////////////////////////////////////////////////////////////////

describe('Business user hour negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user hour negative test', function(done) {
        loadBusinessUserHourCreateModel();
        const createModel = getTestData("BusinessUserHourCreateModel");
        agent
            .post(`/api/v1/business-user-hour/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get business user hour by id negative test', function(done) {
        const id = `${getTestData("BusinessUserHourId")}`
        agent
            .get(`/api/v1/business-user-hours/${getTestData("BusinessUserHourId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Search business user hour records negative test', function(done) {
      loadBusinessUserHourQueryString();
        agent
            .get(`/api/v1/business-user-hour/search${loadBusinessUserHourQueryString()}`)
            .set('Content-Type', 'application/json')
             .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Delete business user hour negative test', function(done) {
        const id = `${getTestData("BusinessUserHourId")}`

        //Delete
        agent
            .delete(`/api/v1/business-user-hours/${getTestData("BusinessUserHourId")}`)
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

export const loadBusinessUserHourCreateModel = async (
  Type = faker.lorem.word(),
  Day = faker.number.int({ min: 10 }),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
      Type: Type,
      Day: 6,
      Date: '2020-07-15T16:43:41.000Z',
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
      IsActive: true,
    };
    setTestData(model, "BusinessUserHourCreateModel");
}

export const loadBusinessUserHourUpdateModel = (
  Type = faker.lorem.word(),
  Day = faker.number.int(),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
      Type: Type,
      Day: 6,
      Date: '2020-07-15T16:43:41.000Z',
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
      IsActive: true,
  };
  setTestData(model, "BusinessUserHourUpdateModel");    
}

function loadBusinessUserHourQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
