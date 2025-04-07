import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            if (!user) {
                return res.json({auth_message: 'No user with this email address found'})
            }

            const passwords_is_coincides = await bcrypt.compare(password, user.password)

            if (passwords_is_coincides) {
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                res.json({user: user, token: token})
            } else {
                res.json({auth_message: 'Email does not coincide with password'})
            }

        } catch (error) {
            console.error(error)
            res.json({ message: "Error on the server" });
        }
    }
}

export default new AuthController();
