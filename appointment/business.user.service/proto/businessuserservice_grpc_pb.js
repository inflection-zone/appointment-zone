// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var businessuserservice_pb = require('./businessuserservice_pb.js');

function serialize_appointment_BusinessUserServiceCreateModel(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceCreateModel(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceCreateResponse(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceCreateResponse(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceDeleteModel(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceDeleteModel(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceDeleteResponse(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceDeleteResponse(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceGetByIdModel(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceGetByIdModel(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceGetByIdResponse(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceGetByIdResponse(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceSearchModel(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceSearchModel(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceSearchResponse(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceSearchResponse(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceUpdateModel(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceUpdateModel(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessUserServiceUpdateResponse(arg) {
  if (!(arg instanceof businessuserservice_pb.BusinessUserServiceUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessUserServiceUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessUserServiceUpdateResponse(buffer_arg) {
  return businessuserservice_pb.BusinessUserServiceUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessUserServicesService = exports.BusinessUserServicesService = {
  create: {
    path: '/appointment.BusinessUserServices/Create',
    requestStream: false,
    responseStream: false,
    requestType: businessuserservice_pb.BusinessUserServiceCreateModel,
    responseType: businessuserservice_pb.BusinessUserServiceCreateResponse,
    requestSerialize: serialize_appointment_BusinessUserServiceCreateModel,
    requestDeserialize: deserialize_appointment_BusinessUserServiceCreateModel,
    responseSerialize: serialize_appointment_BusinessUserServiceCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserServiceCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessUserServices/GetById',
    requestStream: false,
    responseStream: false,
    requestType: businessuserservice_pb.BusinessUserServiceGetByIdModel,
    responseType: businessuserservice_pb.BusinessUserServiceGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessUserServiceGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessUserServiceGetByIdModel,
    responseSerialize: serialize_appointment_BusinessUserServiceGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessUserServiceGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessUserServices/Search',
    requestStream: false,
    responseStream: false,
    requestType: businessuserservice_pb.BusinessUserServiceSearchModel,
    responseType: businessuserservice_pb.BusinessUserServiceSearchResponse,
    requestSerialize: serialize_appointment_BusinessUserServiceSearchModel,
    requestDeserialize: deserialize_appointment_BusinessUserServiceSearchModel,
    responseSerialize: serialize_appointment_BusinessUserServiceSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessUserServiceSearchResponse,
  },
  update: {
    path: '/appointment.BusinessUserServices/Update',
    requestStream: false,
    responseStream: false,
    requestType: businessuserservice_pb.BusinessUserServiceUpdateModel,
    responseType: businessuserservice_pb.BusinessUserServiceUpdateResponse,
    requestSerialize: serialize_appointment_BusinessUserServiceUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessUserServiceUpdateModel,
    responseSerialize: serialize_appointment_BusinessUserServiceUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessUserServiceUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessUserServices/Delete',
    requestStream: false,
    responseStream: false,
    requestType: businessuserservice_pb.BusinessUserServiceDeleteModel,
    responseType: businessuserservice_pb.BusinessUserServiceDeleteResponse,
    requestSerialize: serialize_appointment_BusinessUserServiceDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessUserServiceDeleteModel,
    responseSerialize: serialize_appointment_BusinessUserServiceDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessUserServiceDeleteResponse,
  },
};

exports.BusinessUserServicesClient = grpc.makeGenericClientConstructor(BusinessUserServicesService);
