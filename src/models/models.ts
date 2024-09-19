// src/models.ts
import { Pool } from 'pg';

export const insertPost = async (db: Pool, post: Post): Promise<void> => {
  const { title, author, description, creation, update_date, idteacher } = post;
  
  try {
    await db.query(
      'INSERT INTO posts (title, author, description, creation, update_date, idteacher) VALUES ($1, $2, $3, $4, $5, $6)',
      [title, author, description, creation, update_date, idteacher]
    );
  } catch (err) {
    console.error('Erro ao inserir um novo Post no BD', err);
    throw err;
  }
};

export const getAllPosts = async (db: Pool): Promise<Post[]> => {
  try {
    const result = await db.query('SELECT id, title, author, description, creation, update_date, idteacher FROM posts');
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar posts no BD', err);
    throw err;
  }
};

export const findPostById = async (db: Pool, id: number): Promise<Post | null> => {
  try {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error('Erro ao pesquisar Post por ID no BD', err);
    throw err;
  }
};

export const findPostByIdTeacher = async (db: Pool, id: number): Promise<Post[]> => {
  try {
    const result = await db.query('SELECT * FROM posts WHERE idteacher = $1', [id]);
    return result.rows;
  } catch (err) {
    console.error('Erro ao pesquisar Post por ID no BD', err);
    throw err;
  }
};

// Função para atualizar um post existente
export const updatePostById = async (db: Pool, id: number, post: Post): Promise<void> => {
  const { title, author, description, creation, update_date, idteacher } = post;

  try {
    await db.query(
      'UPDATE posts SET title = $1, author = $2, description = $3, creation = $4, update_date = $5, idteacher = $6 WHERE id = $7',
      [title, author, description, creation, update_date, idteacher, id]
    );
  } catch (err) {
    console.error('Erro ao atualizar um Post', err);
    throw err;
  }
};

// Função para excluir um post pelo id
export const deletePostById = async (db: Pool, id: number): Promise<void> => {
  try {
    await db.query('DELETE FROM posts WHERE id = $1', [id]);
  } catch (err) {
    console.error('Erro ao deletar um Post', err);
    throw err;
  }
};

// Função para verificar se um post existe pelo id
export const postExists = async (db: Pool, id: number): Promise<boolean> => {
  try {
    const result = await db.query('SELECT 1 FROM posts WHERE id = $1', [id]);
    return result.rows.length > 0;
  } catch (err) {
    console.error('Erro ao consultar Post', err);
    throw err;
  }
};

// Função para buscar posts por palavra-chave (no título ou na descrição)
export const searchPostsByKeyword = async (db: Pool, keyword: string) => {
  try {
    const searchTerm = `%${keyword}%`;  // Adicionar '%' para busca com LIKE
    const result = await db.query(
      `SELECT id, title, author, description, creation, idteacher 
       FROM posts 
       WHERE title ILIKE $1 OR description ILIKE $1`, 
      [searchTerm]
    );
    return result.rows;
  } catch (err) {
    console.error('Erro ao pesquisar Post por palavra chave', err);
    throw err;
  }
};

export interface Post {
  id?: number;
  title: string;
  author: string;
  description: string;
  creation: Date;
  update_date?: Date;
  idteacher: number;
}

export interface Teacher {
  id: number;
  name: string;
}