// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var customer_pb = require('./customer_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_appointment_CustomerCreateModel(arg) {
  if (!(arg instanceof customer_pb.CustomerCreateModel)) {
    throw new Error('Expected argument of type appointment.CustomerCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerCreateModel(buffer_arg) {
  return customer_pb.CustomerCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerCreateResponse(arg) {
  if (!(arg instanceof customer_pb.CustomerCreateResponse)) {
    throw new Error('Expected argument of type appointment.CustomerCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerCreateResponse(buffer_arg) {
  return customer_pb.CustomerCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerDeleteModel(arg) {
  if (!(arg instanceof customer_pb.CustomerDeleteModel)) {
    throw new Error('Expected argument of type appointment.CustomerDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerDeleteModel(buffer_arg) {
  return customer_pb.CustomerDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerDeleteResponse(arg) {
  if (!(arg instanceof customer_pb.CustomerDeleteResponse)) {
    throw new Error('Expected argument of type appointment.CustomerDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerDeleteResponse(buffer_arg) {
  return customer_pb.CustomerDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerGetByIdModel(arg) {
  if (!(arg instanceof customer_pb.CustomerGetByIdModel)) {
    throw new Error('Expected argument of type appointment.CustomerGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerGetByIdModel(buffer_arg) {
  return customer_pb.CustomerGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerGetByIdResponse(arg) {
  if (!(arg instanceof customer_pb.CustomerGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.CustomerGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerGetByIdResponse(buffer_arg) {
  return customer_pb.CustomerGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerSearchModel(arg) {
  if (!(arg instanceof customer_pb.CustomerSearchModel)) {
    throw new Error('Expected argument of type appointment.CustomerSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerSearchModel(buffer_arg) {
  return customer_pb.CustomerSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerSearchResponse(arg) {
  if (!(arg instanceof customer_pb.CustomerSearchResponse)) {
    throw new Error('Expected argument of type appointment.CustomerSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerSearchResponse(buffer_arg) {
  return customer_pb.CustomerSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerUpdateModel(arg) {
  if (!(arg instanceof customer_pb.CustomerUpdateModel)) {
    throw new Error('Expected argument of type appointment.CustomerUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerUpdateModel(buffer_arg) {
  return customer_pb.CustomerUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_CustomerUpdateResponse(arg) {
  if (!(arg instanceof customer_pb.CustomerUpdateResponse)) {
    throw new Error('Expected argument of type appointment.CustomerUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_CustomerUpdateResponse(buffer_arg) {
  return customer_pb.CustomerUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CustomersService = exports.CustomersService = {
  create: {
    path: '/appointment.Customers/Create',
    requestStream: false,
    responseStream: false,
    requestType: customer_pb.CustomerCreateModel,
    responseType: customer_pb.CustomerCreateResponse,
    requestSerialize: serialize_appointment_CustomerCreateModel,
    requestDeserialize: deserialize_appointment_CustomerCreateModel,
    responseSerialize: serialize_appointment_CustomerCreateResponse,
    responseDeserialize: deserialize_appointment_CustomerCreateResponse,
  },
  getById: {
    path: '/appointment.Customers/GetById',
    requestStream: false,
    responseStream: false,
    requestType: customer_pb.CustomerGetByIdModel,
    responseType: customer_pb.CustomerGetByIdResponse,
    requestSerialize: serialize_appointment_CustomerGetByIdModel,
    requestDeserialize: deserialize_appointment_CustomerGetByIdModel,
    responseSerialize: serialize_appointment_CustomerGetByIdResponse,
    responseDeserialize: deserialize_appointment_CustomerGetByIdResponse,
  },
  search: {
    path: '/appointment.Customers/Search',
    requestStream: false,
    responseStream: false,
    requestType: customer_pb.CustomerSearchModel,
    responseType: customer_pb.CustomerSearchResponse,
    requestSerialize: serialize_appointment_CustomerSearchModel,
    requestDeserialize: deserialize_appointment_CustomerSearchModel,
    responseSerialize: serialize_appointment_CustomerSearchResponse,
    responseDeserialize: deserialize_appointment_CustomerSearchResponse,
  },
  update: {
    path: '/appointment.Customers/Update',
    requestStream: false,
    responseStream: false,
    requestType: customer_pb.CustomerUpdateModel,
    responseType: customer_pb.CustomerUpdateResponse,
    requestSerialize: serialize_appointment_CustomerUpdateModel,
    requestDeserialize: deserialize_appointment_CustomerUpdateModel,
    responseSerialize: serialize_appointment_CustomerUpdateResponse,
    responseDeserialize: deserialize_appointment_CustomerUpdateResponse,
  },
  delete: {
    path: '/appointment.Customers/Delete',
    requestStream: false,
    responseStream: false,
    requestType: customer_pb.CustomerDeleteModel,
    responseType: customer_pb.CustomerDeleteResponse,
    requestSerialize: serialize_appointment_CustomerDeleteModel,
    requestDeserialize: deserialize_appointment_CustomerDeleteModel,
    responseSerialize: serialize_appointment_CustomerDeleteResponse,
    responseDeserialize: deserialize_appointment_CustomerDeleteResponse,
  },
};

exports.CustomersClient = grpc.makeGenericClientConstructor(CustomersService);
