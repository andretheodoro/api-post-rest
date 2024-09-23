import { Router } from 'express';
import { getPosts, getPostById } from '../../controllers/students/studentController';
import { validateToken } from '../../middleware/authMiddleware';

const studentRouter = Router();

//GET /posts - Lista de Posts:
studentRouter.get('/', validateToken, getPosts);

//GET /posts/:id - Leitura de Posts:
studentRouter.get('/:id', validateToken, getPostById);

export default studentRouter;