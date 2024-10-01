import {getLastPost} from '../../controllers/posts/postController';
import { Router } from 'express';
import { validateToken } from '../../middleware/authMiddleware';

const postRouter = Router();

//GET /posts - Listagem de Último Post Criado:
postRouter.get('/lastPost', validateToken, getLastPost);

export default postRouter;