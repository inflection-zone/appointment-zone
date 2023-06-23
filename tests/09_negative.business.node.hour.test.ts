import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()


///////////////////////////////////////////////////////////////////////////

describe('Business node hour negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business node hour negative test', function(done) {
        loadBusinessNodeHourCreateModel();
        const createModel = getTestData("BusinessNodeHourCreateModel");
        agent
            .post(`/api/v1/business-node-hour/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get business node hour by id negative test', function(done) {
        const id = `${getTestData("BusinessNodeHourId")}`
        agent
            .get(`/api/v1/business-node-hour/${getTestData("BusinessNodeHourId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Update business node hour negative test', function(done) {
        loadBusinessNodeHourUpdateModel();
        const updateModel = getTestData("BusinessNodeHourUpdateModel");
        const id = `${getTestData("BusinessNodeHourId")}`
        agent
            .put(`/api/v1/business-node-hours/${getTestData("BusinessNodeHourId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(401, done);
    });

    it('Delete business node hour negative test', function(done) {
        const id = `${getTestData("BusinessNodeHourId")}`

        //Delete
        agent
            .delete(`/api/v1/business-node-hours/${getTestData("BusinessNodeHourId")}`)
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

export const loadBusinessNodeHourCreateModel = async (
  Type = faker.lorem.word(),
  Day = faker.number.int({ min: 10 }),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      Type: Type,
      Day: 6,
      Date: '2020-07-15T16:43:41.000Z',
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
      IsActive: true,
      IsDeleted: false
    };
    setTestData(model, "BusinessNodeHourCreateModel");
}

export const loadBusinessNodeHourUpdateModel = (
  Type = faker.lorem.word(),
  Day = faker.number.int(),
  Message = faker.lorem.word(),
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      Type: Type,
      Day: 6,
      Date: '2020-07-15T16:43:41.000Z',
      IsOpen: true,
      Message: Message,
      StartTime: '09:00:00',
      EndTime: '22:00:00',
      IsActive: true,
      IsDeleted: false
  };
  setTestData(model, "BusinessNodeHourUpdateModel");    
}

function loadBusinessNodeHourQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
