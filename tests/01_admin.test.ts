import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Admin tests', function() {
  
  var agent = request.agent(infra._app);

  it('Admin login', function (done) {

    const AdminLoginModel = global.TestCache.AdminLoginModel;
    agent
      .post('/api/v1/users/login-password')
      .set('Content-Type', 'application/json')
      .set('x-api-key', 'ApiKey')
      .send(AdminLoginModel)
      .expect(response => {
        assert.exists(response.body.Data.AccessToken, 'Access token is returned.');
        assert.exists(response.body.Data.User, 'Login user details exist.');
        expect(response.body.Data.User).to.have.property('UserId');
        setTestData(response.body.Data.AccessToken, "AdminJwt")
        setTestData(response.body.Data.User.UserId, "AdminUserId")
      })
      .expect(200, done);

  });
  
});

/////////////////////////////////////////////////////////////////////////////////////////
