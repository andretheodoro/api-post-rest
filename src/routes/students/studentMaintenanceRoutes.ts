import { Router } from 'express'
import { authMiddleware } from '../../middleware/authMiddleware'
import {
    createStudent,
    deleteStudent,
    getStudent,
    updateStudent,
} from '../../controllers/students/studentController'

const studentMaintenanceRouter = Router()

//GET /student - Busca de Estudantes:
studentMaintenanceRouter.get('/student', authMiddleware, getStudent)

//POST /student - Criação de Estudantes:
studentMaintenanceRouter.post('/student', authMiddleware, createStudent)

//PUT /student/:id - Edição de Estudantes:
studentMaintenanceRouter.put('/student/:id', authMiddleware, updateStudent)

//DELETE /student/:id - Exclusão de Estudantes:
studentMaintenanceRouter.delete('/student/:id', authMiddleware, deleteStudent)

export default studentMaintenanceRouter
