import express from 'express';
import {
    UserRoleController
} from './user.role.controller';
import {
    Loader
} from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new UserRoleController();

    router.post('/', authenticator.authenticateUser, controller.create);
    //router.get('/search', authenticator.authenticateUser, controller.search);
     router.get('/:id', authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/user-roles', router);
};
