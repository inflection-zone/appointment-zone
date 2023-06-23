import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business negative test', function(done) {
        loadBusinessCreateModel();
        const createModel = getTestData("BusinessCreateModel");
        agent
            .post(`/api/v1/businesse/`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(404, done);
    });

    it('Get business by id negative test', function(done) {
        const id = `${getTestData("BusinessId")}`
        agent
            .get(`/api/v1/businesses/${getTestData("BusinessesId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Search business records negative test', function(done) {
      loadBusinessQueryString();
        agent
            .get(`/api/v1/businesses/search${loadBusinessQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Delete business negative test', function(done) {
        const id = `${getTestData("BusinessId")}`

        //Delete
        agent
            .delete(`/api/v1/businesses/${getTestData("BusinessId")}`)
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

export const loadBusinessCreateModel = async (
  ExternalId = faker.string.numeric({ length: { min: 1, max: 10 } }),
  Name = faker.person.fullName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  AboutUs = faker.lorem.words(),
  Logo = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  OverallRating = faker.number.float(),
  Facebook = faker.image.url(),
  Twitter = faker.lorem.word(),
  Linkedin = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      ExternalId: "1",
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      AboutUs: AboutUs,
      ApiKey: 'T26BP24-MRGMRYE-JB352V-NC93PY0',
      Logo: Logo,
      DisplayPicture: DisplayPicture,
      Address: Address,
      OverallRating: 0.3,
      Facebook: Facebook,
      Twitter: Twitter,
      Linkedin: Linkedin,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
    };
    setTestData(model, "BusinessCreateModel");
}

export const loadBusinessUpdateModel = async (
  ExternalId = faker.string.numeric({ length: { min: 1, max: 10 } }),
  Name = faker.person.fullName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  AboutUs = faker.lorem.words(),
  Logo = faker.commerce.productName(),
  DisplayPicture = faker.image.url(),
  Address = faker.location.streetAddress(),
  OverallRating = faker.number.float(),
  Facebook = faker.image.url(),
  Twitter = faker.lorem.word(),
  Linkedin = faker.lorem.word(),
  Instagram = faker.lorem.word(),
  Yelp = faker.lorem.word(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      ExternalId: "1",
      Name: Name,
      Mobile: Mobile,
      Email: Email,
      AboutUs: AboutUs,
      Logo: Logo,
      DisplayPicture: DisplayPicture,
      Address: Address,
      Facebook: Facebook,
      Twitter: Twitter,
      Linkedin: Linkedin,
      Instagram: Instagram,
      Yelp: Yelp,
      IsActive: true
      };
      setTestData(model, "BusinessUpdateModel");
 
}

function loadBusinessQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
