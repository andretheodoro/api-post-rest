import { IPost } from '../posts/post.interface'
import { database } from '../../lib/pg/db'

export const getAllPosts = async (): Promise<IPost[]> => {
    try {
        const result = await database.clientInstance?.query(
            `SELECT id, title, author, description, to_char(CREATION, 'YYYY-MM-DD') creation, to_char(update_date, 'YYYY-MM-DD') update_date, idteacher FROM posts`,
        )
        return result?.rows || []
    } catch (err) {
        console.error('Erro ao buscar posts no BD', err)
        throw err
    }
}

export const findPostById = async (id: number): Promise<IPost | null> => {
    try {
        const result = await database.clientInstance?.query(
            `SELECT id, title, author, description, to_char(CREATION, 'YYYY-MM-DD') creation, to_char(update_date, 'YYYY-MM-DD') update_date, idteacher FROM posts WHERE id = $1`,
            [id],
        )

        if (result?.rows.length === 0) {
            return null
        }

        return result?.rows[0] || []
    } catch (err) {
        console.error('Erro ao pesquisar Post por ID no BD', err)
        throw err
    }
}
