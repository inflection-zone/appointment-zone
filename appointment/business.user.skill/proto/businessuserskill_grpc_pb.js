// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessuserskill_pb = require('./businessuserskill_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_appointment_BusinessUserSkillCreateModel(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillCreateModel(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillCreateMultipleModel(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillCreateMultipleModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillCreateMultipleModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillCreateMultipleModel(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillCreateMultipleModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillCreateMultipleResponse(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillCreateMultipleResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillCreateMultipleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillCreateMultipleResponse(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillCreateMultipleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillCreateResponse(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillCreateResponse(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillDeleteModel(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillDeleteModel(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillDeleteResponse(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillDeleteResponse(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillGetByIdModel(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillGetByIdModel(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillGetByIdResponse(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillGetByIdResponse(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillSearchModel(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillSearchModel(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillSearchResponse(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillSearchResponse(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillUpdateModel(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillUpdateModel(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSkillUpdateResponse(arg) {
  if (!(arg instanceof businessuserskill_pb.BusinessUserSkillUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserSkillUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSkillUpdateResponse(buffer_arg) {
  return businessuserskill_pb.BusinessUserSkillUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessUserSkillsService = exports.BusinessUserSkillsService = {
  create: {
    path: '/appointment.BusinessUserSkills/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessuserskill_pb.BusinessUserSkillCreateModel,
    responseType: businessuserskill_pb.BusinessUserSkillCreateResponse,
    requestSerialize: serialize_appointment_BusinessUserSkillCreateModel,
    requestDeserialize: deserialize_appointment_BusinessUserSkillCreateModel,
    responseSerialize: serialize_appointment_BusinessUserSkillCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserSkillCreateResponse,
  },
  createMultiple: {
    path: '/appointment.BusinessUserSkills/CreateMultiple',
    requestStream: false,
    responseStream: false,
    requestType: businessuserskill_pb.BusinessUserSkillCreateMultipleModel,
    responseType: businessuserskill_pb.BusinessUserSkillCreateMultipleResponse,
    requestSerialize: serialize_appointment_BusinessUserSkillCreateMultipleModel,
    requestDeserialize: deserialize_appointment_BusinessUserSkillCreateMultipleModel,
    responseSerialize: serialize_appointment_BusinessUserSkillCreateMultipleResponse,
    responseDeserialize: deserialize_appointment_BusinessUserSkillCreateMultipleResponse,
  },
  getById: {
    path: '/appointment.BusinessUserSkills/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessuserskill_pb.BusinessUserSkillGetByIdModel,
    responseType: businessuserskill_pb.BusinessUserSkillGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessUserSkillGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessUserSkillGetByIdModel,
    responseSerialize: serialize_appointment_BusinessUserSkillGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessUserSkillGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessUserSkills/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessuserskill_pb.BusinessUserSkillSearchModel,
    responseType: businessuserskill_pb.BusinessUserSkillSearchResponse,
    requestSerialize: serialize_appointment_BusinessUserSkillSearchModel,
    requestDeserialize: deserialize_appointment_BusinessUserSkillSearchModel,
    responseSerialize: serialize_appointment_BusinessUserSkillSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessUserSkillSearchResponse,
  },
  update: {
    path: '/appointment.BusinessUserSkills/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessuserskill_pb.BusinessUserSkillUpdateModel,
    responseType: businessuserskill_pb.BusinessUserSkillUpdateResponse,
    requestSerialize: serialize_appointment_BusinessUserSkillUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessUserSkillUpdateModel,
    responseSerialize: serialize_appointment_BusinessUserSkillUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserSkillUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessUserSkills/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessuserskill_pb.BusinessUserSkillDeleteModel,
    responseType: businessuserskill_pb.BusinessUserSkillDeleteResponse,
    requestSerialize: serialize_appointment_BusinessUserSkillDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessUserSkillDeleteModel,
    responseSerialize: serialize_appointment_BusinessUserSkillDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessUserSkillDeleteResponse,
  },
};

exports.BusinessUserSkillsClient = grpc.makeGenericClientConstructor(BusinessUserSkillsService);
