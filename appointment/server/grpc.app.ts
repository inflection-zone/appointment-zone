import express from "express";
import helmet from "helmet";
import cors from 'cors';
import { Logger } from "../../src/common/logger";
import { ConfigurationManager } from "../../src/config/configuration.manager";
import { DbClient } from "../../src/database/db.client";
import { Loader } from "../../src/startup/loader";
import { PrismaClientInit } from "../../src/startup/prisma.client.init";
import { Seeder } from "../../src/startup/seeder";
import fileUpload from "express-fileupload";
import * as grpc from '@grpc/grpc-js';
import { ApiClientsService } from '../api.client/proto/api.client_grpc_pb';
import { apiClientService } from '../api.client/server/controller';
import { CustomersService } from '../customer/proto/customer_grpc_pb';
import { customerService } from '../customer/server/controller';
import { businessService } from "../business/server/controller";
import { BusinessesService } from '../business/proto/business_grpc_pb';
import { businessNodeService } from "../business.node/server/controller";
import { BusinessNodesService } from '../business.node/proto/business.node_grpc_pb';
// import   businessNodeCustomerServiceInstance  from "../business.node.customer/server/controller";
import { BusinessNodeCustomersService } from '../business.node.customer/proto/business.node.customer_grpc_pb';
import { businessNodeHourService } from "../business.node.hour/server/controller";
import { BusinessNodeHoursService } from '../business.node.hour/proto/businessnodehour_grpc_pb';
import { businessServiceService } from "../business.service/server/controller";
import { BusinessServicesService } from '../business.service/proto/businessservice_grpc_pb';
import { businessSkillService } from "../business.skill/server/controller";
import { BusinessSkillsService } from '../business.skill/proto/businessskill_grpc_pb';
import { businessUserService } from "../business.user/server/controller";
import { BusinessUsersService } from '../business.user/proto/businessuser_grpc_pb';
import { businessUserHourService } from "../business.user.hour/server/controller";
import { BusinessUserHoursService } from '../business.user.hour/proto/businessuserhour_grpc_pb';
import { businessUserServiceService } from "../business.user.service/server/controller";
import { BusinessUserServicesService } from '../business.user.service/proto/businessuserservice_grpc_pb';
import { businessUserSkillService, } from "../business.user.skill/server/controller";
import { BusinessUserSkillsService } from '../business.user.skill/proto/businessuserskill_grpc_pb';
import { notificationService } from "../notification/server/controller";
import { NotificationsService } from '../notification/proto/notification_grpc_pb';
import { paymentTransactionService } from "../payment.transaction/server/controller";
import { PaymentTransactionsService } from '../payment.transaction/proto/paymenttransaction_grpc_pb';
import { userMessageService } from "../user.message/server/controller";
import { UserMessagesService } from '../user.message/proto/usermessage_grpc_pb';
import { appointmentStatusService } from "../appointment.status/server/controller";
import { AppointmentStatusesService } from '../appointment.status/proto/appointmentstatus_grpc_pb';
import { appointmentService } from "../appointment/server/controller";
import { AppointmentsService } from '../appointment/proto/appointment_grpc_pb';
import { userService } from "../user/server/controller";
import { UsersService } from '../user/proto/user_grpc_pb';

const server = new grpc.Server();

server.addService(CustomersService, customerService);
server.addService(BusinessesService, businessService);
server.addService(BusinessNodesService, businessNodeService);
// server.addService(BusinessNodeCustomersService, businessNodeCustomerServiceInstance);
server.addService(BusinessNodeHoursService, businessNodeHourService);
server.addService(BusinessServicesService, businessServiceService);
server.addService(BusinessSkillsService, businessSkillService);
server.addService(BusinessUsersService, businessUserService);
server.addService(BusinessUserHoursService, businessUserHourService);
server.addService(BusinessUserServicesService, businessUserServiceService);
server.addService(BusinessUserSkillsService, businessUserSkillService);
server.addService(NotificationsService, notificationService);
server.addService(PaymentTransactionsService, paymentTransactionService);
server.addService(UserMessagesService, userMessageService);
server.addService(AppointmentStatusesService, appointmentStatusService);
server.addService(AppointmentsService, appointmentService);
server.addService(UsersService, userService);
server.addService(ApiClientsService, apiClientService);

