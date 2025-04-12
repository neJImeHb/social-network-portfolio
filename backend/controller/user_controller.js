import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, '../files/profile_avatars');

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
            res.status(400).json({ message: "Error on the server" });
        }
    }

    async changeUserAvatar(req, res) {
        try {
            const file = req.file;
            const user_id = req.user.id

            const maxSize = 5 * 1024 * 1024 // 5mb

            if (!file) {
                return res.status(400).json({ message: 'File not transferred' });
            }

            console.log(file.size, maxSize)

            if (file.size > maxSize) {
                return res.status(400).json({ message: 'Max file size is 5MB' })
            }

            const fileName = `user_avatar-date-${Date.now()}-user_id-${user_id}${path.extname(file.originalname)}`;
            const filePath = path.join(uploadDir, fileName);

            const user = await prisma.user.findUnique({
                where: { id: user_id }
            });

            // Якщо у користувача вже є аватар — видаляємо файл
            if (user.avatar_filename) {
                const oldFilePath = path.join(uploadDir, user.avatar_filename);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            console.log(file)
            // Зберігаємо файл вручну з буфера
            fs.writeFileSync(filePath, file.buffer);

            await prisma.user.update({
                where: {
                    id: user_id
                },
                data: {
                    avatar_filename: fileName
                }
            })

            return res.json({ message: 'Avatar succesfully changed', avatar_filename: fileName });
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: "Error on the server" });
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
}

export default new UserController();
