// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var business_pb = require('./business_pb.js');

function serialize_appointment_BusinessCreateModel(arg) {
  if (!(arg instanceof business_pb.BusinessCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessCreateModel(buffer_arg) {
  return business_pb.BusinessCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessCreateResponse(arg) {
  if (!(arg instanceof business_pb.BusinessCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessCreateResponse(buffer_arg) {
  return business_pb.BusinessCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessDeleteModel(arg) {
  if (!(arg instanceof business_pb.BusinessDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessDeleteModel(buffer_arg) {
  return business_pb.BusinessDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessDeleteResponse(arg) {
  if (!(arg instanceof business_pb.BusinessDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessDeleteResponse(buffer_arg) {
  return business_pb.BusinessDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessGetByIdModel(arg) {
  if (!(arg instanceof business_pb.BusinessGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessGetByIdModel(buffer_arg) {
  return business_pb.BusinessGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessGetByIdResponse(arg) {
  if (!(arg instanceof business_pb.BusinessGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessGetByIdResponse(buffer_arg) {
  return business_pb.BusinessGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSearchModel(arg) {
  if (!(arg instanceof business_pb.BusinessSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSearchModel(buffer_arg) {
  return business_pb.BusinessSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessSearchResponse(arg) {
  if (!(arg instanceof business_pb.BusinessSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessSearchResponse(buffer_arg) {
  return business_pb.BusinessSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUpdateModel(arg) {
  if (!(arg instanceof business_pb.BusinessUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUpdateModel(buffer_arg) {
  return business_pb.BusinessUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUpdateResponse(arg) {
  if (!(arg instanceof business_pb.BusinessUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUpdateResponse(buffer_arg) {
  return business_pb.BusinessUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessesService = exports.BusinessesService = {
  create: {
    path: '/appointment.Businesses/Create',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessCreateModel,
    responseType: business_pb.BusinessCreateResponse,
    requestSerialize: serialize_appointment_BusinessCreateModel,
    requestDeserialize: deserialize_appointment_BusinessCreateModel,
    responseSerialize: serialize_appointment_BusinessCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessCreateResponse,
  },
  getById: {
    path: '/appointment.Businesses/GetById',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessGetByIdModel,
    responseType: business_pb.BusinessGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessGetByIdModel,
    responseSerialize: serialize_appointment_BusinessGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessGetByIdResponse,
  },
  search: {
    path: '/appointment.Businesses/Search',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessSearchModel,
    responseType: business_pb.BusinessSearchResponse,
    requestSerialize: serialize_appointment_BusinessSearchModel,
    requestDeserialize: deserialize_appointment_BusinessSearchModel,
    responseSerialize: serialize_appointment_BusinessSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessSearchResponse,
  },
  update: {
    path: '/appointment.Businesses/Update',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessUpdateModel,
    responseType: business_pb.BusinessUpdateResponse,
    requestSerialize: serialize_appointment_BusinessUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessUpdateModel,
    responseSerialize: serialize_appointment_BusinessUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessUpdateResponse,
  },
  delete: {
    path: '/appointment.Businesses/Delete',
    requestStream: false,
    responseStream: false,
    requestType: business_pb.BusinessDeleteModel,
    responseType: business_pb.BusinessDeleteResponse,
    requestSerialize: serialize_appointment_BusinessDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessDeleteModel,
    responseSerialize: serialize_appointment_BusinessDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessDeleteResponse,
  },
};

exports.BusinessesClient = grpc.makeGenericClientConstructor(BusinessesService);
