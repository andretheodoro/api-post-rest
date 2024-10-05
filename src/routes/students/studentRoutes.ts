import { Router } from 'express'
import {
    getPosts,
    getPostById,
} from '../../controllers/students/studentController'

const studentRouter = Router()

//GET /posts - Lista de Posts:
studentRouter.get('/', getPosts)

//GET /posts/:id - Leitura de Posts:
studentRouter.get('/:id', getPostById)

export default studentRouter
