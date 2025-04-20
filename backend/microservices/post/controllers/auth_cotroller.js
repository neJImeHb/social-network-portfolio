import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class AuthCotroller {
    async authMiddleware(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];

            const response = await axios.get(`${process.env.AUTH_URL}/auth/protected`, {
                headers: {
                    authorization: authHeader,
                },
            });

            if (response.status == 200) {
                req.user = response.data.user;
                next();
            }
        } catch (error) {
            // Axios при помилці викликає виключення, тому відловлюємо його
            if (error.response) {
                return res.status(error.response.status).json({
                    message: error.response.data.message,
                    is_logined: error.response.data.is_logined
                });
            } else {
                console.error(error)
                res.status(400).json({ message: "Error on the server" });
            }
        }
    }
}

export default new AuthCotroller();
