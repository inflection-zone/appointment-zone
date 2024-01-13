// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessservice_pb = require('./businessservice_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_appointment_BusinessServiceCreateModel(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessServiceCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceCreateModel(buffer_arg) {
  return businessservice_pb.BusinessServiceCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceCreateResponse(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessServiceCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceCreateResponse(buffer_arg) {
  return businessservice_pb.BusinessServiceCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceDeleteModel(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessServiceDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceDeleteModel(buffer_arg) {
  return businessservice_pb.BusinessServiceDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceDeleteResponse(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessServiceDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceDeleteResponse(buffer_arg) {
  return businessservice_pb.BusinessServiceDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceGetByIdModel(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessServiceGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceGetByIdModel(buffer_arg) {
  return businessservice_pb.BusinessServiceGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceGetByIdResponse(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessServiceGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceGetByIdResponse(buffer_arg) {
  return businessservice_pb.BusinessServiceGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceSearchModel(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessServiceSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceSearchModel(buffer_arg) {
  return businessservice_pb.BusinessServiceSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceSearchResponse(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessServiceSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceSearchResponse(buffer_arg) {
  return businessservice_pb.BusinessServiceSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceUpdateModel(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessServiceUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceUpdateModel(buffer_arg) {
  return businessservice_pb.BusinessServiceUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessServiceUpdateResponse(arg) {
  if (!(arg instanceof businessservice_pb.BusinessServiceUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessServiceUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessServiceUpdateResponse(buffer_arg) {
  return businessservice_pb.BusinessServiceUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessServicesService = exports.BusinessServicesService = {
  create: {
    path: '/appointment.BusinessServices/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessservice_pb.BusinessServiceCreateModel,
    responseType: businessservice_pb.BusinessServiceCreateResponse,
    requestSerialize: serialize_appointment_BusinessServiceCreateModel,
    requestDeserialize: deserialize_appointment_BusinessServiceCreateModel,
    responseSerialize: serialize_appointment_BusinessServiceCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessServiceCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessServices/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessservice_pb.BusinessServiceGetByIdModel,
    responseType: businessservice_pb.BusinessServiceGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessServiceGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessServiceGetByIdModel,
    responseSerialize: serialize_appointment_BusinessServiceGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessServiceGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessServices/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessservice_pb.BusinessServiceSearchModel,
    responseType: businessservice_pb.BusinessServiceSearchResponse,
    requestSerialize: serialize_appointment_BusinessServiceSearchModel,
    requestDeserialize: deserialize_appointment_BusinessServiceSearchModel,
    responseSerialize: serialize_appointment_BusinessServiceSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessServiceSearchResponse,
  },
  update: {
    path: '/appointment.BusinessServices/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessservice_pb.BusinessServiceUpdateModel,
    responseType: businessservice_pb.BusinessServiceUpdateResponse,
    requestSerialize: serialize_appointment_BusinessServiceUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessServiceUpdateModel,
    responseSerialize: serialize_appointment_BusinessServiceUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessServiceUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessServices/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessservice_pb.BusinessServiceDeleteModel,
    responseType: businessservice_pb.BusinessServiceDeleteResponse,
    requestSerialize: serialize_appointment_BusinessServiceDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessServiceDeleteModel,
    responseSerialize: serialize_appointment_BusinessServiceDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessServiceDeleteResponse,
  },
};

exports.BusinessServicesClient = grpc.makeGenericClientConstructor(BusinessServicesService);
