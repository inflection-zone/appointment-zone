import  request  from 'supertest';
import * as grpc from '@grpc/grpc-js';
import{ expect, should, assert } from 'chai';
import { 
    CustomerCreateModel,
    CustomerCreateResponse,
    CustomerGetByIdModel,
    CustomerGetByIdResponse,
    CustomerUpdateModel,
    CustomerUpdateResponse,
    CustomerDeleteModel,
    CustomerDeleteResponse,
    CustomerSearchModel,
    CustomerSearchResponse
   } from '../appointment/customer/proto/customer_pb';
import { CustomersClient } from '../appointment/customer/proto/customer_grpc_pb';
import { CustomersServiceClient } from '../appointment/customer/proto/customer_grpc_pb';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';
import { GrpcApplication } from '../appointment/server/grpc.app';

const infra = GrpcApplication.instance()

///////////////////////////////////////////////////////////////////////////

describe('Customer tests', function() {
    
    // const client = request.agent(infra._app);
    
    const client = new CustomersClient('localhost:50051', grpc.credentials.createInsecure());
    // const client = new CustomersClient(infra);
    // const grpcClient = new CustomersClient(infra);

    it('Create customer', async function (done) {
        loadCustomerCreateModel();
        const createModel = getTestData("CustomerCreateModel");
        const request = new CustomerCreateModel();
        request.setId(createModel.id, 'CustomerId');
        request.setPrefix(createModel.Prefix);
        request.setFirstname(createModel.FirstName);
        request.setLastname(createModel.LastName);
        request.setMobile(createModel.Mobile);
        request.setEmail(createModel.Email);
        request.setGender(createModel.Gender);
        request.setDisplaypicture(createModel.DisplayPicture);
        request.setAddress(createModel.Address);
        request.setInappuser(createModel.InAppUser);
        request.setIsactive(createModel.IsActive);

        client.createCustomer(request, (error, response) => {
            expect(error).to.be.null;
            expect(response).to.be.instanceOf(CustomerCreateResponse);
            expect(response.getId()).to.not.be.null;
            expect(response.getPrefix()).to.equal(createModel.Prefix);
            expect(response.getPrefix()).to.equal(createModel.FirstName);
        });
        done();
        
    });

    // it('Get customer by id', function(done) {
    //     const id = `${getTestData("CustomerId")}`
    //     agent
    //         .get(`/api/v1/customers/${getTestData("CustomerId")}`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
    //         .expect(response => {
    //             expect(response.body.Data).to.have.property('id');
    //             expect(response.body.Data).to.have.property('Prefix');
    //             expect(response.body.Data).to.have.property('FirstName');
    //             expect(response.body.Data).to.have.property('LastName');
    //             expect(response.body.Data).to.have.property('Mobile');
    //             expect(response.body.Data).to.have.property('Email');
    //             expect(response.body.Data).to.have.property('Gender');
    //             expect(response.body.Data).to.have.property('DisplayPicture');
    //             expect(response.body.Data).to.have.property('BirthDate');
    //             expect(response.body.Data).to.have.property('Address');
    //             expect(response.body.Data).to.have.property('IsActive');
    //             expect(response.body.Data).to.have.property('InAppUser');

    //             expect(response.body.Data.Prefix).to.equal(getTestData("CustomerCreateModel").Prefix);
    //             expect(response.body.Data.FirstName).to.equal(getTestData("CustomerCreateModel").FirstName);
    //             expect(response.body.Data.LastName).to.equal(getTestData("CustomerCreateModel").LastName);
    //             expect(response.body.Data.Mobile).to.equal(getTestData("CustomerCreateModel").Mobile);
    //             expect(response.body.Data.Email).to.equal(getTestData("CustomerCreateModel").Email);
    //             expect(response.body.Data.Gender).to.equal(getTestData("CustomerCreateModel").Gender);
    //             expect(response.body.Data.DisplayPicture).to.equal(getTestData("CustomerCreateModel").DisplayPicture);
    //             expect(response.body.Data.BirthDate).to.equal(getTestData("CustomerCreateModel").BirthDate);
    //             expect(response.body.Data.Address).to.equal(getTestData("CustomerCreateModel").Address);
    //             expect(response.body.Data.IsActive).to.equal(getTestData("CustomerCreateModel").IsActive);
    //             expect(response.body.Data.InAppUser).to.equal(getTestData("CustomerCreateModel").InAppUser);
    //         })
    //         done();
    // });

    // it('Search customer records', function(done) {
    //   loadCustomerQueryString();
    //     agent
    //         .get(`/api/v1/customers/search${loadCustomerQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //           .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
    //             .expect(response => {
    //             expect(response.body.Data).to.have.property('TotalCount');
    //             expect(response.body.Data).to.have.property('RetrievedCount');
    //             expect(response.body.Data).to.have.property('PageIndex');
    //             expect(response.body.Data).to.have.property('ItemsPerPage');
    //             expect(response.body.Data.TotalCount).to.greaterThan(0);
    //             expect(response.body.Data.RetrievedCount).to.greaterThan(0);
    //             expect(response.body.Data.Items.length).to.greaterThan(0);
    //         })
    //         done();
    // });

    // it('Update customer', function(done) {
    //     const request = new CustomerCreateModel();
    //     loadCustomerUpdateModel(request);
    //     const updateModel = global.TestCache.CustomerUpdateModel;
    //     const id = `${getTestData("CustomerId")}`
    //     agent
    //         .put(`/api/v1/customers/${getTestData("CustomerId")}`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
    //         .send(updateModel)
    //         .expect(response => {
    //             expect(response.body.Data).to.have.property('id');
    //             expect(response.body.Data).to.have.property('Prefix');
    //             expect(response.body.Data).to.have.property('LastName');
    //             expect(response.body.Data).to.have.property('Mobile');
    //             expect(response.body.Data).to.have.property('Email');
    //             expect(response.body.Data).to.have.property('Gender');
    //             expect(response.body.Data).to.have.property('DisplayPicture');
    //             expect(response.body.Data).to.have.property('BirthDate');
    //             expect(response.body.Data).to.have.property('Address');
    //             expect(response.body.Data).to.have.property('IsActive');
    //             expect(response.body.Data).to.have.property('InAppUser');

    //             expect(response.body.Data.Prefix).to.equal(getTestData("CustomerUpdateModel").Prefix);
    //             expect(response.body.Data.LastName).to.equal(getTestData("CustomerUpdateModel").LastName);
    //             expect(response.body.Data.Mobile).to.equal(getTestData("CustomerUpdateModel").Mobile);
    //             expect(response.body.Data.Email).to.equal(getTestData("CustomerUpdateModel").Email);
    //             expect(response.body.Data.Gender).to.equal(getTestData("CustomerUpdateModel").Gender);
    //             expect(response.body.Data.DisplayPicture).to.equal(getTestData("CustomerUpdateModel").DisplayPicture);
    //             expect(response.body.Data.BirthDate).to.equal(getTestData("CustomerUpdateModel").BirthDate);
    //             expect(response.body.Data.Address).to.equal(getTestData("CustomerUpdateModel").Address);
    //             expect(response.body.Data.IsActive).to.equal(getTestData("CustomerUpdateModel").IsActive);
    //             expect(response.body.Data.InAppUser).to.equal(getTestData("CustomerUpdateModel").InAppUser);
    //         })
    //         done();
    // });

    // it('Delete customer', function(done) {
    //     const id = `${getTestData("CustomerCreateModel")}`

    //     //Delete
    //     agent
    //         .delete(`/api/v1/customers/${getTestData("CustomerId")}`)
    //         .set('Content-Type', 'application/json')
    //           .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
    //           .expect(response => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })
    //         done();
    // });

    
    // it('Create customer again', function(done) {
    //     loadCustomerCreateModel();
    //     const createModel = getTestData("CustomerCreateModel");
    //     agent
    //         .post(`/api/v1/customers/`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
    //         .send(createModel)
    //         .expect(response => {
    //             setTestData(response.body.Data.id, 'CustomerId')
    //             expect(response.body.Data).to.have.property('id');
    //             expect(response.body.Data).to.have.property('Prefix');
    //             expect(response.body.Data).to.have.property('FirstName');
    //             expect(response.body.Data).to.have.property('LastName');
    //             expect(response.body.Data).to.have.property('Mobile');
    //             expect(response.body.Data).to.have.property('Email');
    //             expect(response.body.Data).to.have.property('Gender');
    //             expect(response.body.Data).to.have.property('DisplayPicture');
    //             expect(response.body.Data).to.have.property('BirthDate');
    //             expect(response.body.Data).to.have.property('Address');
    //             expect(response.body.Data).to.have.property('IsActive');
    //             expect(response.body.Data).to.have.property('InAppUser');        

    //             setTestData(response.body.Data.id, 'CustomerId')

    //             expect(response.body.Data.Prefix).to.equal(getTestData("CustomerCreateModel").Prefix);
    //             expect(response.body.Data.FirstName).to.equal(getTestData("CustomerCreateModel").FirstName);
    //             expect(response.body.Data.LastName).to.equal(getTestData("CustomerCreateModel").LastName);
    //             expect(response.body.Data.Mobile).to.equal(getTestData("CustomerCreateModel").Mobile);
    //             expect(response.body.Data.Email).to.equal(getTestData("CustomerCreateModel").Email);
    //             expect(response.body.Data.Gender).to.equal(getTestData("CustomerCreateModel").Gender);
    //             expect(response.body.Data.DisplayPicture).to.equal(getTestData("CustomerCreateModel").DisplayPicture);
    //             expect(response.body.Data.BirthDate).to.equal(getTestData("CustomerCreateModel").BirthDate);
    //             expect(response.body.Data.Address).to.equal(getTestData("CustomerCreateModel").Address);
    //             expect(response.body.Data.IsActive).to.equal(getTestData("CustomerCreateModel").IsActive);
    //             expect(response.body.Data.InAppUser).to.equal(getTestData("CustomerCreateModel").InAppUser);
 
    //         })
    //         .expect(201, done);
    // });

});

