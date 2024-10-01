import { Router } from 'express'
import {
    getPosts,
    getPostById,
} from '../../controllers/students/studentController'
import { authMiddleware } from '../../middleware/authMiddleware'

const studentRouter = Router()

//GET /posts - Lista de Posts:
studentRouter.get('/', authMiddleware, getPosts)

//GET /posts/:id - Leitura de Posts:
studentRouter.get('/:id', authMiddleware, getPostById)

export default studentRouter
