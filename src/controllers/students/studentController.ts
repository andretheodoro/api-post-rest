import { Request, Response } from 'express';
import { getAllPosts, findPostById } from '../../models/students/studentModel';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts(req.db);  // Acesso à conexão do banco de dados
    res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};


export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    if (isNaN(Number(id))) {
      res.status(400).json({ message: 'ID em formato inválido' });
      return;
    }
  
    try {
      const post = await findPostById(req.db, Number(id));
  
      if (!post) {
        res.status(404).json({ message: 'Post não encontrado' });
      } else {
        res.json(post);
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
  