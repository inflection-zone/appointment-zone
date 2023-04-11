import express from 'express';
import { BusinessUserSkillController } from './business.user.skill.controller';
import { Loader } from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new BusinessUserSkillController();

    router.post('', controller.create);
    router.post('/create-many', controller.createMany);

     router.put('/:id', authenticator.authenticateClient,controller.update);
     router.delete('/:id', authenticator.authenticateClient, controller.delete);

     router.get('/search', authenticator.authenticateClient, controller.search);
     router.get('/:id', authenticator.authenticateClient, controller.getById);
     
    app.use('/api/v1/business-user-skills', router);
};
