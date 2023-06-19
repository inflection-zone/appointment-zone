import express from 'express';
import { AppointmentController } from './appointment.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new AppointmentController();

    //router.get('/:upcoming', authenticator.authenticateClient, controller.findAllUpcomingAppointmentsAtSpecificDuration);
    router.get('/business/:businessId/node/:businessNodeId/service/:businessServiceId/slots', authenticator.authenticateClient, controller.findAvailableSlots);
    router.get('/businessUser/:businessUserId/slots', authenticator.authenticateClient, controller.findAvailableSlotsForUser);
    // router.get('/can-book', authenticator.authenticateClient, controller.canCustomerBookThisSlot);

    // router.post('/book', authenticator.authenticateClient, controller.bookAppointment);
    // router.put('/:id', authenticator.authenticateClient, controller.update);
    // router.get('/by-display-id/:displayId', authenticator.authenticateClient, controller.getByDisplayId);
    // router.get('/:id', authenticator.authenticateClient, controller.getById);

    // router.get('/user/userId', authenticator.authenticateClient, controller.findByUser);
    // router.get('/node/nodeId', authenticator.authenticateClient, controller.findByNode);
    // router.get('/customer/customerId', authenticator.authenticateClient, controller.findByCustomer);
    // router.put('/cancel/:id', authenticator.authenticateClient, controller.cancel);
    // router.put('/complete/:id', authenticator.authenticateClient, controller.complete);
    // router.put('/confirm/:id', authenticator.authenticateClient, controller.confirm);

    app.use('/api/v1/appointments', router);
};
