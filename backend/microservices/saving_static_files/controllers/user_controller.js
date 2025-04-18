import axios from "axios";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, '../files/profile_avatars');

const environment = process.env

class UserController {
    async changeAvatar(req, res) {
        try {
            const file = req.file;
            const user_id = req.params.id

            const maxSize = 5 * 1024 * 1024 // 5mb

            if (!file) {
                return res.status(400).json({ message: 'File not transferred' });
            }

            if (file.size > maxSize) {
                return res.status(400).json({ message: 'Max file size is 5MB' })
            }

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const fileName = `user_avatar-date-${Date.now()}-user_id-${user_id}${path.extname(file.originalname)}`;
            const filePath = path.join(uploadDir, fileName);

            const user = (await axios.get(`${process.env.MAIN_URL}/user/get?id=${user_id}`)).data

            // Якщо у користувача вже є аватар — видаляємо файл
            if (user.avatar_filename) {
                const oldFilePath = path.join(uploadDir, user.avatar_filename);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            // Зберігаємо файл вручну з буфера
            fs.writeFileSync(filePath, file.buffer);

            const main_response = await axios.post(`${environment.MAIN_URL}/user/change_avatar_filename/${user_id}/${fileName}`)
            if (main_response.status === 200) {
                res.json({ message: main_response.data.message, avatar_filename: main_response.data.avatar_filename });
            } else {
                res.status(main_response.status).json({ message: main_response.data.message })
            }
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: "Error on the server" });
        }
    }
}

export default new UserController();