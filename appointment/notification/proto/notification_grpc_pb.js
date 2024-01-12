// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var notification_pb = require('./notification_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_appointment_NotificationCreateModel(arg) {
  if (!(arg instanceof notification_pb.NotificationCreateModel)) {
    throw new Error('Expected argument of type appointment.NotificationCreateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationCreateModel(buffer_arg) {
  return notification_pb.NotificationCreateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationCreateResponse(arg) {
  if (!(arg instanceof notification_pb.NotificationCreateResponse)) {
    throw new Error('Expected argument of type appointment.NotificationCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationCreateResponse(buffer_arg) {
  return notification_pb.NotificationCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationDeleteModel(arg) {
  if (!(arg instanceof notification_pb.NotificationDeleteModel)) {
    throw new Error('Expected argument of type appointment.NotificationDeleteModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationDeleteModel(buffer_arg) {
  return notification_pb.NotificationDeleteModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationDeleteResponse(arg) {
  if (!(arg instanceof notification_pb.NotificationDeleteResponse)) {
    throw new Error('Expected argument of type appointment.NotificationDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationDeleteResponse(buffer_arg) {
  return notification_pb.NotificationDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationGetByIdModel(arg) {
  if (!(arg instanceof notification_pb.NotificationGetByIdModel)) {
    throw new Error('Expected argument of type appointment.NotificationGetByIdModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationGetByIdModel(buffer_arg) {
  return notification_pb.NotificationGetByIdModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationGetByIdResponse(arg) {
  if (!(arg instanceof notification_pb.NotificationGetByIdResponse)) {
    throw new Error('Expected argument of type appointment.NotificationGetByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationGetByIdResponse(buffer_arg) {
  return notification_pb.NotificationGetByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationSearchModel(arg) {
  if (!(arg instanceof notification_pb.NotificationSearchModel)) {
    throw new Error('Expected argument of type appointment.NotificationSearchModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationSearchModel(buffer_arg) {
  return notification_pb.NotificationSearchModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationSearchResponse(arg) {
  if (!(arg instanceof notification_pb.NotificationSearchResponse)) {
    throw new Error('Expected argument of type appointment.NotificationSearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationSearchResponse(buffer_arg) {
  return notification_pb.NotificationSearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationUpdateModel(arg) {
  if (!(arg instanceof notification_pb.NotificationUpdateModel)) {
    throw new Error('Expected argument of type appointment.NotificationUpdateModel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationUpdateModel(buffer_arg) {
  return notification_pb.NotificationUpdateModel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_appointment_NotificationUpdateResponse(arg) {
  if (!(arg instanceof notification_pb.NotificationUpdateResponse)) {
    throw new Error('Expected argument of type appointment.NotificationUpdateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_appointment_NotificationUpdateResponse(buffer_arg) {
  return notification_pb.NotificationUpdateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var NotificationsService = exports.NotificationsService = {
  create: {
    path: '/appointment.Notifications/Create',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.NotificationCreateModel,
    responseType: notification_pb.NotificationCreateResponse,
    requestSerialize: serialize_appointment_NotificationCreateModel,
    requestDeserialize: deserialize_appointment_NotificationCreateModel,
    responseSerialize: serialize_appointment_NotificationCreateResponse,
    responseDeserialize: deserialize_appointment_NotificationCreateResponse,
  },
  getById: {
    path: '/appointment.Notifications/GetById',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.NotificationGetByIdModel,
    responseType: notification_pb.NotificationGetByIdResponse,
    requestSerialize: serialize_appointment_NotificationGetByIdModel,
    requestDeserialize: deserialize_appointment_NotificationGetByIdModel,
    responseSerialize: serialize_appointment_NotificationGetByIdResponse,
    responseDeserialize: deserialize_appointment_NotificationGetByIdResponse,
  },
  search: {
    path: '/appointment.Notifications/Search',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.NotificationSearchModel,
    responseType: notification_pb.NotificationSearchResponse,
    requestSerialize: serialize_appointment_NotificationSearchModel,
    requestDeserialize: deserialize_appointment_NotificationSearchModel,
    responseSerialize: serialize_appointment_NotificationSearchResponse,
    responseDeserialize: deserialize_appointment_NotificationSearchResponse,
  },
  update: {
    path: '/appointment.Notifications/Update',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.NotificationUpdateModel,
    responseType: notification_pb.NotificationUpdateResponse,
    requestSerialize: serialize_appointment_NotificationUpdateModel,
    requestDeserialize: deserialize_appointment_NotificationUpdateModel,
    responseSerialize: serialize_appointment_NotificationUpdateResponse,
    responseDeserialize: deserialize_appointment_NotificationUpdateResponse,
  },
  delete: {
    path: '/appointment.Notifications/Delete',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.NotificationDeleteModel,
    responseType: notification_pb.NotificationDeleteResponse,
    requestSerialize: serialize_appointment_NotificationDeleteModel,
    requestDeserialize: deserialize_appointment_NotificationDeleteModel,
    responseSerialize: serialize_appointment_NotificationDeleteResponse,
    responseDeserialize: deserialize_appointment_NotificationDeleteResponse,
  },
};

exports.NotificationsClient = grpc.makeGenericClientConstructor(NotificationsService);
