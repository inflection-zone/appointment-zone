// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var api_client_pb = require('./api.client_pb.js');

function serialize_appointment_ApiClientCreateModel(arg) {
  if (!(arg instanceof api_client_pb.ApiClientCreateModel)) {
    throw new Error('Expected argument of type appointment.ApiClientCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientCreateModel(buffer_arg) {
  return api_client_pb.ApiClientCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientCreateResponse(arg) {
  if (!(arg instanceof api_client_pb.ApiClientCreateResponse)) {
    throw new Error('Expected argument of type appointment.ApiClientCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientCreateResponse(buffer_arg) {
  return api_client_pb.ApiClientCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientDeleteModel(arg) {
  if (!(arg instanceof api_client_pb.ApiClientDeleteModel)) {
    throw new Error('Expected argument of type appointment.ApiClientDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientDeleteModel(buffer_arg) {
  return api_client_pb.ApiClientDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientDeleteResponse(arg) {
  if (!(arg instanceof api_client_pb.ApiClientDeleteResponse)) {
    throw new Error('Expected argument of type appointment.ApiClientDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientDeleteResponse(buffer_arg) {
  return api_client_pb.ApiClientDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientGetByIdModel(arg) {
  if (!(arg instanceof api_client_pb.ApiClientGetByIdModel)) {
    throw new Error('Expected argument of type appointment.ApiClientGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientGetByIdModel(buffer_arg) {
  return api_client_pb.ApiClientGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientGetByIdResponse(arg) {
  if (!(arg instanceof api_client_pb.ApiClientGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.ApiClientGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientGetByIdResponse(buffer_arg) {
  return api_client_pb.ApiClientGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientSearchModel(arg) {
  if (!(arg instanceof api_client_pb.ApiClientSearchModel)) {
    throw new Error('Expected argument of type appointment.ApiClientSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientSearchModel(buffer_arg) {
  return api_client_pb.ApiClientSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientSearchResponse(arg) {
  if (!(arg instanceof api_client_pb.ApiClientSearchResponse)) {
    throw new Error('Expected argument of type appointment.ApiClientSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientSearchResponse(buffer_arg) {
  return api_client_pb.ApiClientSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientUpdateModel(arg) {
  if (!(arg instanceof api_client_pb.ApiClientUpdateModel)) {
    throw new Error('Expected argument of type appointment.ApiClientUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientUpdateModel(buffer_arg) {
  return api_client_pb.ApiClientUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_ApiClientUpdateResponse(arg) {
  if (!(arg instanceof api_client_pb.ApiClientUpdateResponse)) {
    throw new Error('Expected argument of type appointment.ApiClientUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_ApiClientUpdateResponse(buffer_arg) {
  return api_client_pb.ApiClientUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ApiClientsService = exports.ApiClientsService = {
  create: {
    path: '/appointment.ApiClients/Create',
    requestStream: false,
    responseStream: false,
    requestType: api_client_pb.ApiClientCreateModel,
    responseType: api_client_pb.ApiClientCreateResponse,
    requestSerialize: serialize_appointment_ApiClientCreateModel,
    requestDeserialize: deserialize_appointment_ApiClientCreateModel,
    responseSerialize: serialize_appointment_ApiClientCreateResponse,
    responseDeserialize: deserialize_appointment_ApiClientCreateResponse,
  },
  getById: {
    path: '/appointment.ApiClients/GetById',
    requestStream: false,
    responseStream: false,
    requestType: api_client_pb.ApiClientGetByIdModel,
    responseType: api_client_pb.ApiClientGetByIdResponse,
    requestSerialize: serialize_appointment_ApiClientGetByIdModel,
    requestDeserialize: deserialize_appointment_ApiClientGetByIdModel,
    responseSerialize: serialize_appointment_ApiClientGetByIdResponse,
    responseDeserialize: deserialize_appointment_ApiClientGetByIdResponse,
  },
  search: {
    path: '/appointment.ApiClients/Search',
    requestStream: false,
    responseStream: false,
    requestType: api_client_pb.ApiClientSearchModel,
    responseType: api_client_pb.ApiClientSearchResponse,
    requestSerialize: serialize_appointment_ApiClientSearchModel,
    requestDeserialize: deserialize_appointment_ApiClientSearchModel,
    responseSerialize: serialize_appointment_ApiClientSearchResponse,
    responseDeserialize: deserialize_appointment_ApiClientSearchResponse,
  },
  update: {
    path: '/appointment.ApiClients/Update',
    requestStream: false,
    responseStream: false,
    requestType: api_client_pb.ApiClientUpdateModel,
    responseType: api_client_pb.ApiClientUpdateResponse,
    requestSerialize: serialize_appointment_ApiClientUpdateModel,
    requestDeserialize: deserialize_appointment_ApiClientUpdateModel,
    responseSerialize: serialize_appointment_ApiClientUpdateResponse,
    responseDeserialize: deserialize_appointment_ApiClientUpdateResponse,
  },
  delete: {
    path: '/appointment.ApiClients/Delete',
    requestStream: false,
    responseStream: false,
    requestType: api_client_pb.ApiClientDeleteModel,
    responseType: api_client_pb.ApiClientDeleteResponse,
    requestSerialize: serialize_appointment_ApiClientDeleteModel,
    requestDeserialize: deserialize_appointment_ApiClientDeleteModel,
    responseSerialize: serialize_appointment_ApiClientDeleteResponse,
    responseDeserialize: deserialize_appointment_ApiClientDeleteResponse,
  },
};

exports.ApiClientsClient = grpc.makeGenericClientConstructor(ApiClientsService);
