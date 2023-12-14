// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var business_node_customer_pb = require('./business.node.customer_pb.js');

function serialize_appointment_BusinessNodeCustomerCreateModel(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerCreateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerCreateModel(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerCreateResponse(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerCreateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerCreateResponse(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerDeleteModel(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerDeleteModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerDeleteModel(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerDeleteResponse(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerDeleteResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerDeleteResponse(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerGetByIdModel(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerGetByIdModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerGetByIdModel(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerGetByIdResponse(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerGetByIdResponse(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerSearchModel(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerSearchModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerSearchModel(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerSearchResponse(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerSearchResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerSearchResponse(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerUpdateModel(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerUpdateModel)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerUpdateModel(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_BusinessNodeCustomerUpdateResponse(arg) {
  if (!(arg instanceof business_node_customer_pb.BusinessNodeCustomerUpdateResponse)) {
    throw new Error('Expected argument of type appointment.BusinessNodeCustomerUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_BusinessNodeCustomerUpdateResponse(buffer_arg) {
  return business_node_customer_pb.BusinessNodeCustomerUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BusinessNodeCustomersService = exports.BusinessNodeCustomersService = {
  create: {
    path: '/appointment.BusinessNodeCustomers/Create',
    requestStream: false,
    responseStream: false,
    requestType: business_node_customer_pb.BusinessNodeCustomerCreateModel,
    responseType: business_node_customer_pb.BusinessNodeCustomerCreateResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerCreateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerCreateModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerCreateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerCreateResponse,
  },
  getById: {
    path: '/appointment.BusinessNodeCustomers/GetById',
    requestStream: false,
    responseStream: false,
    requestType: business_node_customer_pb.BusinessNodeCustomerGetByIdModel,
    responseType: business_node_customer_pb.BusinessNodeCustomerGetByIdResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerGetByIdModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerGetByIdModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerGetByIdResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerGetByIdResponse,
  },
  search: {
    path: '/appointment.BusinessNodeCustomers/Search',
    requestStream: false,
    responseStream: false,
    requestType: business_node_customer_pb.BusinessNodeCustomerSearchModel,
    responseType: business_node_customer_pb.BusinessNodeCustomerSearchResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerSearchModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerSearchModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerSearchResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerSearchResponse,
  },
  update: {
    path: '/appointment.BusinessNodeCustomers/Update',
    requestStream: false,
    responseStream: false,
    requestType: business_node_customer_pb.BusinessNodeCustomerUpdateModel,
    responseType: business_node_customer_pb.BusinessNodeCustomerUpdateResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerUpdateModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerUpdateModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerUpdateResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerUpdateResponse,
  },
  delete: {
    path: '/appointment.BusinessNodeCustomers/Delete',
    requestStream: false,
    responseStream: false,
    requestType: business_node_customer_pb.BusinessNodeCustomerDeleteModel,
    responseType: business_node_customer_pb.BusinessNodeCustomerDeleteResponse,
    requestSerialize: serialize_appointment_BusinessNodeCustomerDeleteModel,
    requestDeserialize: deserialize_appointment_BusinessNodeCustomerDeleteModel,
    responseSerialize: serialize_appointment_BusinessNodeCustomerDeleteResponse,
    responseDeserialize: deserialize_appointment_BusinessNodeCustomerDeleteResponse,
  },
};

exports.BusinessNodeCustomersClient = grpc.makeGenericClientConstructor(BusinessNodeCustomersService);
