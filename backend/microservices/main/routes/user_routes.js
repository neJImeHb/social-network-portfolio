import Router from 'express';
import UserController from '../controller/user_controller.js';
import AuthController from '../controller/auth_cotroller.js';

const UserRouter = new Router();

UserRouter.post('/create_user', UserController.createUser);
UserRouter.get('/get', UserController.get);
UserRouter.post('/change_user_personal_data', UserController.changeUserPersonalData);
UserRouter.post('/change_avatar_filename/:id/:filename', UserController.changeAvatarFilename);

export default UserRouter;