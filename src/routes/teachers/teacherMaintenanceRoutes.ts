import { Router } from 'express'
import {
    getTeacherByIdteste,
    createTeacher,
    deleteTeacher,
    getTeacher,
    updateTeacher,
} from '../../controllers/teachers/teacherController'
import { authMiddleware } from '../../middleware/authMiddleware'

const teacherMaintenanceRouter = Router()

//GET /teacher - Busca de Professores:
teacherMaintenanceRouter.get('/teacher', authMiddleware, getTeacher)

//GET /teacher/:id - Buscar Professor por ID:
teacherMaintenanceRouter.get('/teacher/:id', authMiddleware, getTeacherByIdteste)

//POST /teacher - Criação de Professores:
teacherMaintenanceRouter.post('/teacher', authMiddleware, createTeacher)

//PUT /teacher/:id - Edição de Professores:
teacherMaintenanceRouter.put('/teacher/:id', authMiddleware, updateTeacher)

//DELETE /teacher/:id - Exclusão de Professores:
teacherMaintenanceRouter.delete('/teacher/:id', authMiddleware, deleteTeacher)

export default teacherMaintenanceRouter
