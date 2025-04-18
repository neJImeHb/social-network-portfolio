import Router from 'express';
import UserController from '../controllers/user_controller.js';
import AuthController from '../controllers/auth_cotroller.js';
import upload from '../components/multer_component.js';

const UserRouter = new Router();

UserRouter.post('/change_avatar/:id', AuthController.authMiddleware, upload.single('file'), UserController.changeAvatar)

export default UserRouter;