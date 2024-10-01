import { Pool } from 'pg';
import { Post } from '../posts/post.interface';

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


export const findPostByIdTeacher = async (db: Pool, id: number): Promise<Post[]> => {
  try {
    const result = await db.query(`SELECT id, title, author, description, to_char(CREATION, 'YYYY-MM-DD') creation, update_date, idteacher FROM posts WHERE idteacher = $1`, [id]);
    return result.rows;
  } catch (err) {
    console.error('Erro ao pesquisar Post por ID no BD', err);
    throw err;
  }
};
export const findLastPost = async (db: Pool): Promise<number | null> => {
    try {
      const result = await db.query('SELECT max(id) AS maxid FROM posts');
      const maxId = result.rows[0].maxid;
  
      return maxId !== null ? maxId : null; // Retorna o maxId ou null se não houver posts
    } catch (err) {
      console.error('Erro ao pesquisar Post por ID no BD', err);
      throw err;
    }
};
  

// Função para atualizar um post existente
export const updatePostById = async (db: Pool, id: number, post: Post): Promise<void> => {
  const { title, author, description, update_date, idteacher } = post;

  try {
    await db.query(
      'UPDATE posts SET title = $1, author = $2, description = $3, update_date = $4, idteacher = $5 WHERE id = $6',
      [title, author, description, update_date, idteacher, id]
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
      `SELECT id, title, author, description, to_char(CREATION, 'YYYY-MM-DD') creation, update_date, idteacher 
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