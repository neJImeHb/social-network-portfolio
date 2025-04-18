import express from 'express';
import AuthRouter from './routes/auth_router.js';
import CORS from 'cors';

const app = express();
app.use(CORS())
app.use(express.json());

const PORT = 9000

app.use('/auth', AuthRouter)

app.listen(PORT, () => {
    console.log(`Server started by url: http://localhost:${PORT}`)
})