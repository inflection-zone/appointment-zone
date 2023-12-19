// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessnodehour_pb = require('./businessnodehour_pb.js');

function serialize_appointment_BusinessNodeHourCreateModel(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourCreateModel(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourCreateResponse(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourCreateResponse(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourDeleteModel(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourDeleteModel(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourDeleteResponse(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourDeleteResponse(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourGetByIdModel(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourGetByIdModel(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourGetByIdResponse(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourGetByIdResponse(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourSearchModel(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourSearchModel(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourSearchResponse(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourSearchResponse(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourUpdateModel(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourUpdateModel(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeHourUpdateResponse(arg) {
  if (!(arg instanceof businessnodehour_pb.BusinessNodeHourUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeHourUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeHourUpdateResponse(buffer_arg) {
  return businessnodehour_pb.BusinessNodeHourUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessNodeHoursService = exports.BusinessNodeHoursService = {
  create: {
    path: '/appointment.BusinessNodeHours/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessnodehour_pb.BusinessNodeHourCreateModel,
    responseType: businessnodehour_pb.BusinessNodeHourCreateResponse,
    requestSerialize: serialize_appointment_BusinessNodeHourCreateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeHourCreateModel,
    responseSerialize: serialize_appointment_BusinessNodeHourCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeHourCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessNodeHours/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessnodehour_pb.BusinessNodeHourGetByIdModel,
    responseType: businessnodehour_pb.BusinessNodeHourGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessNodeHourGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessNodeHourGetByIdModel,
    responseSerialize: serialize_appointment_BusinessNodeHourGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeHourGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessNodeHours/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessnodehour_pb.BusinessNodeHourSearchModel,
    responseType: businessnodehour_pb.BusinessNodeHourSearchResponse,
    requestSerialize: serialize_appointment_BusinessNodeHourSearchModel,
    requestDeserialize: deserialize_appointment_BusinessNodeHourSearchModel,
    responseSerialize: serialize_appointment_BusinessNodeHourSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeHourSearchResponse,
  },
  update: {
    path: '/appointment.BusinessNodeHours/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessnodehour_pb.BusinessNodeHourUpdateModel,
    responseType: businessnodehour_pb.BusinessNodeHourUpdateResponse,
    requestSerialize: serialize_appointment_BusinessNodeHourUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeHourUpdateModel,
    responseSerialize: serialize_appointment_BusinessNodeHourUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeHourUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessNodeHours/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessnodehour_pb.BusinessNodeHourDeleteModel,
    responseType: businessnodehour_pb.BusinessNodeHourDeleteResponse,
    requestSerialize: serialize_appointment_BusinessNodeHourDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessNodeHourDeleteModel,
    responseSerialize: serialize_appointment_BusinessNodeHourDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeHourDeleteResponse,
  },
};

exports.BusinessNodeHoursClient = grpc.makeGenericClientConstructor(BusinessNodeHoursService);
