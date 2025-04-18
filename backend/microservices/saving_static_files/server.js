import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import CORS from 'cors';
import multer from 'multer';
import UserRouter from './routes/user_router.js';

const app = express();
app.use(CORS())
app.use(express.json());

const PORT = 7000

app.use('/user', UserRouter)
app.use('/static', express.static('files'));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.customPayload) {
        return res.status(err.statusCode || 400).json(err.customPayload || { message: err.message });
    }
    res.status(500).json({ message: 'Error on the server' });
});

app.listen(PORT, () => {
    console.log(`Server started by url: http://localhost:${PORT}`)
})