import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { BusinessNodesControllerDelegate } from './business.nodes.controller.delegate';
import { BaseController } from '../base.controller';

export class BusinessNodesController extends BaseController {

    //#region member variables and constructors

    _delegate: BusinessNodesControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new BusinessNodesControllerDelegate();
    }

     //#endregion

    //  create = async (request: express.Request, response: express.Response): Promise <void> => {
    //     try {
    //          await this.authorize('Business.Nodes.Create', request, response, false);
    //         const record = await this._delegate.create(request.body);
    //         const message = 'Business node added successfully!';
    //         ResponseHandler.success(request, response, message, 201, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };



};