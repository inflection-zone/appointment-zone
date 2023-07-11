import  request  from 'supertest';
import{ expect, should, assert } from 'chai';
import Application from '../src/app';
import { describe, it } from 'mocha';
// import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from './init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Appointment tests', function() {

    var agent = request.agent(infra._app);

    it('Find availabe slots', function(done) {
      loadAppointmentGetModel();
      const BusinessId = getTestData("BusinessId");
      const BusinessNodeId = getTestData("BusinessNodeId");
      const BusinessServiceId = getTestData("BusinessServiceId")
        agent
            .get(`/api/v1/appointments/business/${BusinessId}/node/${BusinessNodeId}/service/${BusinessServiceId}/slots`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it('Find availabe slots for user', function(done) {
      loadAppointmentGetUserModel();
      const BusinessUserId = getTestData("BusinessUserId");
        agent
            .get(`/api/v1/appointments/businessUser/${BusinessUserId}/slots`)
            .set('Content-Type', 'application/json')
            .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
            .expect(response => {
              expect(response.body).to.have.property('Status');
              expect(response.body.Status).to.equal('failure');
            })
            .expect(400, done);
    });

  //   it('Create appointment', function(done) {
  //     loadAppointmentBookCreateModel();
  //     const createModel = getTestData("AppointmentBookCreateModel");
  //     agent
  //         .post(`/api/v1/appointments/book`)
  //         .set('Content-Type', 'application/json')
  //         .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
  //         .send(createModel)
  //         .expect(response => {
  //             setTestData(response.body.Data.id, 'AppointmentId');
  //             expect(response.body.Data).to.have.property('id');
  //             expect(response.body.Data).to.have.property('BusinessNodeId');
  //             expect(response.body.Data).to.have.property('CustomerId');
  //             expect(response.body.Data).to.have.property('BusinessUserId');
  //             expect(response.body.Data).to.have.property('BusinessServiceId');
  //             expect(response.body.Data).to.have.property('StartTime');         
  //             expect(response.body.Data).to.have.property('EndTime');
  //             expect(response.body.Data).to.have.property('Type');
  //             expect(response.body.Data).to.have.property('Note');
  //             expect(response.body.Data).to.have.property('StatusCode');
  //             expect(response.body.Data).to.have.property('Fees');
  //             expect(response.body.Data).to.have.property('Tax');
  //             expect(response.body.Data).to.have.property('Tip');         
  //             expect(response.body.Data).to.have.property('Discount');
  //             expect(response.body.Data).to.have.property('Total');         
  //             expect(response.body.Data).to.have.property('IsPaid');

  //             setTestData(response.body.Data.id, 'AppointmentId');

  //             expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
  //             expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
  //             expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessUserId);
  //             expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessServiceId);
  //             expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").StartTime);
  //             expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").EndTime);
  //             expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeCustomerCreateModel").Type);
  //             expect(response.body.Data.Note).to.equal(getTestData("BusinessNodeCustomerCreateModel").Note);
  //             expect(response.body.Data.StatusCode).to.equal(getTestData("BusinessNodeCustomerCreateModel").StatusCode);
  //             expect(response.body.Data.Fees).to.equal(getTestData("BusinessNodeCustomerCreateModel").Fees);
  //             expect(response.body.Data.Tax).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tax);
  //             expect(response.body.Data.Tip).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tip);
  //             expect(response.body.Data.Discount).to.equal(getTestData("BusinessNodeCustomerCreateModel").Discount);
  //             expect(response.body.Data.Total).to.equal(getTestData("BusinessNodeCustomerCreateModel").Total);
  //             expect(response.body.Data.IsPaid).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsPaid);
  //         })
  //         .expect(201, done);
  // });

//   it('Get appointment by id', function(done) {
//     const id = `${getTestData("AppointmentId")}`
//     agent
//         .get(`/api/v1/appointments/book/${getTestData("AppointmentId")}`)
//         .set('Content-Type', 'application/json')
//         .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//         .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
//         .expect(response => {
//           expect(response.body.Data).to.have.property('id');
//           expect(response.body.Data).to.have.property('BusinessNodeId');
//           expect(response.body.Data).to.have.property('CustomerId');
//           expect(response.body.Data).to.have.property('BusinessUserId');
//           expect(response.body.Data).to.have.property('BusinessServiceId');
//           expect(response.body.Data).to.have.property('StartTime');         
//           expect(response.body.Data).to.have.property('EndTime');
//           expect(response.body.Data).to.have.property('Type');
//           expect(response.body.Data).to.have.property('Note');
//           expect(response.body.Data).to.have.property('StatusCode');
//           expect(response.body.Data).to.have.property('Fees');
//           expect(response.body.Data).to.have.property('Tax');
//           expect(response.body.Data).to.have.property('Tip');         
//           expect(response.body.Data).to.have.property('Discount');
//           expect(response.body.Data).to.have.property('Total');         
//           expect(response.body.Data).to.have.property('IsPaid');

//           expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
//           expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
//           expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessUserId);
//           expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessServiceId);
//           expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").StartTime);
//           expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").EndTime);
//           expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeCustomerCreateModel").Type);
//           expect(response.body.Data.Note).to.equal(getTestData("BusinessNodeCustomerCreateModel").Note);
//           expect(response.body.Data.StatusCode).to.equal(getTestData("BusinessNodeCustomerCreateModel").StatusCode);
//           expect(response.body.Data.Fees).to.equal(getTestData("BusinessNodeCustomerCreateModel").Fees);
//           expect(response.body.Data.Tax).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tax);
//           expect(response.body.Data.Tip).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tip);
//           expect(response.body.Data.Discount).to.equal(getTestData("BusinessNodeCustomerCreateModel").Discount);
//           expect(response.body.Data.Total).to.equal(getTestData("BusinessNodeCustomerCreateModel").Total);
//           expect(response.body.Data.IsPaid).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsPaid);
//         })
//         .expect(200, done);
// });

  // it('Get appointment by business user id', function(done) {
  //     const id = `${getTestData("BusinessUserId")}`
  //     agent
  //         .get(`/api/v1/appointments/business-user/${getTestData("BusinessUserId")}`)
  //         .set('Content-Type', 'application/json')
  //         .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
  //         .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
  //         .expect(response => {
  //           expect(response.body.Data).to.have.property('id');
  //           expect(response.body.Data).to.have.property('BusinessNodeId');
  //           expect(response.body.Data).to.have.property('CustomerId');
  //           expect(response.body.Data).to.have.property('BusinessUserId');
  //           expect(response.body.Data).to.have.property('BusinessServiceId');
  //           expect(response.body.Data).to.have.property('StartTime');         
  //           expect(response.body.Data).to.have.property('EndTime');
  //           expect(response.body.Data).to.have.property('Type');
  //           expect(response.body.Data).to.have.property('Note');
  //           expect(response.body.Data).to.have.property('StatusCode');
  //           expect(response.body.Data).to.have.property('Fees');
  //           expect(response.body.Data).to.have.property('Tax');
  //           expect(response.body.Data).to.have.property('Tip');         
  //           expect(response.body.Data).to.have.property('Discount');
  //           expect(response.body.Data).to.have.property('Total');         
  //           expect(response.body.Data).to.have.property('IsPaid');
  
  //           expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
  //           expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
  //           expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessUserId);
  //           expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessServiceId);
  //           expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").StartTime);
  //           expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").EndTime);
  //           expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeCustomerCreateModel").Type);
  //           expect(response.body.Data.Note).to.equal(getTestData("BusinessNodeCustomerCreateModel").Note);
  //           expect(response.body.Data.StatusCode).to.equal(getTestData("BusinessNodeCustomerCreateModel").StatusCode);
  //           expect(response.body.Data.Fees).to.equal(getTestData("BusinessNodeCustomerCreateModel").Fees);
  //           expect(response.body.Data.Tax).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tax);
  //           expect(response.body.Data.Tip).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tip);
  //           expect(response.body.Data.Discount).to.equal(getTestData("BusinessNodeCustomerCreateModel").Discount);
  //           expect(response.body.Data.Total).to.equal(getTestData("BusinessNodeCustomerCreateModel").Total);
  //           expect(response.body.Data.IsPaid).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsPaid);
  //         })
  //         .expect(200, done);
  // });

//   it('Get appointment by business node id', function(done) {
//     const id = `${getTestData("BusinessNodeId")}`
//     agent
//         .get(`/api/v1/appointments/business-node/${getTestData("BusinessNodeId")}`)
//         .set('Content-Type', 'application/json')
//         .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//         .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
//         .expect(response => {
//           expect(response.body.Data).to.have.property('id');
//           expect(response.body.Data).to.have.property('BusinessNodeId');
//           expect(response.body.Data).to.have.property('CustomerId');
//           expect(response.body.Data).to.have.property('BusinessUserId');
//           expect(response.body.Data).to.have.property('BusinessServiceId');
//           expect(response.body.Data).to.have.property('StartTime');         
//           expect(response.body.Data).to.have.property('EndTime');
//           expect(response.body.Data).to.have.property('Type');
//           expect(response.body.Data).to.have.property('Note');
//           expect(response.body.Data).to.have.property('StatusCode');
//           expect(response.body.Data).to.have.property('Fees');
//           expect(response.body.Data).to.have.property('Tax');
//           expect(response.body.Data).to.have.property('Tip');         
//           expect(response.body.Data).to.have.property('Discount');
//           expect(response.body.Data).to.have.property('Total');         
//           expect(response.body.Data).to.have.property('IsPaid');

//           expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
//           expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
//           expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessUserId);
//           expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessServiceId);
//           expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").StartTime);
//           expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").EndTime);
//           expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeCustomerCreateModel").Type);
//           expect(response.body.Data.Note).to.equal(getTestData("BusinessNodeCustomerCreateModel").Note);
//           expect(response.body.Data.StatusCode).to.equal(getTestData("BusinessNodeCustomerCreateModel").StatusCode);
//           expect(response.body.Data.Fees).to.equal(getTestData("BusinessNodeCustomerCreateModel").Fees);
//           expect(response.body.Data.Tax).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tax);
//           expect(response.body.Data.Tip).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tip);
//           expect(response.body.Data.Discount).to.equal(getTestData("BusinessNodeCustomerCreateModel").Discount);
//           expect(response.body.Data.Total).to.equal(getTestData("BusinessNodeCustomerCreateModel").Total);
//           expect(response.body.Data.IsPaid).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsPaid);
//         })
//         .expect(200, done);
// });

// it('Get appointment by customer id', function(done) {
//   const id = `${getTestData("CustomerId")}`
//   agent
//       .get(`/api/v1/appointments/customer/${getTestData("CustomerId")}`)
//       .set('Content-Type', 'application/json')
//       .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//       .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
//       .expect(response => {
//         expect(response.body.Data).to.have.property('id');
//         expect(response.body.Data).to.have.property('BusinessNodeId');
//         expect(response.body.Data).to.have.property('CustomerId');
//         expect(response.body.Data).to.have.property('BusinessUserId');
//         expect(response.body.Data).to.have.property('BusinessServiceId');
//         expect(response.body.Data).to.have.property('StartTime');         
//         expect(response.body.Data).to.have.property('EndTime');
//         expect(response.body.Data).to.have.property('Type');
//         expect(response.body.Data).to.have.property('Note');
//         expect(response.body.Data).to.have.property('StatusCode');
//         expect(response.body.Data).to.have.property('Fees');
//         expect(response.body.Data).to.have.property('Tax');
//         expect(response.body.Data).to.have.property('Tip');         
//         expect(response.body.Data).to.have.property('Discount');
//         expect(response.body.Data).to.have.property('Total');         
//         expect(response.body.Data).to.have.property('IsPaid');

//         expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
//         expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
//         expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessUserId);
//         expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessServiceId);
//         expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").StartTime);
//         expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").EndTime);
//         expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeCustomerCreateModel").Type);
//         expect(response.body.Data.Note).to.equal(getTestData("BusinessNodeCustomerCreateModel").Note);
//         expect(response.body.Data.StatusCode).to.equal(getTestData("BusinessNodeCustomerCreateModel").StatusCode);
//         expect(response.body.Data.Fees).to.equal(getTestData("BusinessNodeCustomerCreateModel").Fees);
//         expect(response.body.Data.Tax).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tax);
//         expect(response.body.Data.Tip).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tip);
//         expect(response.body.Data.Discount).to.equal(getTestData("BusinessNodeCustomerCreateModel").Discount);
//         expect(response.body.Data.Total).to.equal(getTestData("BusinessNodeCustomerCreateModel").Total);
//         expect(response.body.Data.IsPaid).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsPaid);
//       })
//       .expect(200, done);
// });

// it('Get appointment by display id', function(done) {
//   const id = `${getTestData("DisplayId")}`
//   agent
//       .get(`/api/v1/appointments/by-display-id/${getTestData("DisplayId")}`)
//       .set('Content-Type', 'application/json')
//       .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//       .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
//       .expect(response => {
//         expect(response.body.Data).to.have.property('id');
//         expect(response.body.Data).to.have.property('BusinessNodeId');
//         expect(response.body.Data).to.have.property('CustomerId');
//         expect(response.body.Data).to.have.property('BusinessUserId');
//         expect(response.body.Data).to.have.property('BusinessServiceId');
//         expect(response.body.Data).to.have.property('StartTime');         
//         expect(response.body.Data).to.have.property('EndTime');
//         expect(response.body.Data).to.have.property('Type');
//         expect(response.body.Data).to.have.property('Note');
//         expect(response.body.Data).to.have.property('StatusCode');
//         expect(response.body.Data).to.have.property('Fees');
//         expect(response.body.Data).to.have.property('Tax');
//         expect(response.body.Data).to.have.property('Tip');         
//         expect(response.body.Data).to.have.property('Discount');
//         expect(response.body.Data).to.have.property('Total');         
//         expect(response.body.Data).to.have.property('IsPaid');

//         expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
//         expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
//         expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessUserId);
//         expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessServiceId);
//         expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").StartTime);
//         expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").EndTime);
//         expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeCustomerCreateModel").Type);
//         expect(response.body.Data.Note).to.equal(getTestData("BusinessNodeCustomerCreateModel").Note);
//         expect(response.body.Data.StatusCode).to.equal(getTestData("BusinessNodeCustomerCreateModel").StatusCode);
//         expect(response.body.Data.Fees).to.equal(getTestData("BusinessNodeCustomerCreateModel").Fees);
//         expect(response.body.Data.Tax).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tax);
//         expect(response.body.Data.Tip).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tip);
//         expect(response.body.Data.Discount).to.equal(getTestData("BusinessNodeCustomerCreateModel").Discount);
//         expect(response.body.Data.Total).to.equal(getTestData("BusinessNodeCustomerCreateModel").Total);
//         expect(response.body.Data.IsPaid).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsPaid);
//       })
//       .expect(200, done);
// });

// it('Update appointment', function(done) {
//     loadAppointmentBookUpdateModel();
//     const updateModel = getTestData("AppointmentBookUpdateModel");
//     const id = `${getTestData("AppointmentId")}`
//     agent
//           .put(`/api/v1/appointments/${getTestData("AppointmentId")}`)
//           .set('Content-Type', 'application/json')
//           .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//           .set('Authorization', `Bearer ${getTestData("AdminJwt")}`)
//           .send(updateModel)
//           .expect(response => {
//             expect(response.body.Data).to.have.property('id');
//             expect(response.body.Data).to.have.property('BusinessNodeId');
//             expect(response.body.Data).to.have.property('CustomerId');
//             expect(response.body.Data).to.have.property('BusinessUserId');
//             expect(response.body.Data).to.have.property('BusinessServiceId');
//             expect(response.body.Data).to.have.property('StartTime');         
//             expect(response.body.Data).to.have.property('EndTime');
//             expect(response.body.Data).to.have.property('Type');
//             expect(response.body.Data).to.have.property('Note');
//             expect(response.body.Data).to.have.property('StatusCode');
//             expect(response.body.Data).to.have.property('Fees');
//             expect(response.body.Data).to.have.property('Tax');
//             expect(response.body.Data).to.have.property('Tip');         
//             expect(response.body.Data).to.have.property('Discount');
//             expect(response.body.Data).to.have.property('Total');         
//             expect(response.body.Data).to.have.property('IsPaid');
  
//             expect(response.body.Data.BusinessNodeId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessNodeId);
//             expect(response.body.Data.CustomerId).to.equal(getTestData("BusinessNodeCustomerCreateModel").CustomerId);
//             expect(response.body.Data.BusinessUserId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessUserId);
//             expect(response.body.Data.BusinessServiceId).to.equal(getTestData("BusinessNodeCustomerCreateModel").BusinessServiceId);
//             expect(response.body.Data.StartTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").StartTime);
//             expect(response.body.Data.EndTime).to.equal(getTestData("BusinessNodeCustomerCreateModel").EndTime);
//             expect(response.body.Data.Type).to.equal(getTestData("BusinessNodeCustomerCreateModel").Type);
//             expect(response.body.Data.Note).to.equal(getTestData("BusinessNodeCustomerCreateModel").Note);
//             expect(response.body.Data.StatusCode).to.equal(getTestData("BusinessNodeCustomerCreateModel").StatusCode);
//             expect(response.body.Data.Fees).to.equal(getTestData("BusinessNodeCustomerCreateModel").Fees);
//             expect(response.body.Data.Tax).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tax);
//             expect(response.body.Data.Tip).to.equal(getTestData("BusinessNodeCustomerCreateModel").Tip);
//             expect(response.body.Data.Discount).to.equal(getTestData("BusinessNodeCustomerCreateModel").Discount);
//             expect(response.body.Data.Total).to.equal(getTestData("BusinessNodeCustomerCreateModel").Total);
//             expect(response.body.Data.IsPaid).to.equal(getTestData("BusinessNodeCustomerCreateModel").IsPaid);
//           })
//           .expect(200, done);
//   });

// it('Cancel appointment', function(done) {
//   const id = getTestData("AppointmentId");
//     agent
//         .get(`/api/v1/appointments/cancel/${getTestData("AppointmentId")}`)
//         .set('Content-Type', 'application/json')
//         .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//         .expect(response => {
//           expect(response.body).to.have.property('Status');
//           expect(response.body.Status).to.equal('success');
//         })
//         .expect(400, done);
// });

// it('Complete appointment', function(done) {
//   const id = getTestData("AppointmentId");
//     agent
//         .get(`/api/v1/appointments/complete/${getTestData("AppointmentId")}`)
//         .set('Content-Type', 'application/json')
//         .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//         .expect(response => {
//           expect(response.body).to.have.property('Status');
//           expect(response.body.Status).to.equal('success');
//         })
//         .expect(400, done);
// });

// it('Confirm appointment', function(done) {
//   const id = getTestData("AppointmentId");
//     agent
//         .get(`/api/v1/appointments/confirm/${getTestData("AppointmentId")}`)
//         .set('Content-Type', 'application/json')
//         .set('x-api-key', 'T26BP24-MRGMRYE-JB352V-NC93PY0')
//         .expect(response => {
//           expect(response.body).to.have.property('Status');
//           expect(response.body.Status).to.equal('success');
//         })
//         .expect(400, done);
// });

});

///////////////////////////////////////////////////////////////////////////

export const loadAppointmentGetModel = async (
) => {
    const model = {
      BusinessId: getTestData("BusinessId"),
      BusinessNodeId: getTestData("BusinessNodeId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
    };
    setTestData(model, "AppointmentGetModel");
}

export const loadAppointmentGetUserModel = async (
) => {
    const model = {
      BusinessUserId: getTestData("BusinessUserId"),
    };
    setTestData(model, "AppointmentGetUserModel");
}

export const loadAppointmentBookCreateModel = async (
) => {
    const model = {
      BusinessNodeId: getTestData("BusinessNodeId"),
      CustomerId: getTestData("CustomerId"),
      BusinessUserId: getTestData("BusinessUserId"),
      BusinessServiceId: getTestData("BusinessServiceId"),
      StartTime:  "2023-07-10T14:30:00Z",
      EndTime: "2023-07-10T15:00:00Z",
      Type: "IN-PERSON",
      Note: "This is doctor appointment note",
      StatusCode: "1",
      Fees: 300,
      Tax:10,
      Tip: 0,
      Discount: 0,
      Total: 330,
      IsPaid: true
    };
    setTestData(model, "AppointmentBookCreateModel");
}

export const loadAppointmentBookUpdateModel = async (
  ) => {
      const model = {
        Status: "Confirmed",
        StatusCode: "2"
      };
      setTestData(model, "AppointmentBookUpdateModel");
  }
  
// function loadAppointmentQueryString() {
//     //This is raw query. Please modify to suit the test
//     const queryString = ''
//     return queryString;
// }

///////////////////////////////////////////////////////////////////////////
