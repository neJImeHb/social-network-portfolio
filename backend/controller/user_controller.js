import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class UserController {
    async createUser(req, res) {
        try {
            const { name, surname, email, password } = req.body;

            if (!name || !surname || !email || !password) {
                return res.json({ message: "Missing required fields" });
            }

            const hashed_password = await bcrypt.hash(password, 10);
            const create_user = await prisma.user.create({
                data: {
                    name: name,
                    surname: surname,
                    email: email,
                    password: hashed_password,
                    bio: {
                        create: { description: "" }
                    }
                }
            });

            res.json(create_user);
        } catch (error) {
            console.error(error);
            res.json({ message: "Error on the server" });
        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.body;

            const user = await prisma.user.findFirst({
                where: {
                    id: id
                }
            })

            res.json(user)
        } catch (error) {
            console.error(error)
            res.json({ message: "Error on the server" });
        }
    }
}

export default new UserController();
