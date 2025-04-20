import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class PostsController {
    async create(req, res) {
        try {
            const { description, only_friends_can_see, filenames } = req.body;
            const user_id = req.user.id

            if (!description && !filenames) {
                return res.status(400).json({ message: "You must provide a description or attach a file" })
            }

            if (filenames && !Array.isArray(filenames)) {
                return res.status(400).json({ message: "You must provide the filenames as an array" })
            }

            if (!user_id) {
                return res.status(400).json({ message: "User ID is missing" })
            }

            const create_post = await prisma.post.create({
                data: {
                    author_id: user_id,
                    description: String(description),
                    only_friends_can_see: only_friends_can_see ? only_friends_can_see : false,
                    filenames: filenames ? filenames : []
                }
            })

            res.json({ message: "Post successfully created", post: create_post })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Error on the server" })
        }
    }

    async getByID(req, res) {
        try {
            const post_id = req.params.id

            const current_post = await prisma.post.findFirst({
                where: {
                    id: Number(post_id)
                }
            })

            res.json(current_post)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Error on the server" })
        }
    }

    async getAllByUserID(req, res) {
        try {
            const user_id = req.user.id

            const posts = await prisma.post.findMany({
                where: {
                    author_id: Number(user_id)
                }
            })

            res.json(posts)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Error on the server" })
        }
    }
}

export default new PostsController();