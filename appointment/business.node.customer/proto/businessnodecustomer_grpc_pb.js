// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessnodecustomer_pb = require('./businessnodecustomer_pb.js');

function serialize_appointment_BusinessNodeCustomerCreateModel(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerCreateModel(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerCreateResponse(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerCreateResponse(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerDeleteModel(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerDeleteModel(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerDeleteResponse(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerDeleteResponse(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerGetByIdModel(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerGetByIdModel(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerGetByIdResponse(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerGetByIdResponse(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerSearchModel(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerSearchModel(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerSearchResponse(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerSearchResponse(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerUpdateModel(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerUpdateModel(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerUpdateResponse(arg) {
  if (!(arg instanceof businessnodecustomer_pb.BusinessNodeCustomerUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerUpdateResponse(buffer_arg) {
  return businessnodecustomer_pb.BusinessNodeCustomerUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessNodeCustomersService = exports.BusinessNodeCustomersService = {
  create: {
    path: '/appointment.BusinessNodeCustomers/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessnodecustomer_pb.BusinessNodeCustomerCreateModel,
    responseType: businessnodecustomer_pb.BusinessNodeCustomerCreateResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerCreateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerCreateModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessNodeCustomers/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessnodecustomer_pb.BusinessNodeCustomerGetByIdModel,
    responseType: businessnodecustomer_pb.BusinessNodeCustomerGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerGetByIdModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessNodeCustomers/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessnodecustomer_pb.BusinessNodeCustomerSearchModel,
    responseType: businessnodecustomer_pb.BusinessNodeCustomerSearchResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerSearchModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerSearchModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerSearchResponse,
  },
  update: {
    path: '/appointment.BusinessNodeCustomers/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessnodecustomer_pb.BusinessNodeCustomerUpdateModel,
    responseType: businessnodecustomer_pb.BusinessNodeCustomerUpdateResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerUpdateModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessNodeCustomers/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessnodecustomer_pb.BusinessNodeCustomerDeleteModel,
    responseType: businessnodecustomer_pb.BusinessNodeCustomerDeleteResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerDeleteModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerDeleteResponse,
  },
};

exports.BusinessNodeCustomersClient = grpc.makeGenericClientConstructor(BusinessNodeCustomersService);
