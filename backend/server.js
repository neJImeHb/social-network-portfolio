import express from 'express';
import UserRouter from './routes/user_routes.js';
import AuthRouter from './routes/auth_routes.js';
import CORS from 'cors';
import multer from 'multer';

const app = express();
app.use(CORS())
app.use(express.json());

const enviroment = process.env

app.use('/user', UserRouter)
app.use('/auth', AuthRouter)
app.use('/static', express.static('files'));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.customPayload) {
        return res.status(err.statusCode || 400).json(err.customPayload || { message: err.message });
    }
    res.status(500).json({ message: 'Error on the server' });
});

app.listen(enviroment.PORT, () => {
    console.log(`Server started by url: http://localhost:${enviroment.PORT}`)
})