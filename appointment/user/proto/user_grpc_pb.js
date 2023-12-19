// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_appointment_UserCreateModel(arg) {
  if (!(arg instanceof user_pb.UserCreateModel)) {
    throw new Error('Expected argument of type appointment.UserCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserCreateModel(buffer_arg) {
  return user_pb.UserCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserCreateResponse(arg) {
  if (!(arg instanceof user_pb.UserCreateResponse)) {
    throw new Error('Expected argument of type appointment.UserCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserCreateResponse(buffer_arg) {
  return user_pb.UserCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserDeleteModel(arg) {
  if (!(arg instanceof user_pb.UserDeleteModel)) {
    throw new Error('Expected argument of type appointment.UserDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserDeleteModel(buffer_arg) {
  return user_pb.UserDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserDeleteResponse(arg) {
  if (!(arg instanceof user_pb.UserDeleteResponse)) {
    throw new Error('Expected argument of type appointment.UserDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserDeleteResponse(buffer_arg) {
  return user_pb.UserDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserGetByIdModel(arg) {
  if (!(arg instanceof user_pb.UserGetByIdModel)) {
    throw new Error('Expected argument of type appointment.UserGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserGetByIdModel(buffer_arg) {
  return user_pb.UserGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserGetByIdResponse(arg) {
  if (!(arg instanceof user_pb.UserGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.UserGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserGetByIdResponse(buffer_arg) {
  return user_pb.UserGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserSearchModel(arg) {
  if (!(arg instanceof user_pb.UserSearchModel)) {
    throw new Error('Expected argument of type appointment.UserSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserSearchModel(buffer_arg) {
  return user_pb.UserSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserSearchResponse(arg) {
  if (!(arg instanceof user_pb.UserSearchResponse)) {
    throw new Error('Expected argument of type appointment.UserSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserSearchResponse(buffer_arg) {
  return user_pb.UserSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserUpdateModel(arg) {
  if (!(arg instanceof user_pb.UserUpdateModel)) {
    throw new Error('Expected argument of type appointment.UserUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserUpdateModel(buffer_arg) {
  return user_pb.UserUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_UserUpdateResponse(arg) {
  if (!(arg instanceof user_pb.UserUpdateResponse)) {
    throw new Error('Expected argument of type appointment.UserUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_UserUpdateResponse(buffer_arg) {
  return user_pb.UserUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UsersService = exports.UsersService = {
  create: {
    path: '/appointment.Users/Create',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserCreateModel,
    responseType: user_pb.UserCreateResponse,
    requestSerialize: serialize_appointment_UserCreateModel,
    requestDeserialize: deserialize_appointment_UserCreateModel,
    responseSerialize: serialize_appointment_UserCreateResponse,
    responseDeserialize: deserialize_appointment_UserCreateResponse,
  },
  getById: {
    path: '/appointment.Users/GetById',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserGetByIdModel,
    responseType: user_pb.UserGetByIdResponse,
    requestSerialize: serialize_appointment_UserGetByIdModel,
    requestDeserialize: deserialize_appointment_UserGetByIdModel,
    responseSerialize: serialize_appointment_UserGetByIdResponse,
    responseDeserialize: deserialize_appointment_UserGetByIdResponse,
  },
  search: {
    path: '/appointment.Users/Search',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserSearchModel,
    responseType: user_pb.UserSearchResponse,
    requestSerialize: serialize_appointment_UserSearchModel,
    requestDeserialize: deserialize_appointment_UserSearchModel,
    responseSerialize: serialize_appointment_UserSearchResponse,
    responseDeserialize: deserialize_appointment_UserSearchResponse,
  },
  update: {
    path: '/appointment.Users/Update',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserUpdateModel,
    responseType: user_pb.UserUpdateResponse,
    requestSerialize: serialize_appointment_UserUpdateModel,
    requestDeserialize: deserialize_appointment_UserUpdateModel,
    responseSerialize: serialize_appointment_UserUpdateResponse,
    responseDeserialize: deserialize_appointment_UserUpdateResponse,
  },
  delete: {
    path: '/appointment.Users/Delete',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserDeleteModel,
    responseType: user_pb.UserDeleteResponse,
    requestSerialize: serialize_appointment_UserDeleteModel,
    requestDeserialize: deserialize_appointment_UserDeleteModel,
    responseSerialize: serialize_appointment_UserDeleteResponse,
    responseDeserialize: deserialize_appointment_UserDeleteResponse,
  },
};

exports.UsersClient = grpc.makeGenericClientConstructor(UsersService);
