import { Router } from 'express'
import { login } from '../../controllers/teachers/teacherController'
import { isAuthenticated } from '../../middleware/authMiddleware'

const teacherLoginRouter = Router()

teacherLoginRouter.post('/professor/login', login)
teacherLoginRouter.get('/professor/isAuthenticated', isAuthenticated)
export default teacherLoginRouter
