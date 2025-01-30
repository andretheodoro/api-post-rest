import { database } from '../../lib/pg/db'
import { IPost } from '../posts/post.interface'
import { ITeacher } from './teacher.interface'

export const insertPost = async (post: IPost): Promise<void> => {
    const { title, author, description, creation, update_date, idteacher } =
        post

    try {
        await database.clientInstance?.query(
            'INSERT INTO posts (title, author, description, creation, update_date, idteacher) VALUES ($1, $2, $3, $4, $5, $6)',
            [title, author, description, creation, update_date, idteacher],
        )
    } catch (err) {
        console.error('Erro ao inserir um novo Post no BD', err)
        throw err
    }
}

export const findPostByIdTeacher = async (id: number): Promise<IPost[]> => {
    try {
        const result = await database.clientInstance?.query(
            `SELECT id, title, author, description, to_char(CREATION, 'YYYY-MM-DD') creation,  to_char(update_date, 'YYYY-MM-DD') update_date, idteacher FROM posts WHERE idteacher = $1`,
            [id],
        )
        return result?.rows || []
    } catch (err) {
        console.error('Erro ao pesquisar Post por ID no BD', err)
        throw err
    }
}
export const findLastPost = async (): Promise<number | null> => {
    try {
        const result = await database.clientInstance?.query(
            'SELECT max(id) AS maxid FROM posts',
        )
        const maxId = result?.rows[0].maxid

        return maxId !== null ? maxId : null // Retorna o maxId ou null se não houver posts
    } catch (err) {
        console.error('Erro ao pesquisar Post por ID no BD', err)
        throw err
    }
}

// Função para atualizar um post existente
export const updatePostById = async (
    id: number,
    post: IPost,
): Promise<void> => {
    const { title, author, description, update_date, idteacher } = post

    try {
        await database.clientInstance?.query(
            'UPDATE posts SET title = $1, author = $2, description = $3, update_date = $4, idteacher = $5 WHERE id = $6',
            [title, author, description, update_date, idteacher, id],
        )
    } catch (err) {
        console.error('Erro ao atualizar um Post', err)
        throw err
    }
}

// Função para excluir um post pelo id
export const deletePostById = async (id: number): Promise<void> => {
    try {
        await database.clientInstance?.query(
            'DELETE FROM posts WHERE id = $1',
            [id],
        )
    } catch (err) {
        console.error('Erro ao deletar um Post', err)
        throw err
    }
}

// Função para verificar se um post existe pelo id
export const postExists = async (id: number): Promise<boolean> => {
    try {
        const result = await database.clientInstance?.query(
            'SELECT 1 FROM posts WHERE id = $1',
            [id],
        )
        return (result?.rows || []).length > 0
    } catch (err) {
        console.error('Erro ao consultar Post', err)
        throw err
    }
}

// Função para buscar posts por palavra-chave (no título ou na descrição)
export const searchPostsByKeyword = async (keyword: string) => {
    try {
        const searchTerm = `%${keyword}%` // Adicionar '%' para busca com LIKE
        const result = await database.clientInstance?.query(
            `SELECT id, title, author, description, to_char(CREATION, 'YYYY-MM-DD') creation, to_char(update_date, 'YYYY-MM-DD') update_date, idteacher 
       FROM posts 
       WHERE title ILIKE $1 OR description ILIKE $1`,
            [searchTerm],
        )
        return result?.rows || []
    } catch (err) {
        console.error('Erro ao pesquisar Post por palavra chave', err)
        throw err
    }
}

export const loginTeacher = async (
    login: string,
    password: string,
): Promise<ITeacher | null> => {
    try {
        const result = await database.clientInstance?.query(
            'SELECT * FROM teacher  WHERE NAME = $1 and PASSWORD = $2',
            [login, password],
        )
        // console.log('conexão', database.clientInstance)

        return result?.rows[0] || null
    } catch (err) {
        throw err
    }
}

//Função para inserir um Professor
export const insertTeacher = async (teacher: ITeacher): Promise<void> => {
    const { name, password } = teacher

    try {
        await database.clientInstance?.query(
            'INSERT INTO TEACHER (NAME, PASSWORD) VALUES ($1, $2)',
            [name, password],
        )
    } catch (err) {
        console.error('Erro ao inserir um novo Professor no BD', err)
        throw err
    }
}

// Função para atualizar um professor existente
export const updateTeacherById = async (
    id: number,
    teacher: ITeacher,
): Promise<void> => {
    const { name, password } = teacher

    try {
        await database.clientInstance?.query(
            'UPDATE TEACHER SET name = $1, password = $2 WHERE id = $3',
            [name, password, id],
        )
    } catch (err) {
        console.error('Erro ao atualizar um Professor', err)
        throw err
    }
}

export const getAllTeacher = async (): Promise<ITeacher[]> => {
    try {
        const result = await database.clientInstance?.query(
            `SELECT ID, NAME, PASSWORD FROM TEACHER`,
        )
        return result?.rows || []
    } catch (err) {
        console.error('Erro ao buscar professores no BD', err)
        throw err
    }
}

// Função para excluir um professor pelo id
export const deleteTeacherById = async (id: number): Promise<void> => {
    try {
        await database.clientInstance?.query(
            'DELETE FROM TEACHER WHERE id = $1',
            [id],
        )
    } catch (err) {
        console.error('Erro ao deletar um Professor', err)
        throw err
    }
}
