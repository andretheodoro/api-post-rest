import { Router } from 'express'
import {
    createPost,
    updatePost,
    getPostByIdTeacher,
    deletePost,
    searchPosts,
} from '../../controllers/teachers/teacherController'
import { authMiddleware } from '../../middleware/authMiddleware'

const teacherRouter = Router()

//GET /posts/search - Busca de Posts:
teacherRouter.get('/search', searchPosts)

//POST /posts - Criação de postagens:
teacherRouter.post('/', authMiddleware, createPost)

//PUT /posts/:id - Edição de postagens:
teacherRouter.put('/:id', authMiddleware, updatePost)

//GET /posts - Listagem de Todas as Postagens:
teacherRouter.get('/professor/:id', authMiddleware, getPostByIdTeacher)

//DELETE /posts/:id - Exclusão de Postagens:
teacherRouter.delete('/:id', authMiddleware, deletePost)

export default teacherRouter
