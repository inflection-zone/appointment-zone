// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var paymenttransaction_pb = require('./paymenttransaction_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_appointment_PaymentTransactionCreateModel(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionCreateModel)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionCreateModel(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionCreateResponse(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionCreateResponse)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionCreateResponse(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionDeleteModel(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionDeleteModel)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionDeleteModel(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionDeleteResponse(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionDeleteResponse)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionDeleteResponse(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionGetByIdModel(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionGetByIdModel)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionGetByIdModel(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionGetByIdResponse(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionGetByIdResponse(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionSearchModel(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionSearchModel)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionSearchModel(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionSearchResponse(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionSearchResponse)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionSearchResponse(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionUpdateModel(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionUpdateModel)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionUpdateModel(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_PaymentTransactionUpdateResponse(arg) {
  if (!(arg instanceof paymenttransaction_pb.PaymentTransactionUpdateResponse)) {
    throw new Error('Expected argument of type appointment.PaymentTransactionUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_PaymentTransactionUpdateResponse(buffer_arg) {
  return paymenttransaction_pb.PaymentTransactionUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PaymentTransactionsService = exports.PaymentTransactionsService = {
  create: {
    path: '/appointment.PaymentTransactions/Create',
    requestStream: false,
    responseStream: false,
    requestType: paymenttransaction_pb.PaymentTransactionCreateModel,
    responseType: paymenttransaction_pb.PaymentTransactionCreateResponse,
    requestSerialize: serialize_appointment_PaymentTransactionCreateModel,
    requestDeserialize: deserialize_appointment_PaymentTransactionCreateModel,
    responseSerialize: serialize_appointment_PaymentTransactionCreateResponse,
    responseDeserialize: deserialize_appointment_PaymentTransactionCreateResponse,
  },
  getById: {
    path: '/appointment.PaymentTransactions/GetById',
    requestStream: false,
    responseStream: false,
    requestType: paymenttransaction_pb.PaymentTransactionGetByIdModel,
    responseType: paymenttransaction_pb.PaymentTransactionGetByIdResponse,
    requestSerialize: serialize_appointment_PaymentTransactionGetByIdModel,
    requestDeserialize: deserialize_appointment_PaymentTransactionGetByIdModel,
    responseSerialize: serialize_appointment_PaymentTransactionGetByIdResponse,
    responseDeserialize: deserialize_appointment_PaymentTransactionGetByIdResponse,
  },
  search: {
    path: '/appointment.PaymentTransactions/Search',
    requestStream: false,
    responseStream: false,
    requestType: paymenttransaction_pb.PaymentTransactionSearchModel,
    responseType: paymenttransaction_pb.PaymentTransactionSearchResponse,
    requestSerialize: serialize_appointment_PaymentTransactionSearchModel,
    requestDeserialize: deserialize_appointment_PaymentTransactionSearchModel,
    responseSerialize: serialize_appointment_PaymentTransactionSearchResponse,
    responseDeserialize: deserialize_appointment_PaymentTransactionSearchResponse,
  },
  update: {
    path: '/appointment.PaymentTransactions/Update',
    requestStream: false,
    responseStream: false,
    requestType: paymenttransaction_pb.PaymentTransactionUpdateModel,
    responseType: paymenttransaction_pb.PaymentTransactionUpdateResponse,
    requestSerialize: serialize_appointment_PaymentTransactionUpdateModel,
    requestDeserialize: deserialize_appointment_PaymentTransactionUpdateModel,
    responseSerialize: serialize_appointment_PaymentTransactionUpdateResponse,
    responseDeserialize: deserialize_appointment_PaymentTransactionUpdateResponse,
  },
  delete: {
    path: '/appointment.PaymentTransactions/Delete',
    requestStream: false,
    responseStream: false,
    requestType: paymenttransaction_pb.PaymentTransactionDeleteModel,
    responseType: paymenttransaction_pb.PaymentTransactionDeleteResponse,
    requestSerialize: serialize_appointment_PaymentTransactionDeleteModel,
    requestDeserialize: deserialize_appointment_PaymentTransactionDeleteModel,
    responseSerialize: serialize_appointment_PaymentTransactionDeleteResponse,
    responseDeserialize: deserialize_appointment_PaymentTransactionDeleteResponse,
  },
};

exports.PaymentTransactionsClient = grpc.makeGenericClientConstructor(PaymentTransactionsService);
