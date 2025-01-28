// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var usermessage_pb = require('./usermessage_pb.js');

function serialize_appointment_UserMessageCreateModel(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageCreateModel)) {
    throw new Error('Expected argument of type appointment.UserMessageCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageCreateModel(buffer_arg) {
  return usermessage_pb.UserMessageCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageCreateResponse(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageCreateResponse)) {
    throw new Error('Expected argument of type appointment.UserMessageCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageCreateResponse(buffer_arg) {
  return usermessage_pb.UserMessageCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageDeleteModel(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageDeleteModel)) {
    throw new Error('Expected argument of type appointment.UserMessageDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageDeleteModel(buffer_arg) {
  return usermessage_pb.UserMessageDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageDeleteResponse(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageDeleteResponse)) {
    throw new Error('Expected argument of type appointment.UserMessageDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageDeleteResponse(buffer_arg) {
  return usermessage_pb.UserMessageDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageGetByIdModel(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageGetByIdModel)) {
    throw new Error('Expected argument of type appointment.UserMessageGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageGetByIdModel(buffer_arg) {
  return usermessage_pb.UserMessageGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageGetByIdResponse(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.UserMessageGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageGetByIdResponse(buffer_arg) {
  return usermessage_pb.UserMessageGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageSearchModel(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageSearchModel)) {
    throw new Error('Expected argument of type appointment.UserMessageSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageSearchModel(buffer_arg) {
  return usermessage_pb.UserMessageSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageSearchResponse(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageSearchResponse)) {
    throw new Error('Expected argument of type appointment.UserMessageSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageSearchResponse(buffer_arg) {
  return usermessage_pb.UserMessageSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageUpdateModel(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageUpdateModel)) {
    throw new Error('Expected argument of type appointment.UserMessageUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageUpdateModel(buffer_arg) {
  return usermessage_pb.UserMessageUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserMessageUpdateResponse(arg) {
  if (!(arg instanceof usermessage_pb.UserMessageUpdateResponse)) {
    throw new Error('Expected argument of type appointment.UserMessageUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserMessageUpdateResponse(buffer_arg) {
  return usermessage_pb.UserMessageUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserMessagesService = exports.UserMessagesService = {
  create: {
    path: '/appointment.UserMessages/Create',
    requestStream: false,
    responseStream: false,
    requestType: usermessage_pb.UserMessageCreateModel,
    responseType: usermessage_pb.UserMessageCreateResponse,
    requestSerialize: serialize_appointment_UserMessageCreateModel,
    requestDeserialize: deserialize_appointment_UserMessageCreateModel,
    responseSerialize: serialize_appointment_UserMessageCreateResponse,
    responseDeserialize: deserialize_appointment_UserMessageCreateResponse,
  },
  getById: {
    path: '/appointment.UserMessages/GetById',
    requestStream: false,
    responseStream: false,
    requestType: usermessage_pb.UserMessageGetByIdModel,
    responseType: usermessage_pb.UserMessageGetByIdResponse,
    requestSerialize: serialize_appointment_UserMessageGetByIdModel,
    requestDeserialize: deserialize_appointment_UserMessageGetByIdModel,
    responseSerialize: serialize_appointment_UserMessageGetByIdResponse,
    responseDeserialize: deserialize_appointment_UserMessageGetByIdResponse,
  },
  search: {
    path: '/appointment.UserMessages/Search',
    requestStream: false,
    responseStream: false,
    requestType: usermessage_pb.UserMessageSearchModel,
    responseType: usermessage_pb.UserMessageSearchResponse,
    requestSerialize: serialize_appointment_UserMessageSearchModel,
    requestDeserialize: deserialize_appointment_UserMessageSearchModel,
    responseSerialize: serialize_appointment_UserMessageSearchResponse,
    responseDeserialize: deserialize_appointment_UserMessageSearchResponse,
  },
  update: {
    path: '/appointment.UserMessages/Update',
    requestStream: false,
    responseStream: false,
    requestType: usermessage_pb.UserMessageUpdateModel,
    responseType: usermessage_pb.UserMessageUpdateResponse,
    requestSerialize: serialize_appointment_UserMessageUpdateModel,
    requestDeserialize: deserialize_appointment_UserMessageUpdateModel,
    responseSerialize: serialize_appointment_UserMessageUpdateResponse,
    responseDeserialize: deserialize_appointment_UserMessageUpdateResponse,
  },
  delete: {
    path: '/appointment.UserMessages/Delete',
    requestStream: false,
    responseStream: false,
    requestType: usermessage_pb.UserMessageDeleteModel,
    responseType: usermessage_pb.UserMessageDeleteResponse,
    requestSerialize: serialize_appointment_UserMessageDeleteModel,
    requestDeserialize: deserialize_appointment_UserMessageDeleteModel,
    responseSerialize: serialize_appointment_UserMessageDeleteResponse,
    responseDeserialize: deserialize_appointment_UserMessageDeleteResponse,
  },
};

exports.UserMessagesClient = grpc.makeGenericClientConstructor(UserMessagesService);
