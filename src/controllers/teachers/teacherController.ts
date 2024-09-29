import { Request, Response } from 'express';
import { insertPost, updatePostById, findPostByIdTeacher, deletePostById, postExists, searchPostsByKeyword, findLastPost } from '../../models/teachers/teacherModel';
import { Post } from '../../models/posts/post.interface';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, author, description, idteacher } = req.body;

  // Verificar se todos os campos obrigatórios foram fornecidos
  if (!title || !author || !description || !idteacher) {
    res.status(400).json({ message: 'Verifique os campos obrigatórios' });
    return;
  }

  // Criar o objeto do post
  const newPost: Post = {
    title,
    author,
    description,
    creation: new Date(),
    idteacher: Number(idteacher),
  };

  try {
    await insertPost(req.db, newPost);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const getPostByIdTeacher = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).json({ message: 'ID em formato inválido' });
    return;
  }

  try {
    const post = await findPostByIdTeacher(req.db, Number(id));

    if (post.length == 0) {
      res.status(404).json({ message: 'Professor(a) não possui Posts criados.' });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controlador para atualizar um post existente
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Pega o id do post da URL
  const { title, author, description, idteacher } = req.body;
    // Verificar se o post existe
    const exists = await postExists(req.db, Number(id));
    if (!exists) {
      res.status(404).json({ message: 'Post não encontrado' });
      return;
    }

  // Verificar se todos os campos obrigatórios foram fornecidos
  if (!title || !author || !description || !idteacher) {
    res.status(400).json({ message: 'Verifique os campos obrigatórios!' });
    return;
  }

  // Criar o objeto post
  const updatedPost: Post = {
    title,
    author,
    description,
    creation: new Date(),
    update_date: new Date(),
    idteacher: Number(idteacher),
  };

  try {
    await updatePostById(req.db, Number(id), updatedPost);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const isValidDate = (date: string): boolean => {
  const parsedDate = Date.parse(date);
  return !isNaN(parsedDate);
};

// Controlador para excluir um post existente
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    // Verificar se o post existe
    const exists = await postExists(req.db, Number(id));
    if (!exists) {
      res.status(404).json({ message: 'Post não encontrado' });
      return;
    }

    if (isNaN(Number(id))) {
      res.status(400).json({ message: 'ID em formato inválido' });
      return;
    }
    
    // Tenta excluir o post pelo ID
    await deletePostById(req.db, Number(id));
    res.status(200).json({ message: 'Post deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controlador para buscar posts por palavra-chave
export const searchPosts = async (req: Request, res: Response): Promise<void> => {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    res.status(400).json({ message: 'Palavra chave é obrigatória' });
    return;
  }

  try {
    const posts = await searchPostsByKeyword(req.db, keyword);

    if (posts.length === 0) {
      res.status(404).json({ message: 'Nenhum Post encontrado para a palavra chave informada.' });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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
