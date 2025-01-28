// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var appointment_pb = require('./appointment_pb.js');

function serialize_appointment_AppointmentCreateModel(arg) {
  if (!(arg instanceof appointment_pb.AppointmentCreateModel)) {
    throw new Error('Expected argument of type appointment.AppointmentCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentCreateModel(buffer_arg) {
  return appointment_pb.AppointmentCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentCreateResponse(arg) {
  if (!(arg instanceof appointment_pb.AppointmentCreateResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentCreateResponse(buffer_arg) {
  return appointment_pb.AppointmentCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentDeleteModel(arg) {
  if (!(arg instanceof appointment_pb.AppointmentDeleteModel)) {
    throw new Error('Expected argument of type appointment.AppointmentDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentDeleteModel(buffer_arg) {
  return appointment_pb.AppointmentDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentDeleteResponse(arg) {
  if (!(arg instanceof appointment_pb.AppointmentDeleteResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentDeleteResponse(buffer_arg) {
  return appointment_pb.AppointmentDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentGetByIdModel(arg) {
  if (!(arg instanceof appointment_pb.AppointmentGetByIdModel)) {
    throw new Error('Expected argument of type appointment.AppointmentGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentGetByIdModel(buffer_arg) {
  return appointment_pb.AppointmentGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentGetByIdResponse(arg) {
  if (!(arg instanceof appointment_pb.AppointmentGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentGetByIdResponse(buffer_arg) {
  return appointment_pb.AppointmentGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentSearchModel(arg) {
  if (!(arg instanceof appointment_pb.AppointmentSearchModel)) {
    throw new Error('Expected argument of type appointment.AppointmentSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentSearchModel(buffer_arg) {
  return appointment_pb.AppointmentSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentSearchResponse(arg) {
  if (!(arg instanceof appointment_pb.AppointmentSearchResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentSearchResponse(buffer_arg) {
  return appointment_pb.AppointmentSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentUpdateModel(arg) {
  if (!(arg instanceof appointment_pb.AppointmentUpdateModel)) {
    throw new Error('Expected argument of type appointment.AppointmentUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentUpdateModel(buffer_arg) {
  return appointment_pb.AppointmentUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_AppointmentUpdateResponse(arg) {
  if (!(arg instanceof appointment_pb.AppointmentUpdateResponse)) {
    throw new Error('Expected argument of type appointment.AppointmentUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_AppointmentUpdateResponse(buffer_arg) {
  return appointment_pb.AppointmentUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AppointmentsService = exports.AppointmentsService = {
  create: {
    path: '/appointment.Appointments/Create',
    requestStream: false,
    responseStream: false,
    requestType: appointment_pb.AppointmentCreateModel,
    responseType: appointment_pb.AppointmentCreateResponse,
    requestSerialize: serialize_appointment_AppointmentCreateModel,
    requestDeserialize: deserialize_appointment_AppointmentCreateModel,
    responseSerialize: serialize_appointment_AppointmentCreateResponse,
    responseDeserialize: deserialize_appointment_AppointmentCreateResponse,
  },
  getById: {
    path: '/appointment.Appointments/GetById',
    requestStream: false,
    responseStream: false,
    requestType: appointment_pb.AppointmentGetByIdModel,
    responseType: appointment_pb.AppointmentGetByIdResponse,
    requestSerialize: serialize_appointment_AppointmentGetByIdModel,
    requestDeserialize: deserialize_appointment_AppointmentGetByIdModel,
    responseSerialize: serialize_appointment_AppointmentGetByIdResponse,
    responseDeserialize: deserialize_appointment_AppointmentGetByIdResponse,
  },
  search: {
    path: '/appointment.Appointments/Search',
    requestStream: false,
    responseStream: false,
    requestType: appointment_pb.AppointmentSearchModel,
    responseType: appointment_pb.AppointmentSearchResponse,
    requestSerialize: serialize_appointment_AppointmentSearchModel,
    requestDeserialize: deserialize_appointment_AppointmentSearchModel,
    responseSerialize: serialize_appointment_AppointmentSearchResponse,
    responseDeserialize: deserialize_appointment_AppointmentSearchResponse,
  },
  update: {
    path: '/appointment.Appointments/Update',
    requestStream: false,
    responseStream: false,
    requestType: appointment_pb.AppointmentUpdateModel,
    responseType: appointment_pb.AppointmentUpdateResponse,
    requestSerialize: serialize_appointment_AppointmentUpdateModel,
    requestDeserialize: deserialize_appointment_AppointmentUpdateModel,
    responseSerialize: serialize_appointment_AppointmentUpdateResponse,
    responseDeserialize: deserialize_appointment_AppointmentUpdateResponse,
  },
  delete: {
    path: '/appointment.Appointments/Delete',
    requestStream: false,
    responseStream: false,
    requestType: appointment_pb.AppointmentDeleteModel,
    responseType: appointment_pb.AppointmentDeleteResponse,
    requestSerialize: serialize_appointment_AppointmentDeleteModel,
    requestDeserialize: deserialize_appointment_AppointmentDeleteModel,
    responseSerialize: serialize_appointment_AppointmentDeleteResponse,
    responseDeserialize: deserialize_appointment_AppointmentDeleteResponse,
  },
};

exports.AppointmentsClient = grpc.makeGenericClientConstructor(AppointmentsService);
