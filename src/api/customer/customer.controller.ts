import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { CustomerControllerDelegate } from './customer.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class CustomerController extends BaseController {

    //#region member variables and constructors

    _delegate: CustomerControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new CustomerControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            // await this.authorize('Customer.Create', request, response, false);
            const record = await this._delegate.create(request.body);
            const message = 'Customer added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
