import { Router } from 'express'
import { login } from '../../controllers/teachers/teacherController'
import { isAuthenticated } from '../../middleware/authMiddleware'

const teacherLoginRouter = Router()

teacherLoginRouter.post('/teacher/login', login)
teacherLoginRouter.get('/teacher/isAuthenticated', isAuthenticated)
export default teacherLoginRouter