export class GrpcApplication {

  //#region Member variables

  public _app: express.Application = null;

  // private _router: Router = null;

  private static _instance: GrpcApplication = null;

  public _server = null;

  prisma = PrismaClientInit.instance().prisma();

  //#endregion

  private constructor() {
      this._app = express();
      // this._router = new Router(this._app);
  }

  public static instance(): GrpcApplication {
      return this._instance || (this._instance = new this());
  }

  public app(): express.Application {
      return this._app;
  }

  warmUp = async () => {
      try {

          ConfigurationManager.loadConfigurations();
          await this.setupDatabaseConnection();
          await Loader.init();
          // await this.setupMiddlewares();
          // await this._router.init();
          const seeder = new Seeder();
          await seeder.seed();
          // await Scheduler.instance().schedule();
      }
      catch (error) {
          Logger.instance().log('An error occurred while warming up.' + error.message);
      }
  }

  setupDatabaseConnection = async () => {

      const dbClient = new DbClient();
      await dbClient.createDatabase();

      if (process.env.NODE_ENV === 'test') {
          //Note: This is only for test environment
          //Drop all tables in db
          await dbClient.dropDatabase();
          await dbClient.createDatabase();
      }
      await dbClient.migrate();
  }

  public start = async(): Promise<void> => {
      try {
          await this.warmUp();

          process.on('exit', code => {
              Logger.instance().log(`Process exited with code: ${code}`);
          });

          //Start listening
          await this.listen();

      }
      catch (error){
          Logger.instance().log('An error occurred while starting appointment service.' + error.message);
      }
  };

  private setupMiddlewares = async (): Promise<boolean> => {

      return new Promise((resolve, reject) => {
          try {
              this._app.use(express.urlencoded({ extended: true }));
              this._app.use(express.json());
              this._app.use(helmet());
              this._app.use(cors());

              const MAX_UPLOAD_FILE_SIZE = ConfigurationManager.MaxUploadFileSize();

              this._app.use(fileUpload({
                  limits            : { fileSize: MAX_UPLOAD_FILE_SIZE },
                  preserveExtension : true,
                  createParentPath  : true,
                  parseNested       : true,
                  useTempFiles      : true,
                  tempFileDir       : '/tmp/uploads/'
              }));

              // this.prisma.$use(async (params, next) => {
              //     // Check incoming query type
              //     if (params.model === 'Schedule') {
              //         if (params.action === 'delete') {
              //         // Delete queries
              //         // Change action to an update
              //             params.action = 'update';
              //             params.args['data'] = { DeletedAt: new Date() };
              //         }
              //         if (params.action === 'deleteMany') {
              //         // Delete many queries
              //             params.action = 'updateMany';
              //             if (params.args.data !== undefined) {
              //                 params.args.data['deletedAt'] = new Date();
              //             } else {
              //                 params.args['data'] = { DeletedAt: new Date() };
              //             }
              //         }
              //     }
              //     return next(params);
              // });
              resolve(true);
          }
          catch (error) {
              reject(error);
          }
      });
  };

  private listen = () => {

  const port = 50051;
    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
      Logger.instance().log('Server is up and listening on port ' + port.toString());
      server.start();
    });
    }

      // return new Promise((resolve, reject) => {
      //     try {
      //         const port = process.env.PORT;
      //         const server = this._app.listen(port, () => {
      //             const serviceName = 'appointment service api' + '-' + process.env.NODE_ENV;
      //             Logger.instance().log(serviceName + ' is up and listening on port ' + process.env.PORT.toString());
      //             this._app.emit("server_started");
      //         });
      //         this._server = server;
      //         resolve(this._app);
      //     }
      //     catch (error) {
      //         reject(error);
      //     }
      // });
  };


  
