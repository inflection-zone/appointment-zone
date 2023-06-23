import request from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business node negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business node negative test', function(done) {
        loadBusinessNodeCreateModel();
        const createModel = getTestData("BusinessNodeCreateModel");
        agent
            .post(`/api/v1/business-node/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(404, done);
    });

    it('Search business node records negative test', function(done) {
      loadBusinessNodeQueryString();
        agent
            .get(`/api/v1/business-node/search${loadBusinessNodeQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${global.TestCache.AdminJwt}`)
            .expect(404, done);
    });

    it('Update business node negative test', function(done) {
        loadBusinessNodeUpdateModel();
        const updateModel = getTestData("BusinessNodeUpdateModel");
        const id = `${getTestData("BusinessNodeId")}`
        agent
            .put(`/api/v1/business-nodes/${getTestData("BusinessNodeId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(401, done);
    });

    it('Delete business node negative test', function(done) {
        const id = `${getTestData("BusinessNodeId")}`

        //Delete
        agent
            .delete(`/api/v1/business-nodes/${getTestData("BusinessNodeId")}`)
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

export const loadBusinessNodeCreateModel = async (
  Name = faker.person.fullName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  Longitude = faker.string.numeric(),
  OverallRating = faker.number.float(),
  AllowWalkinAppointments = faker.datatype.boolean(),
  AllowFutureBookingFor = faker.string.numeric(),
  IsActive = faker.datatype.boolean(), 
) => {
    const model = {
      BusinessId: getTestData("BusinessId"),
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      DisplayPicture: DisplayPicture,
      Address: Address,
      Longitude: Longitude,
      OverallRating: 3.5,
      AllowWalkinAppointments: true,
      AllowFutureBookingFor: AllowFutureBookingFor,
      IsActive: true
    };
    setTestData(model, "BusinessNodeCreateModel");
}

export const loadBusinessNodeUpdateModel = async (
  Name = faker.person.fullName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  Longitude = faker.string.numeric(),
  OverallRating = faker.number.float(),
  AllowWalkinAppointments = faker.datatype.boolean(),
  AllowFutureBookingFor = faker.string.numeric(),
  IsActive = faker.datatype.boolean(), 
) => {
    const model = {
      BusinessId: getTestData("BusinessId"),
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      DisplayPicture: DisplayPicture,
      Address: Address,
      Longitude: Longitude,
      OverallRating: 3.5,
      AllowWalkinAppointments: true,
      AllowFutureBookingFor: AllowFutureBookingFor,
      IsActive: true
};
    global.TestCache.BusinessNodeUpdateModel = model;
}

function loadBusinessNodeQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
