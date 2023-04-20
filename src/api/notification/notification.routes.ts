import express from 'express';
import { NotificationController } from './notification.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new NotificationController();

    router.post('', controller.create);
    router.put('/:id', authenticator.authenticateClient,controller.update);
    router.delete('/:id', authenticator.authenticateClient, controller.delete);
    router.get('/search', authenticator.authenticateClient, controller.search);
    router.get('/:id', authenticator.authenticateClient, controller.getById);
     
    app.use('/api/v1/notifications', router);
};
