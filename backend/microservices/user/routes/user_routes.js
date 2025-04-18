import Router from 'express';
import UserController from '../controller/user_controller.js';
import AuthController from '../controller/auth_cotroller.js';

const UserRouter = new Router();

UserRouter.post('/create', UserController.create);
UserRouter.get('/get', UserController.get);
UserRouter.post('/change_personal_data', AuthController.authMiddleware, UserController.changePersonalData);
UserRouter.post('/change_avatar_filename/:id/:filename', UserController.changeAvatarFilename);

export default UserRouter;