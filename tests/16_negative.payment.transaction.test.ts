import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Payment transaction negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create payment transaction negative test', function(done) {
        loadPaymentTransactionCreateModel();
        const createModel = getTestData("PaymentTransactionCreateModel");
        agent
            .post(`/api/v1/payment-transaction/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Search payment transaction records negative test', function(done) {
      loadPaymentTransactionQueryString();
        agent
            .get(`/api/v1/payment-transaction/search${loadPaymentTransactionQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Update payment transaction negative test', function(done) {
        loadPaymentTransactionUpdateModel();
        const updateModel = getTestData("PaymentTransactionUpdateModel");
        const id = `${getTestData("PaymentTransactionId")}`
        agent
            .put(`/api/v1/payment-transactions/${getTestData("PaymentTransactionId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(401, done);
    });

    it('Delete payment transaction negative test', function(done) {
        const id = `${getTestData("PaymentTransactionId")}`

        //Delete
        agent
            .delete(`/api/v1/payment-transactions/${getTestData("PaymentTransactionId")}`)
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

export const loadPaymentTransactionCreateModel = async (
  TotalAmount = faker.finance.amount(),
  ExternalId = faker.string.numeric(),
  Currency = faker.finance.currencyCode(),
  Status = faker.lorem.word(),
  IsComplete = faker.datatype.boolean(0.9),
  IsActive = faker.datatype.boolean(0.9)
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      TotalAmount: 300.0,
      ExternalId: ExternalId,
      Currency: Currency,
      Status: Status,
      IsComplete: true,
      InitiatedOn: '2020-07-12T03:19:34.000Z',
      CompletedOn: '2020-09-12T03:19:34.000Z',
      IsActive: true
    };
    setTestData(model, "PaymentTransactionCreateModel");
}

export const loadPaymentTransactionUpdateModel = async (
  TotalAmount = faker.finance.amount(),
  ExternalId = faker.string.numeric(),
  Currency = faker.finance.currencyCode(),
  Status = faker.lorem.word(),
  IsComplete = faker.datatype.boolean(0.9),
  IsActive = faker.datatype.boolean(0.9)
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      TotalAmount: 300.0,
      ExternalId: ExternalId,
      Currency: Currency,
      Status: Status,
      IsComplete: true,
      InitiatedOn: '2020-07-12T03:19:34.000Z',
      CompletedOn: '2020-09-12T03:19:34.000Z',
      IsActive: true
  };
  setTestData(model, "PaymentTransactionUpdateModel");
}

function loadPaymentTransactionQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?businessNodeId=d73ebeb6-c4f6-4a4b-9cc8-9d691de09246&customerId=b802b622-92ae-47d7-a10f-06adba2c6eac'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
