import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business skill negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business skill negative test', function(done) {
        loadBusinessSkillCreateModel();
        const createModel = getTestData("BusinessSkillCreateModel");
        agent
            .post(`/api/v1/business-skill/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Search business skill records negative test', function(done) {
      loadBusinessSkillQueryString();
        agent
            .get(`/api/v1/business-skill/search${loadBusinessSkillQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Update business skill negative test', function(done) {
        loadBusinessSkillUpdateModel();
        const updateModel = getTestData("BusinessSkillUpdateModel");
        const id = `${getTestData("BusinessSkillId")}`
        agent
            .put(`/api/v1/business-skills/${getTestData("BusinessSkillId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(401, done);
    });

    it('Delete business skill negative test', function(done) {
        const id = `${getTestData("BusinessSkillId")}`

        //Delete
        agent
            .delete(`/api/v1/business-skills/${getTestData("BusinessSkillId")}`)
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

export const loadBusinessSkillCreateModel = async (
  Name = faker.person.fullName(),
  Description = faker.lorem.words(),
  DisplayPicture = faker.image.url(),
) => {
  const model = {
    BusinessNodeId: getTestData("BusinessNodeId"),
    Name: "some jgjhgj skill",
    Description: "the special skill nobody else has!",
    DisplayPicture: "hcbjb",
    IsActive: true
  };
  setTestData(model, "BusinessSkillCreateModel");
}

export const loadBusinessSkillUpdateModel = async (
  Name = faker.person.fullName(),
  Description = faker.lorem.words(),
  DisplayPicture = faker.image.url(),
) => {
  const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      Name: Name,
      Description: Description,
      DisplayPicture: DisplayPicture,
      IsActive: true
  };
  setTestData(model, "BusinessSkillUpdateModel");
}

function loadBusinessSkillQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '?isActive=true'
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
