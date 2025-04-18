import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class AuthCotroller {
    async authMiddleware(req, res) {
        try {
            const authHeader = req.headers['authorization'];

            if (!authHeader) {
                return res.status(401).json({ message: 'Authorization header missing' });
            }

            const response = await axios.post(`${process.env.AUTH_URL}/auth/protected`, {
                headers: {
                    Authorization: authHeader,
                },
            });

            if (response.status === 200) {
                req.user = response.data.user;
                next();
            } else {
                return res.status(401).json({message: response.data.message, is_logined: response.data.is_logined})
            }
        } catch (error) {
            console.error(error)
            res.json({ message: "Error on the server" });
        }
    }
}

export default new AuthCotroller();
