import { Pool } from 'pg';
import { Post } from '../posts/post.interface';

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