///////////////////////////////////////////////////////////////////////////

export const loadCustomerCreateModel = async (
  Prefix = faker.person.prefix(),
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Gender = faker.person.gender(),
  DisplayPicture = faker.image.url(),
  BirthDate = faker.date.birthdate(),
  Address = faker.location.streetAddress(),
  IsActive = faker.datatype.boolean(),
  InAppUser = faker.datatype.boolean() , 
) => {
    const model = {
      Prefix: Prefix,
      FirstName: FirstName,
      LastName: LastName,
      Mobile: Mobile,
      Email: Email,
      Gender: "Male",
      DisplayPicture: DisplayPicture,
      BirthDate: "2023-06-11T11:59:35.000Z",
      Address: Address,
      IsActive: true,
      InAppUser: true,
    };
    setTestData(model, "CustomerCreateModel");
}

export const loadCustomerUpdateModel = async(
  Prefix = faker.person.prefix(),
  FirstName = faker.person.firstName(),
  LastName = faker.person.lastName(),
  Mobile = faker.string.numeric({ length: { min: 10, max: 10 } }),
  Email = faker.internet.email(),
  Gender = faker.person.gender(),
  DisplayPicture = faker.image.url(),
  BirthDate = faker.date.birthdate(),
  Address = faker.location.streetAddress(),
  IsActive = faker.datatype.boolean(),
  InAppUser = faker.datatype.boolean() , 
) => {
    const model = {
      Prefix: Prefix,
      FirstName: FirstName,
      LastName: LastName,
      Mobile: Mobile,
      Email: Email,
      Gender: "Male",
      DisplayPicture: DisplayPicture,
      BirthDate: "2023-06-11T11:59:35.000Z",
      Address: Address,
      IsActive: true,
      InAppUser: true,
  };
  setTestData(model, "CustomerUpdateModel");
}

function loadCustomerQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = ''
    return queryString;
}

///////////////////////////////////////////////////////////////////////////
