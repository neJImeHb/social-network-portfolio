import Router from 'express';
import AuthController from '../controllers/auth_controller.js';

const AuthRouter = new Router();

AuthRouter.post('/login', AuthController.login)
AuthRouter.get('/protected', AuthController.authToken, AuthController.protected)

export default AuthRouter;