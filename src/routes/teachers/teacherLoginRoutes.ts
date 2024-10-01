import { Router } from 'express'
import { login } from '../../controllers/teachers/teacherController'

const teacherLoginRouter = Router()

teacherLoginRouter.post('/professor/login', login)
export default teacherLoginRouter
