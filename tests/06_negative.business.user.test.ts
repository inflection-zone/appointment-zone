import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business user negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business user negative test', function(done) {
        loadBusinessUserCreateModel();
        const createModel = getTestData("BusinessUserCreateModel");
        agent
            .post(`/api/v1/business-user/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });

    it('Get business user by id negative test', function(done) {
        const id = `${getTestData("BusinessUserId")}`
        agent
            .get(`/api/v1/business-users/${getTestData("BusinessUsersId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Update business user negative test', function(done) {
        loadBusinessUserUpdateModel();
        const updateModel = getTestData("BusinessUserUpdateModel");
        const id = `${getTestData("BusinessUserId")}`
        agent
            .put(`/api/v1/business-users/${getTestData("BusinessUserId")}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(401, done);
    });

    it('Delete business user negative test', function(done) {
        const id = `${getTestData("BusinessUserId")}`

        //Delete
        agent
            .delete(`/api/v1/business-users/${getTestData("BusinessUserId")}`)
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

export const loadBusinessUserCreateModel = async (
 
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Prefix = faker.person.prefix(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Dob = faker.lorem.words(),
  Gender = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  AboutMe = faker.lorem.words(),
  Qualification = faker.lorem.words(),
  Experience = faker.location.streetAddress(),
  IsAvailableForEmergency = faker.datatype.boolean(),
  Facebook = faker.image.url(),
  Linkedin = faker.lorem.word(),
  Twitter = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      FirstName: FirstName,
      LastName: LastName,
      Prefix: Prefix,
      Mobile: Mobile,
      Email: Email,
      Dob: '2023-01-01T12:12:12.000Z',
      Gender: 'Male',
      DisplayPicture: DisplayPicture,
      AboutMe: AboutMe,
      Qualification: Qualification,
      Experience: '24 years',
      IsAvailableForEmergency: true,
      Facebook: Facebook,
      Linkedin: Linkedin,
      Twitter: Twitter,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
    };

    setTestData(model, "BusinessUserCreateModel");
}

export const loadBusinessUserUpdateModel = async (
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Prefix = faker.person.prefix(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Dob = faker.lorem.words(),
  Gender = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  AboutMe = faker.lorem.words(),
  Qualification = faker.lorem.words(),
  Experience = faker.location.streetAddress(),
  IsAvailableForEmergency = faker.datatype.boolean(),
  Facebook = faker.image.url(),
  Linkedin = faker.lorem.word(),
  Twitter = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      FirstName: FirstName,
      LastName: LastName,
      Prefix: Prefix,
      Mobile: Mobile,
      Email: Email,
      Dob: '2023-01-01T12:12:12.000Z',
      Gender: 'Male',
      DisplayPicture: DisplayPicture,
      AboutMe: AboutMe,
      Qualification: Qualification,
      Experience: '24 years',
      IsAvailableForEmergency: true,
      Facebook: Facebook,
      Linkedin: Linkedin,
      Twitter: Twitter,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
      };
      setTestData(model, "BusinessUserUpdateModel"); 
}

function loadBusinessUserQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
