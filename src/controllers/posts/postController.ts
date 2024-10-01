import { Request, Response } from 'express';
import { findLastPost } from '../../models/teachers/teacherModel';

export const getLastPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const idPost = await findLastPost(req.db);
  
      if (idPost == null) {
        res.status(404).json({ message: 'Professor(a) não possui Posts criados.' });
      } else {
        res.json({ id: idPost }); // Retorna apenas o id em um objeto
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  