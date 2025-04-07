import express from 'express';
import UserRouter from './routes/user_routes.js';
import AuthRouter from './routes/auth_routes.js';
import CORS from 'cors';

const app = express();
app.use(CORS())
app.use(express.json());

const enviroment = process.env

app.use('/user', UserRouter)
app.use('/auth', AuthRouter)

app.listen(enviroment.PORT, () => {
    console.log(`Server started by url: http://localhost:${enviroment.PORT}`)
})