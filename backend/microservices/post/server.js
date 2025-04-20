import express from 'express';
import CORS from 'cors';
import PostRouter from './routes/post_router.js';

const app = express();
app.use(CORS())
app.use(express.json());

const PORT = 6000

app.use('/post', PostRouter)

app.listen(PORT, () => {
    console.log(`Server started by url: http://localhost:${PORT}`)
})