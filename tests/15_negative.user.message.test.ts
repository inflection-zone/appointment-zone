import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('User message negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create user message negative test', function(done) {
        loadUserMessageCreateModel();
        const createModel = getTestData("UserMessageCreateModel");
        agent
            .post(`/api/v1/user-message/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get user message by id negative test', function(done) {
        const id = `${getTestData("UserMessageId")}`
        agent
            .get(`/api/v1/user-message/${getTestData("UserMessageId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Update user message negative test', function(done) {
        loadUserMessageUpdateModel();
        const updateModel = getTestData("UserMessageUpdateModel");
        const id = `${getTestData("UserMessageId")}`
        agent
            .put(`/api/v1/user-message/${getTestData("UserMessageId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(404, done);
    });

    it('Delete user message negative test', function(done) {
        const id = `${getTestData("UserMessageId")}`

        //Delete
        agent
            .delete(`/api/v1/user-messages/${getTestData("UserMessageId")}`)
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

export const loadUserMessageCreateModel = async (
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  TypeId = faker.number.int(),
  MessageId = faker.string.numeric(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Body: Body,
      Type: Type,
      TypeId: 1,
      MessageId: MessageId,
      IsSent: true,
      IsActive:true
    };
    setTestData(model, "UserMessageCreateModel");
}

export const loadUserMessageUpdateModel = async (
  Body = faker.lorem.words(),
  Type = faker.lorem.word(),
  TypeId = faker.number.int(),
  MessageId = faker.string.numeric(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      Body: Body,
      Type: Type,
      TypeId: 1,
      MessageId: MessageId,
      IsSent: true,
      IsActive:true
  };
  setTestData(model, "UserMessageUpdateModel");
}

function loadUserMessageQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?businessNodeId=d73ebeb6-c4f6-4a4b-9cc8-9d691de09246&customerId=b802b622-92ae-47d7-a10f-06adba2c6eac&isActive=true'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
