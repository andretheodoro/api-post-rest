import { Router } from 'express';
import { createPost, updatePost, getPostByIdTeacher, deletePost, searchPosts} from '../../controllers/teachers/teacherController';
import { validateToken } from '../../middleware/authMiddleware';

const teacherRouter = Router();

//GET /posts/search - Busca de Posts:
teacherRouter.get('/search', validateToken, searchPosts);

//POST /posts - Criação de postagens:
teacherRouter.post('/', validateToken, createPost);

//PUT /posts/:id - Edição de postagens:
teacherRouter.put('/:id', validateToken, updatePost);  

//GET /posts - Listagem de Todas as Postagens:
teacherRouter.get('/professor/:id', validateToken, getPostByIdTeacher);

//DELETE /posts/:id - Exclusão de Postagens:
teacherRouter.delete('/:id', validateToken, deletePost);  

export default teacherRouter;