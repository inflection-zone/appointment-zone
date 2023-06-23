import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()


///////////////////////////////////////////////////////////////////////////

describe('Business user service negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user service negative test', function(done) {
        loadBusinessUserServiceCreateModel();
        const createModel = getTestData("BusinessUserServiceCreateModel");
        agent
            .post(`/api/v1/business-user-service/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get business user service by id negative test', function(done) {
        const id = `${getTestData("BusinessUserServiceId")}`
        agent
            .get(`/api/v1/business-user-services/${getTestData("BusinessUserServiceId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Search business user service records negative test', function(done) {
      loadBusinessUserServiceQueryString();
        agent
            .get(`/api/v1/business-user-service/search${loadBusinessUserServiceQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Delete business user service negative test', function(done) {
        const id = `${getTestData("BusinessUserServiceId")}`

        //Delete
        agent
            .delete(`/api/v1/business-user-services/${getTestData("BusinessUserServiceId")}`)
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

export const loadBusinessUserServiceCreateModel = async (
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessUserId : getTestData("BusinessUserId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
      IsActive: true
    };
    setTestData(model, "BusinessUserServiceCreateModel");
}

export const loadBusinessUserServiceUpdateModel = async ( 
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessUserId : getTestData("BusinessUserId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
      IsActive: true
  };
  setTestData(model, "BusinessUserServiceUpdateModel");
}

function loadBusinessUserServiceQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
