import express from 'express';
import {
    ApiClientController
} from './api.client.controller';
import {
    Loader
} from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new ApiClientController();

    router.post('/', controller.create);

    router.get('/:clientCode/current-api-key', controller.getCurrentApiKey);
    // router.put('/:clientCode/renew-api-key', controller.renewApiKey);

    //router.get('/search', authenticator.authenticateUser, controller.search);
    router.get('/:id', controller.getById);
    // router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/api_clients', router);
};
