import { Request, Response, NextFunction } from 'express';

// Middleware de validação de autenticação
export const validateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];  // Pega o token do cabeçalho Authorization

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;  // Garantir que a função pare aqui
  }

  // Exemplo básico de validação de token
  if (token !== '22e69816-4b10-46b2-9b77-6385860deed3') {
    res.status(403).json({ message: 'Invalid token' });
    return;  // Garantir que a função pare aqui
  }

  // Se o token for válido, prossegue para o próximo middleware ou rota
  next();
};
