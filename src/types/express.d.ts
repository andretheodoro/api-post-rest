// src/types/express.d.ts
import { Pool } from 'pg';

// Estende a interface Request do Express para incluir a propriedade db
declare global {
  namespace Express {
    interface Request {
      db: Pool;
    }
  }
}
