import Router from 'express';
import AuthController from '../controllers/auth_cotroller.js'
import PostsController from '../controllers/posts_controller.js'

const PostRouter = new Router();

PostRouter.post('/create', AuthController.authMiddleware, PostsController.create)
PostRouter.get('/get/:id', AuthController.authMiddleware, PostsController.getByID)
PostRouter.get('/get_all_by_user_id', AuthController.authMiddleware, PostsController.getAllByUserID)

export default PostRouter