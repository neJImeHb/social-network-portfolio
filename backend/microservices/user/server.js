import express from 'express';
import UserRouter from './routes/user_routes.js';
import CORS from 'cors';

const app = express();
app.use(CORS())
app.use(express.json());

const PORT = 8000

app.use('/user', UserRouter)

try {
  app.listen(PORT, () => {
    console.log(`Server started by url: http://localhost:${PORT}`)
  });
} catch (error) {
  console.error("Failed to start server:", error);
}