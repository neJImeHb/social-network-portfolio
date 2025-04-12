import Router from 'express';
import UserController from '../controller/user_controller.js';
import AuthController from '../controller/auth_controller.js'
import upload from '../components/multer_component.js';

const UserRouter = new Router();

UserRouter.post('/create_user', UserController.createUser);
UserRouter.post('/get_user', UserController.getUser);
UserRouter.post('/change_user_avatar', AuthController.authToken, upload.single('file'), UserController.changeUserAvatar)
UserRouter.post('/change_user_personal_data', AuthController.authToken, UserController.changeUserPersonalData);

export default UserRouter;