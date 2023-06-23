import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business user skill negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user skill negative test', function(done) {
        loadBusinessUserSkillCreateModel();
        const createModel = getTestData("BusinessUserSkillCreateModel");
        agent
            .post(`/api/v1/business-user-skill/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get business user skill by id negative test', function(done) {
        const id = `${getTestData("BusinessUserSkillId")}`
        agent
            .get(`/api/v1/business-user-skill/${getTestData("BusinessUserSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Search business user skill records negative test', function(done) {
      loadBusinessUserSkillQueryString();
        agent
            .get(`/api/v1/business-user-skills/search${loadBusinessUserSkillQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Update business user skill negative test', function(done) {
        loadBusinessUserSkillUpdateModel();
        const updateModel = getTestData("BusinessUserSkillUpdateModel");
        const id = `${getTestData("BusinessUserSkillId")}`
        agent
            .put(`/api/v1/business-user-skill/${getTestData("BusinessUserSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(404, done);
    });

    it('Delete business user skill negative test', function(done) {
        const id = `${getTestData("BusinessUserSkillId")}`

        //Delete
        agent
            .delete(`/api/v1/business-user-skills/${getTestData("BusinessUserSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('failure');
            })
            .expect(401, done);
    });

    it('Create business user skill again negative test', function(done) {
      loadBusinessUserSkillCreateModel();
      const createModel = getTestData("BusinessUserSkillCreateModel");
      agent
          .post(`/api/v1/business-user-skill/`)
          .set('Content-Type', 'application/json')
          .send(createModel)
          .expect(404, done);
  });

});

///////////////////////////////////////////////////////////////////////////

export const loadBusinessUserSkillCreateModel = async (
  IsActive = faker.datatype.boolean(0.9),
) => {
    const model = {
      BusinessSkillId: getTestData("BusinessSkillId"),
      BusinessUserId: getTestData("BusinessUserId"),
      IsActive: true
    };
    setTestData(model, "BusinessUserSkillCreateModel");
}

export const loadBusinessUserSkillUpdateModel = async (
  IsActive = faker.datatype.boolean(),
  ) => {
      const model = {
        BusinessSkillId: getTestData("BusinessSkillId"),
        BusinessUserId: getTestData("BusinessUserId"),
        IsActive: true
  };
  setTestData(model, "BusinessUserSkillUpdateModel");
}

function loadBusinessUserSkillQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
