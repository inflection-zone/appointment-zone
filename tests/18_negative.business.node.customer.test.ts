import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Business node customer negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business node customer negative test', function(done) {
        loadBusinessNodeCustomerCreateModel();
        const createModel = getTestData("BusinessNodeCustomerCreateModel");
        agent
            .post(`/api/v1/business-node-customer/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get business node customer by id negative test', function(done) {
        const id = `${getTestData("BusinessNodeCustomerId")}`
        agent
            .get(`/api/v1/business-node-customers/${getTestData("BusinessNodeCustomerId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Search business node customer records negative test', function(done) {
      loadBusinessNodeCustomerQueryString();
        agent
            .get(`/api/v1/business-node-customer/search${loadBusinessNodeCustomerQueryString()}`)
            .set('Content-Type', 'application/json')
             .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Delete business node customer negative test', function(done) {
        const id = `${getTestData("BusinessNodeCustomerId")}`

        //Delete
        agent
            .delete(`/api/v1/business-node-customers/${getTestData("BusinessNodeCustomerId")}`)
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

export const loadBusinessNodeCustomerCreateModel = async (
  SmsConsent = faker.lorem.word()
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId : getTestData("CustomerId"),
      SmsConsent: SmsConsent,
      IsActive: true
    };
    setTestData(model, "BusinessNodeCustomerCreateModel");
}

export const loadBusinessNodeCustomerUpdateModel = async (
 SmsConsent = faker.lorem.word()
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId : getTestData("CustomerId"),
      SmsConsent: SmsConsent,
      IsActive: true
  };
  setTestData(model, "BusinessNodeCustomerUpdateModel");
}

function loadBusinessNodeCustomerQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?businessNodeId=05b3749b-4160-4cf4-8b48-438d11ec9de1&customerId=ef130f8d-6efc-48b6-b5fc-a639aa924f75&isActive=true'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
