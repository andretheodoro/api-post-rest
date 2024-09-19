import express from 'express';
import postRoutes from './routes/postRoutes';  // Importa as rotas de usuários
import { dbMiddleware } from './middleware/dbMiddleware';  // Importa o middleware de conexão com o banco

export const app = express();

// Middleware para analisar o corpo das requisições em formato JSON
app.use(express.json());

// Middleware para adicionar a conexão com o banco ao request
app.use(dbMiddleware);

// Rotas
app.use('/api/posts', postRoutes);  // Define o prefixo das rotas de usuários

export default app;
