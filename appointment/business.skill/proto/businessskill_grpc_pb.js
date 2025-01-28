// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessskill_pb = require('./businessskill_pb.js');

function serialize_appointment_BusinessSkillCreateModel(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessSkillCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillCreateModel(buffer_arg) {
  return businessskill_pb.BusinessSkillCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillCreateResponse(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessSkillCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillCreateResponse(buffer_arg) {
  return businessskill_pb.BusinessSkillCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillDeleteModel(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessSkillDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillDeleteModel(buffer_arg) {
  return businessskill_pb.BusinessSkillDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillDeleteResponse(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessSkillDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillDeleteResponse(buffer_arg) {
  return businessskill_pb.BusinessSkillDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillGetByIdModel(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessSkillGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillGetByIdModel(buffer_arg) {
  return businessskill_pb.BusinessSkillGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillGetByIdResponse(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessSkillGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillGetByIdResponse(buffer_arg) {
  return businessskill_pb.BusinessSkillGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillSearchModel(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessSkillSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillSearchModel(buffer_arg) {
  return businessskill_pb.BusinessSkillSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillSearchResponse(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessSkillSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillSearchResponse(buffer_arg) {
  return businessskill_pb.BusinessSkillSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillUpdateModel(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessSkillUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillUpdateModel(buffer_arg) {
  return businessskill_pb.BusinessSkillUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSkillUpdateResponse(arg) {
  if (!(arg instanceof businessskill_pb.BusinessSkillUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessSkillUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSkillUpdateResponse(buffer_arg) {
  return businessskill_pb.BusinessSkillUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessSkillsService = exports.BusinessSkillsService = {
  create: {
    path: '/appointment.BusinessSkills/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessskill_pb.BusinessSkillCreateModel,
    responseType: businessskill_pb.BusinessSkillCreateResponse,
    requestSerialize: serialize_appointment_BusinessSkillCreateModel,
    requestDeserialize: deserialize_appointment_BusinessSkillCreateModel,
    responseSerialize: serialize_appointment_BusinessSkillCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessSkillCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessSkills/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessskill_pb.BusinessSkillGetByIdModel,
    responseType: businessskill_pb.BusinessSkillGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessSkillGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessSkillGetByIdModel,
    responseSerialize: serialize_appointment_BusinessSkillGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessSkillGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessSkills/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessskill_pb.BusinessSkillSearchModel,
    responseType: businessskill_pb.BusinessSkillSearchResponse,
    requestSerialize: serialize_appointment_BusinessSkillSearchModel,
    requestDeserialize: deserialize_appointment_BusinessSkillSearchModel,
    responseSerialize: serialize_appointment_BusinessSkillSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessSkillSearchResponse,
  },
  update: {
    path: '/appointment.BusinessSkills/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessskill_pb.BusinessSkillUpdateModel,
    responseType: businessskill_pb.BusinessSkillUpdateResponse,
    requestSerialize: serialize_appointment_BusinessSkillUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessSkillUpdateModel,
    responseSerialize: serialize_appointment_BusinessSkillUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessSkillUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessSkills/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessskill_pb.BusinessSkillDeleteModel,
    responseType: businessskill_pb.BusinessSkillDeleteResponse,
    requestSerialize: serialize_appointment_BusinessSkillDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessSkillDeleteModel,
    responseSerialize: serialize_appointment_BusinessSkillDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessSkillDeleteResponse,
  },
};

exports.BusinessSkillsClient = grpc.makeGenericClientConstructor(BusinessSkillsService);
