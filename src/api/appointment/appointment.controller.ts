import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { AppointmentControllerDelegate } from './appointment.controller.delegate';
import { BaseController } from '../base.controller';

export class AppointmentController extends BaseController {

    //#region member variables and constructors

    _delegate: AppointmentControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new AppointmentControllerDelegate();
    }

     //#endregion
    findAvailableSlots = async(request: express.Request, response: express.Response): Promise < void > => {
        try {
            await this.authorize('Appointment.Search', request, response, false);
            const searchResults = await this._delegate.findAvailableSlots(request.query, request.params.businessId, request.params.businessNodeId, request.params.businessServiceId);
            const message = 'Appointment records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        }
        catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }
}
