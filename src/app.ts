import express from 'express';
import studentRouter from './routes/students/studentRoutes';  
import teacherRouter from './routes/teachers/teacherRoutes';  
import { dbMiddleware } from './middleware/dbMiddleware';

export const app = express();

// Middleware para analisar o corpo das requisições em formato JSON
app.use(express.json());

// Middleware para adicionar a conexão com o banco ao request
app.use(dbMiddleware);

// Rotas
app.use('/api/posts', teacherRouter);  
app.use('/api/posts', studentRouter);  

export default app;
