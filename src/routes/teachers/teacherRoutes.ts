import { Router } from 'express'
import {
    createPost,
    updatePost,
    getPostByIdTeacher,
    deletePost,
    searchPosts,
    getTeacher,
    createTeacher,
    updateTeacher,
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

//GET /teacher - Busca de Professores:
teacherRouter.get('/teacher', getTeacher)

//POST /teacher - Criação de Professores:
teacherRouter.post('/teacher', authMiddleware, createTeacher)

//PUT /teacher/:id - Edição de Professores:
teacherRouter.put('/teacher/:id', authMiddleware, updateTeacher)

export default teacherRouter
