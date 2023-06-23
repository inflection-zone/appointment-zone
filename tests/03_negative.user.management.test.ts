import request from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

// ///////////////////////////////////////////////////////////////////////////

describe('User negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create user negative test', function(done) {
        loadUserManagementCreateModel();
        const createModel = getTestData("UserManagementCreateModel");
        agent
            .post(`/api/v1/user/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)
            .expect(404, done);
    });

    it('Get user by id negative test', function(done) {
        const id = `${getTestData("UserManagementId")}`
        agent
            .get(`/api/v1/users/${getTestData('UserManagementsId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Search user records negative test', function(done) {
      loadUserManagementQueryString();
        agent
            .get(`/api/v1/user/search${loadUserManagementQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Delete user negative test', function(done) {
      agent
      .get(`/api/v1/user/${getTestData('UserManagementId')}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
      .expect(404, done);
  })


});

// ///////////////////////////////////////////////////////////////////////////

export const loadUserManagementCreateModel = async (
    UserName = faker.lorem.word(),
    Prefix = faker.person.prefix(),
    FirstName = faker.person.firstName(),
    LastName = faker.person.lastName(),
    CountryCode = faker.phone.number('+91'),
    Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
    Email = faker.internet.email(),
    Gender = faker.person.gender(),
    BirthDate = faker.date.birthdate(),
    Password = faker.internet.password(),
) => {
    const model = {
      UserName: UserName,
      Prefix: Prefix,
      FirstName: FirstName,
      LastName: LastName,
      CountryCode: CountryCode,
      Phone: Phone,
      Email: Email,
      Gender: "Male",
      BirthDate: "1970-01-01T00:00:00.000Z",
      Password: Password     
    };
    setTestData(model, "UserManagementCreateModel");
}

export const loadUserManagementUpdateModel = async (
  UserName = faker.lorem.word(),
  Prefix = faker.person.prefix(),
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  CountryCode = faker.phone.number('+91'),
  Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Gender = faker.person.gender(),
  BirthDate = faker.date.birthdate(),
  Password = faker.internet.password(),
) => {
  const model = {
    UserName: UserName,
    Prefix: Prefix,
    FirstName: FirstName,
    LastName: LastName,
    CountryCode: CountryCode,
    Email: Email,
    Gender: "Male",
    BirthDate: "1970-01-01T00:00:00.000Z",
    Password: Password           
  };
  setTestData(model, "UserManagementUpdateModel");
}

function loadUserManagementQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

// ///////////////////////////////////////////////////////////////////////////
