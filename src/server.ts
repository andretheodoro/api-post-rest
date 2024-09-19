import app from './app';  // Importa o aplicativo Express configurado no app.ts
import dotenv from 'dotenv';  // Carrega as variáveis de ambiente do arquivo .env

dotenv.config();  // Inicializa as variáveis de ambiente

const PORT = process.env.PORT || 3000;  // Define a porta para o servidor

// Inicia o servidor e escuta as conexões
app
  .listen({
    host: '0.0.0.0',
    port: PORT,
  });