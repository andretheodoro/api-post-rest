import app from './app';  // Importa o aplicativo Express configurado no app.ts
import dotenv from 'dotenv';  // Carrega as variáveis de ambiente do arquivo .env

dotenv.config();  // Inicializa as variáveis de ambiente

const PORT = process.env.PORT || 3000;  // Define a porta para o servidor
const environment = process.env.NODE_ENV || 'development';

if (environment !== 'test') {
  // Inicia o servidor e escuta as conexões
  const server = app.listen(PORT, () => {
    // Agora, você pode acessar o método address() no objeto server
    const addressInfo = server.address();
    console.log('Server listening on', addressInfo);
  });
}