// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var appointmentstatus_pb = require('./appointmentstatus_pb.js');

function serialize_appointment_AppointmentStatusCreateModel(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusCreateModel)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusCreateModel(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusCreateResponse(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusCreateResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusCreateResponse(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusDeleteModel(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusDeleteModel)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusDeleteModel(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusDeleteResponse(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusDeleteResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusDeleteResponse(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusGetByIdModel(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusGetByIdModel)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusGetByIdModel(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusGetByIdResponse(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusGetByIdResponse(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusSearchModel(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusSearchModel)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusSearchModel(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusSearchResponse(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusSearchResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusSearchResponse(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusUpdateModel(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusUpdateModel)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusUpdateModel(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentStatusUpdateResponse(arg) {
  if (!(arg instanceof appointmentstatus_pb.AppointmentStatusUpdateResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentStatusUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentStatusUpdateResponse(buffer_arg) {
  return appointmentstatus_pb.AppointmentStatusUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AppointmentStatusesService = exports.AppointmentStatusesService = {
  create: {
    path: '/appointment.AppointmentStatuses/Create',
    requestStream: false,
    responseStream: false,
    requestType: appointmentstatus_pb.AppointmentStatusCreateModel,
    responseType: appointmentstatus_pb.AppointmentStatusCreateResponse,
    requestSerialize: serialize_appointment_AppointmentStatusCreateModel,
    requestDeserialize: deserialize_appointment_AppointmentStatusCreateModel,
    responseSerialize: serialize_appointment_AppointmentStatusCreateResponse,
    responseDeserialize: deserialize_appointment_AppointmentStatusCreateResponse,
  },
  getById: {
    path: '/appointment.AppointmentStatuses/GetById',
    requestStream: false,
    responseStream: false,
    requestType: appointmentstatus_pb.AppointmentStatusGetByIdModel,
    responseType: appointmentstatus_pb.AppointmentStatusGetByIdResponse,
    requestSerialize: serialize_appointment_AppointmentStatusGetByIdModel,
    requestDeserialize: deserialize_appointment_AppointmentStatusGetByIdModel,
    responseSerialize: serialize_appointment_AppointmentStatusGetByIdResponse,
    responseDeserialize: deserialize_appointment_AppointmentStatusGetByIdResponse,
  },
  search: {
    path: '/appointment.AppointmentStatuses/Search',
    requestStream: false,
    responseStream: false,
    requestType: appointmentstatus_pb.AppointmentStatusSearchModel,
    responseType: appointmentstatus_pb.AppointmentStatusSearchResponse,
    requestSerialize: serialize_appointment_AppointmentStatusSearchModel,
    requestDeserialize: deserialize_appointment_AppointmentStatusSearchModel,
    responseSerialize: serialize_appointment_AppointmentStatusSearchResponse,
    responseDeserialize: deserialize_appointment_AppointmentStatusSearchResponse,
  },
  update: {
    path: '/appointment.AppointmentStatuses/Update',
    requestStream: false,
    responseStream: false,
    requestType: appointmentstatus_pb.AppointmentStatusUpdateModel,
    responseType: appointmentstatus_pb.AppointmentStatusUpdateResponse,
    requestSerialize: serialize_appointment_AppointmentStatusUpdateModel,
    requestDeserialize: deserialize_appointment_AppointmentStatusUpdateModel,
    responseSerialize: serialize_appointment_AppointmentStatusUpdateResponse,
    responseDeserialize: deserialize_appointment_AppointmentStatusUpdateResponse,
  },
  delete: {
    path: '/appointment.AppointmentStatuses/Delete',
    requestStream: false,
    responseStream: false,
    requestType: appointmentstatus_pb.AppointmentStatusDeleteModel,
    responseType: appointmentstatus_pb.AppointmentStatusDeleteResponse,
    requestSerialize: serialize_appointment_AppointmentStatusDeleteModel,
    requestDeserialize: deserialize_appointment_AppointmentStatusDeleteModel,
    responseSerialize: serialize_appointment_AppointmentStatusDeleteResponse,
    responseDeserialize: deserialize_appointment_AppointmentStatusDeleteResponse,
  },
};

exports.AppointmentStatusesClient = grpc.makeGenericClientConstructor(AppointmentStatusesService);
