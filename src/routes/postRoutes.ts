import { Router } from 'express';
import { getPosts, getPostById, createPost, updatePost, getPostByIdTeacher, deletePost, searchPosts} from '../controllers/postController';
import { validateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', validateToken, getPosts);
router.post('/', validateToken, createPost);

// Rota para buscar posts por palavra-chave
router.get('/search', validateToken, searchPosts);

router.get('/:id', validateToken, getPostById);
router.get('/professor/:id', validateToken, getPostByIdTeacher);
router.put('/:id', validateToken, updatePost);  

// Rota para excluir um post existente
router.delete('/:id', validateToken, deletePost);  // O id do post será passado na URL

export default router;
