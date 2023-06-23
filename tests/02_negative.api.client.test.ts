import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Api client negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create api client negative test', function(done) {
        loadApiClientCreateModel();
        const createModel = getTestData("ApiClientCreateModel");
        agent
            .post(`/api/v1/api_client/`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(createModel)          
            .expect(404, done);
    });

    it('Get api client by id negative test', function(done) {
        const id = `${getTestData('ApiClientId')}`
        agent
            .get(`/api/v1/api_clients/${getTestData('ApiClientsId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Search api client records negative test', function(done) {
      loadApiClientQueryString();
        agent
            .get(`/api/v1/api_client/Search${loadApiClientQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(404, done);
    });

    it('Update api client negative test', function(done) {
        loadApiClientUpdateModel();
        const updateModel = getTestData("ApiClientUpdateModel");
        const id = `${getTestData('ApiClientId')}`
        agent
            .put(`/api/v1/api_clients/${getTestData('ApiClientsId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(404, done);
    });

    it('Delete api client', function(done) {
        const id = `${getTestData('ApiClientId')}`
        
        //Delete
        agent
            .delete(`/api/v1/api_clients/${getTestData('ApiClientId')}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(response => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Delete api client negative test', function(done) {
      agent
      .get(`/api/v1/api_clients/${getTestData('ApiClientId')}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
      .expect(404, done);
  })

});

///////////////////////////////////////////////////////////////////////////

export const loadApiClientCreateModel = async (
        ClientName = faker.person.fullName(), 
        clientInterfaceType = faker.system.fileType(),
        CountryCode = faker.phone.number('+91'),
        Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
        Email = faker.internet.email(),
        IsPrivileged = faker.datatype.boolean(),
        Password = faker.internet.password(),
       ) => {
        const model = {       
            ClientName: ClientName,
            ClientInterfaceType: "Web App",
            CountryCode: CountryCode,
            Phone: Phone,
            Email: Email,
            IsPrivileged: IsPrivileged,
            Password : Password
    };
    setTestData(model, "ApiClientCreateModel");
}

export const loadApiClientUpdateModel = async (
    ClientName = faker.person.fullName(), 
    clientInterfaceType = faker.system.fileType(),
    CountryCode = faker.phone.number('+91'),
    Phone = faker.string.numeric({ length: { min: 10, max: 10 } }),
    Email = faker.internet.email(),
    IsPrivileged = faker.datatype.boolean(),
    Password = faker.internet.password(),
   ) => {
    const model = {       
        ClientName: ClientName,
        ClientInterfaceType: "Web App",
        CountryCode: CountryCode,
        Phone: Phone,
        Email: Email,
        IsPrivileged: IsPrivileged,
        Password : Password
    };
    setTestData(model, "ApiClientUpdateModel");
}

function loadApiClientQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
