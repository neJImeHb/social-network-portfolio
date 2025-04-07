import Router from 'express';
import UserController from '../controller/user_controller.js';

const UserRouter = new Router();

UserRouter.post('/create_user', UserController.createUser);
UserRouter.post('/get_user', UserController.getUser);

export default UserRouter;