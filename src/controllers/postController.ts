import { Request, Response } from 'express';
import { insertPost, getAllPosts, findPostById, updatePostById, Post, findPostByIdTeacher, deletePostById, postExists, searchPostsByKeyword } from '../models/models';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts(req.db);  // Acesso à conexão do banco de dados
    res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, author, description, creation, idteacher } = req.body;

  // Verificar se todos os campos obrigatórios foram fornecidos
  if (!title || !author || !description || !creation || !idteacher) {
    res.status(400).json({ message: 'Verifique os campos obrigatórios' });
    return;
  }

  // Validar a data
  if (!isValidDate(creation)) {
    res.status(400).json({ message: 'Data de Criação inválida!' });
    return;
  }

  // Criar o objeto do post
  const newPost: Post = {
    title,
    author,
    description,
    creation: new Date(creation),
    idteacher: Number(idteacher),
  };

  try {
    await insertPost(req.db, newPost);
    res.status(201).json({ message: 'Post criado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
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
  const { title, author, description, creation, update_date, idteacher } = req.body;

  // Verificar se todos os campos obrigatórios foram fornecidos
  if (!title || !author || !description || !creation || !idteacher || !update_date) {
    res.status(400).json({ message: 'Verifique os campos obrigatórios!' });
    return;
  }

   // Validar a data
   if (!isValidDate(creation)) {
    res.status(400).json({ message: 'Data de Criação inválida!' });
    return;
  }

  if (!isValidDate(update_date)) {
    res.status(400).json({ message: 'Data de Criação inválida!' });
    return;
  }

  // Verificar se o post existe
  const exists = await postExists(req.db, Number(id));
  if (!exists) {
    res.status(404).json({ message: 'Post não encontrado' });
    return;
  }

  // Criar o objeto post
  const updatedPost: Post = {
    title,
    author,
    description,
    creation: new Date(creation), 
    update_date: new Date(update_date),
    idteacher: Number(idteacher),
  };

  try {
    await updatePostById(req.db, Number(id), updatedPost);
    res.status(200).json({ message: 'Post atualizado com sucesso!' });
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
    if (isNaN(Number(id))) {
      res.status(400).json({ message: 'ID em formato inválido' });
      return;
    }

    // Verificar se o post existe
    const exists = await postExists(req.db, Number(id));
    if (!exists) {
      res.status(404).json({ message: 'Post não encontrado' });
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