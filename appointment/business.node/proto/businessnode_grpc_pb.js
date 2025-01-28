// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessnode_pb = require('./businessnode_pb.js');

function serialize_appointment_BusinessNodeCreateModel(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCreateModel(buffer_arg) {
  return businessnode_pb.BusinessNodeCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCreateResponse(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCreateResponse(buffer_arg) {
  return businessnode_pb.BusinessNodeCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeDeleteModel(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeDeleteModel(buffer_arg) {
  return businessnode_pb.BusinessNodeDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeDeleteResponse(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeDeleteResponse(buffer_arg) {
  return businessnode_pb.BusinessNodeDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeGetByIdModel(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeGetByIdModel(buffer_arg) {
  return businessnode_pb.BusinessNodeGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeGetByIdResponse(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeGetByIdResponse(buffer_arg) {
  return businessnode_pb.BusinessNodeGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeSearchModel(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeSearchModel(buffer_arg) {
  return businessnode_pb.BusinessNodeSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeSearchResponse(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeSearchResponse(buffer_arg) {
  return businessnode_pb.BusinessNodeSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeUpdateModel(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeUpdateModel(buffer_arg) {
  return businessnode_pb.BusinessNodeUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeUpdateResponse(arg) {
  if (!(arg instanceof businessnode_pb.BusinessNodeUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeUpdateResponse(buffer_arg) {
  return businessnode_pb.BusinessNodeUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessNodesService = exports.BusinessNodesService = {
  create: {
    path: '/appointment.BusinessNodes/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessnode_pb.BusinessNodeCreateModel,
    responseType: businessnode_pb.BusinessNodeCreateResponse,
    requestSerialize: serialize_appointment_BusinessNodeCreateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCreateModel,
    responseSerialize: serialize_appointment_BusinessNodeCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessNodes/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessnode_pb.BusinessNodeGetByIdModel,
    responseType: businessnode_pb.BusinessNodeGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessNodeGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessNodeGetByIdModel,
    responseSerialize: serialize_appointment_BusinessNodeGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessNodes/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessnode_pb.BusinessNodeSearchModel,
    responseType: businessnode_pb.BusinessNodeSearchResponse,
    requestSerialize: serialize_appointment_BusinessNodeSearchModel,
    requestDeserialize: deserialize_appointment_BusinessNodeSearchModel,
    responseSerialize: serialize_appointment_BusinessNodeSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeSearchResponse,
  },
  update: {
    path: '/appointment.BusinessNodes/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessnode_pb.BusinessNodeUpdateModel,
    responseType: businessnode_pb.BusinessNodeUpdateResponse,
    requestSerialize: serialize_appointment_BusinessNodeUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeUpdateModel,
    responseSerialize: serialize_appointment_BusinessNodeUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessNodes/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessnode_pb.BusinessNodeDeleteModel,
    responseType: businessnode_pb.BusinessNodeDeleteResponse,
    requestSerialize: serialize_appointment_BusinessNodeDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessNodeDeleteModel,
    responseSerialize: serialize_appointment_BusinessNodeDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeDeleteResponse,
  },
};

exports.BusinessNodesClient = grpc.makeGenericClientConstructor(BusinessNodesService);
