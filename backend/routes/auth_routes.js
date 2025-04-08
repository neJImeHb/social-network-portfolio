import Router from 'express';
import AuthController from '../controller/auth_controller.js';

const AuthRouter = new Router();

AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/protected', AuthController.authToken, AuthController.protected)

export default AuthRouter;