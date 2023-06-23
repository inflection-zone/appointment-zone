import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance()

///////////////////////////////////////////////////////////////////////////

describe('Business service negative tests', function() {

    var agent = request.agent(infra._app);

    it('Create business service negative test', function(done) {
        loadBusinessServiceCreateModel();
        const createModel = getTestData("BusinessServiceCreateModel");
        agent
            .post(`/api/v1/business-service/`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect(404, done);
    });


    it('Search business service records negative test', function(done) {
      loadBusinessServiceQueryString();
        agent
            .get(`/api/v1/business-services/search${loadBusinessServiceQueryString()}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .expect(401, done);
    });

    it('Update business service negative test', function(done) {
        loadBusinessServiceUpdateModel();
        const updateModel = getTestData("BusinessServiceUpdateModel");
        const id = `${getTestData("BusinessServiceId")}`
        agent
            .put(`/api/v1/business-services/${getTestData("BusinessServicesId")}`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
            .send(updateModel)
            .expect(404, done);
    });

    it('Delete business service negative test', function(done) {
        const id = `${getTestData("BusinessServiceId")}`

        //Delete
        agent
            .delete(`/api/v1/business-services/${getTestData("BusinessServiceId")}`)
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

export const loadBusinessServiceCreateModel = async (
  Name = faker.person.fullName(),
  Description = faker.commerce.productDescription(),
  ServiceDuration = faker.string.numeric(),
  Fees = faker.number.float({ precision: 0.2 }),
  IsTaxable = faker.string.numeric(),
  TaxRate = faker.number.float({ precision: 0.99 }),
  PaymentRequired = faker.string.numeric(),
  PaymentPercent = faker.number.int({ min: 1, max: 255 }),
  PriorBookingWindow = faker.string.numeric(),
  SendReminder = faker.string.numeric(),
  ReminderWindow = faker.string.numeric(),
  ReminderType = faker.lorem.word(),
  AllowCancellation = faker.string.numeric(),
  CancellationWindow = faker.string.numeric(),
  CancellationCharges = faker.number.float({ precision: 20.0 }),
  EnableLoyalty = faker.string.numeric(),
  DisplayServicePicture = faker.image.url(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: global.TestCache.BusinessNodeId,
      Name: Name,
      Description: Description,
      ServiceDuration: ServiceDuration,
      Fees: Fees,
      IsTaxable: true,
      TaxRate: TaxRate,
      PaymentRequired: true,
      PaymentPercent: PaymentPercent,
      PriorBookingWindow: PriorBookingWindow,
      SendReminder: true,
      ReminderWindow: ReminderWindow,
      ReminderType: ReminderType,
      AllowCancellation: true,
      CancellationWindow: CancellationWindow,
      CancellationCharges: CancellationCharges,
      EnableLoyalty: true,
      DisplayServicePicture: DisplayServicePicture,
      IsActive: true
    };
    setTestData(model, "BusinessServiceCreateModel");
}

export const loadBusinessServiceUpdateModel = async (
  Name = faker.person.fullName(),
  Description = faker.commerce.productDescription(),
  ServiceDuration = faker.string.numeric(),
  Fees = faker.number.float({ precision: 0.2 }),
  IsTaxable = faker.string.numeric(),
  TaxRate = faker.number.float({ precision: 0.99 }),
  PaymentRequired = faker.string.numeric(),
  PaymentPercent = faker.number.int({ min: 1, max: 255 }),
  PriorBookingWindow = faker.string.numeric(),
  SendReminder = faker.string.numeric(),
  ReminderWindow = faker.string.numeric(),
  ReminderType = faker.lorem.word(),
  AllowCancellation = faker.string.numeric(),
  CancellationWindow = faker.string.numeric(),
  CancellationCharges = faker.number.float({ precision: 20.0 }),
  EnableLoyalty = faker.string.numeric(),
  DisplayServicePicture = faker.image.url(),
  IsActive = faker.datatype.boolean(),
  ) => {
    const model = {
      BusinessNodeId: global.TestCache.BusinessNodeId,
      Name: Name,
      Description: Description,
      ServiceDuration: ServiceDuration,
      Fees: Fees,
      IsTaxable: true,
      TaxRate: TaxRate,
      PaymentRequired: true,
      PaymentPercent: PaymentPercent,
      PriorBookingWindow: PriorBookingWindow,
      SendReminder: true,
      ReminderWindow: ReminderWindow,
      ReminderType: ReminderType,
      AllowCancellation: true,
      CancellationWindow: CancellationWindow,
      CancellationCharges: CancellationCharges,
      EnableLoyalty: true,
      DisplayServicePicture: DisplayServicePicture,
      IsActive: true
};
    global.TestCache.BusinessServiceUpdateModel = model;
}

function loadBusinessServiceQueryString() {
    //This is raw query. Please modify to suit the test
    //const queryString = '?isActive=true'
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
