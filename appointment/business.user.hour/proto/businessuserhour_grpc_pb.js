// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessuserhour_pb = require('./businessuserhour_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_appointment_BusinessUserHourCreateModel(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourCreateModel(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourCreateResponse(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourCreateResponse(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourDeleteModel(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourDeleteModel(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourDeleteResponse(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourDeleteResponse(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourGetByIdModel(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourGetByIdModel(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourGetByIdResponse(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourGetByIdResponse(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourSearchModel(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourSearchModel(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourSearchResponse(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourSearchResponse(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourUpdateModel(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourUpdateModel(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserHourUpdateResponse(arg) {
  if (!(arg instanceof businessuserhour_pb.BusinessUserHourUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserHourUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserHourUpdateResponse(buffer_arg) {
  return businessuserhour_pb.BusinessUserHourUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessUserHoursService = exports.BusinessUserHoursService = {
  create: {
    path: '/appointment.BusinessUserHours/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessuserhour_pb.BusinessUserHourCreateModel,
    responseType: businessuserhour_pb.BusinessUserHourCreateResponse,
    requestSerialize: serialize_appointment_BusinessUserHourCreateModel,
    requestDeserialize: deserialize_appointment_BusinessUserHourCreateModel,
    responseSerialize: serialize_appointment_BusinessUserHourCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserHourCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessUserHours/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessuserhour_pb.BusinessUserHourGetByIdModel,
    responseType: businessuserhour_pb.BusinessUserHourGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessUserHourGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessUserHourGetByIdModel,
    responseSerialize: serialize_appointment_BusinessUserHourGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessUserHourGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessUserHours/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessuserhour_pb.BusinessUserHourSearchModel,
    responseType: businessuserhour_pb.BusinessUserHourSearchResponse,
    requestSerialize: serialize_appointment_BusinessUserHourSearchModel,
    requestDeserialize: deserialize_appointment_BusinessUserHourSearchModel,
    responseSerialize: serialize_appointment_BusinessUserHourSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessUserHourSearchResponse,
  },
  update: {
    path: '/appointment.BusinessUserHours/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessuserhour_pb.BusinessUserHourUpdateModel,
    responseType: businessuserhour_pb.BusinessUserHourUpdateResponse,
    requestSerialize: serialize_appointment_BusinessUserHourUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessUserHourUpdateModel,
    responseSerialize: serialize_appointment_BusinessUserHourUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserHourUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessUserHours/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessuserhour_pb.BusinessUserHourDeleteModel,
    responseType: businessuserhour_pb.BusinessUserHourDeleteResponse,
    requestSerialize: serialize_appointment_BusinessUserHourDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessUserHourDeleteModel,
    responseSerialize: serialize_appointment_BusinessUserHourDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessUserHourDeleteResponse,
  },
};

exports.BusinessUserHoursClient = grpc.makeGenericClientConstructor(BusinessUserHoursService);
