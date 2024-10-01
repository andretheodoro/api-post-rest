import { getLastPost } from '../../controllers/posts/postController'
import { Router } from 'express'
import { authMiddleware } from '../../middleware/authMiddleware'

const postRouter = Router()

//GET /posts - Listagem de Último Post Criado:
postRouter.get('/lastPost', authMiddleware, getLastPost)

export default postRouter
