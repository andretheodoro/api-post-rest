import express from 'express'
import studentRouter from './routes/students/studentRoutes'
import teacherRouter from './routes/teachers/teacherRoutes'
import postRouter from './routes/posts/postsRoutes'
import teacherLoginRouter from './routes/teachers/teacherLoginRoutes'
import setupSwagger from './swagger'
import errorHandler from './middleware/errorHandler'

export const app = express()

// Middleware para analisar o corpo das requisições em formato JSON
app.use(express.json())

// Configurar Swagger
setupSwagger(app)

// Rotas
app.use('/api/posts', postRouter)
app.use('/api/posts', teacherRouter)
app.use('/api/posts', studentRouter)
app.use('/api', teacherLoginRouter)

app.use(errorHandler) // Filtro de exceção deve ser o último middleware

export default app
