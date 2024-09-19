import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'user',
//   host: 'db',
//   database: 'postgres',
//   password: '123456',
//   port: 5432,
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});


export const dbMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.db = pool;  // Anexa o pool de conexão ao objeto de requisição
  next();
};