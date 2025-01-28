// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessuser_pb = require('./businessuser_pb.js');

function serialize_appointment_BusinessUserCreateModel(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserCreateModel(buffer_arg) {
  return businessuser_pb.BusinessUserCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserCreateResponse(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserCreateResponse(buffer_arg) {
  return businessuser_pb.BusinessUserCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserDeleteModel(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserDeleteModel(buffer_arg) {
  return businessuser_pb.BusinessUserDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserDeleteResponse(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserDeleteResponse(buffer_arg) {
  return businessuser_pb.BusinessUserDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserGetByIdModel(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserGetByIdModel(buffer_arg) {
  return businessuser_pb.BusinessUserGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserGetByIdResponse(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserGetByIdResponse(buffer_arg) {
  return businessuser_pb.BusinessUserGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSearchModel(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSearchModel(buffer_arg) {
  return businessuser_pb.BusinessUserSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserSearchResponse(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserSearchResponse(buffer_arg) {
  return businessuser_pb.BusinessUserSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserUpdateModel(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserUpdateModel(buffer_arg) {
  return businessuser_pb.BusinessUserUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserUpdateResponse(arg) {
  if (!(arg instanceof businessuser_pb.BusinessUserUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserUpdateResponse(buffer_arg) {
  return businessuser_pb.BusinessUserUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessUsersService = exports.BusinessUsersService = {
  create: {
    path: '/appointment.BusinessUsers/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessuser_pb.BusinessUserCreateModel,
    responseType: businessuser_pb.BusinessUserCreateResponse,
    requestSerialize: serialize_appointment_BusinessUserCreateModel,
    requestDeserialize: deserialize_appointment_BusinessUserCreateModel,
    responseSerialize: serialize_appointment_BusinessUserCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessUsers/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessuser_pb.BusinessUserGetByIdModel,
    responseType: businessuser_pb.BusinessUserGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessUserGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessUserGetByIdModel,
    responseSerialize: serialize_appointment_BusinessUserGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessUserGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessUsers/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessuser_pb.BusinessUserSearchModel,
    responseType: businessuser_pb.BusinessUserSearchResponse,
    requestSerialize: serialize_appointment_BusinessUserSearchModel,
    requestDeserialize: deserialize_appointment_BusinessUserSearchModel,
    responseSerialize: serialize_appointment_BusinessUserSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessUserSearchResponse,
  },
  update: {
    path: '/appointment.BusinessUsers/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessuser_pb.BusinessUserUpdateModel,
    responseType: businessuser_pb.BusinessUserUpdateResponse,
    requestSerialize: serialize_appointment_BusinessUserUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessUserUpdateModel,
    responseSerialize: serialize_appointment_BusinessUserUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessUsers/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessuser_pb.BusinessUserDeleteModel,
    responseType: businessuser_pb.BusinessUserDeleteResponse,
    requestSerialize: serialize_appointment_BusinessUserDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessUserDeleteModel,
    responseSerialize: serialize_appointment_BusinessUserDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessUserDeleteResponse,
  },
};

exports.BusinessUsersClient = grpc.makeGenericClientConstructor(BusinessUsersService);
