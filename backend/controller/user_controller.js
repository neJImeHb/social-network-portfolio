import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class UserController {
    async createUser(req, res) {
        try {
            const { name, surname, email, password } = req.body;

            if (!name || !surname || !email || !password) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const hashed_password = await bcrypt.hash(password, 10);
            const create_user = await prisma.user.create({
                data: {
                    name,
                    surname,
                    email,
                    password: hashed_password,
                    bio: {
                        create: { description: "" }
                    }
                }
            });

            res.json(create_user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error on the server" });
        }
    }
}

export default new UserController();
