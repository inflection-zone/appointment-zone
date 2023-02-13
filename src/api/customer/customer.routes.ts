import express from 'express';
import { CustomerController } from './customer.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new CustomerController();

    router.post('', controller.create);
    // router.put('/:id', authenticator.authenticateCustomer, controller.update);
    // router.delete('/:id', authenticator.authenticateCustomer, controller.delete);

    // router.post('/login-password', controller.loginWithPassword);
    // router.post('/login-otp', controller.loginWithOtp);
    // router.post('/generate-otp', controller.sendOtp);
    // router.post('/change-password', authenticator.authenticateCustomer, controller.changePassword);
    // router.post('/logout', authenticator.authenticateCustomer, controller.logout);

    // router.get('/search', authenticator.authenticateCustomer, controller.search);
     router.get('/:id', /*authenticator.authenticateCustomer,*/ controller.getById);

    // router.get('/session/:sessionId', controller.getBySessionId);

    app.use('/api/v1/customers', router);
};
