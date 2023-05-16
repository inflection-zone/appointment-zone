import express from 'express';
import { BusinessNodeHourController } from './business.node.hour.controller';
import { Loader } from '../../startup/loader';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new BusinessNodeHourController();

    router.post('', controller.create);
    router.post('/add-multiple', controller.createMultiple);

     router.put('/:id', authenticator.authenticateClient,controller.update);
     router.put('/update-multiple/:businessNodeid', authenticator.authenticateClient,controller.updateMultiple);
     router.delete('/:id', authenticator.authenticateClient, controller.delete);

     router.get('/search', authenticator.authenticateClient, controller.search);
     router.get('/:id', authenticator.authenticateClient, controller.getById);
     
    app.use('/api/v1/business-node-hours', router);
};