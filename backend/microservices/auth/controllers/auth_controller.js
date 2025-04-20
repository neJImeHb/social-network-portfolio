import axios from "axios"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = (await axios.get(`${process.env.MAIN_URL}/user/get?email=${email}`)).data

            if (!user) {
                return res.json({ auth_message: 'User is not found' })
            }

            const passwords_is_coincides = await bcrypt.compare(password, user.password)

            if (!passwords_is_coincides) {
                return res.json({ auth_message: 'Email does not coincide with password' })
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.json({ auth_message: "Successfully authorization", user: user, token: token })

        } catch (error) {
            console.error(error)
            res.status(400).json({ message: "Error on the server" });
        }
    }

    async authToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

            if (!token) return res.status(401).json({ message: 'No token provided', is_logined: false });


            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(401).json({ message: 'Token is not valid', is_logined: false });
                }
                req.user = user;
                next();
            });
        } catch (error) {
            console.error(error)
            return res.status(400).json({ message: "Error on the server" });
        }
    }

    async protected(req, res) {
        res.json({ user: req.user, is_logined: true })
    }
}

export default new AuthController();
