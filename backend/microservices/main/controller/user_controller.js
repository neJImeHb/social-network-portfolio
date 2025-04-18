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
                    name: name,
                    surname: surname,
                    email: email,
                    password: hashed_password,
                    bio: {
                        create: { description: "" }
                    }
                }
            });

            res.json({ message: "Account successfully created", user: create_user });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Error on the server" });
        }
    }

    async get(req, res) {
        try {
            const { id, email } = req.query;

            let user

            if (id) {
                user = await prisma.user.findFirst({
                    where: {
                        id: Number(id)
                    }
                })
            } else if (email) {
                user = await prisma.user.findFirst({
                    where: {
                        email: email
                    }
                })
            } else {
                return res.status(400).json({ message: 'ID and Email is missing' });
            }

            if (!user) {
                return res.status(400).json({ message: 'User is undefined' });
            }

            res.json(user)
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: "Error on the server" });
        }
    }

    async changeAvatarFilename(req, res) {
        try {
            const { id, filename } = req.params;

            if (!id || !filename) {
                return res.status(400).json({ message: 'ID or filename is missing' });
            }

            const current_user = await prisma.user.update({
                where: { id: Number(id) },
                data: {
                    avatar_filename: filename
                }
            });

            res.json({ message: 'Avatar succesfully changed', avatar_filename: current_user.avatar_filename });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(400).json({ message: 'User not found' });
            }

            console.error(error);
            res.status(400).json({ message: 'Server error' });
        }
    }

    async changeUserPersonalData(req, res) {
        try {
            const { username, name, surname, description } = req.body;
            const user_id = req.user.id;

            const user = await prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    username: username,
                    name: name,
                    surname: surname,
                    bio: {
                        update: {
                            description: description
                        }
                    }
                },
                include: {
                    bio: true
                }
            })

            res.json({ message: "Data successfully updated", user: user })
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: "Error on the server" });
        }
    }

    async 
}

export default new UserController();
