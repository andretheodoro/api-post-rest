import { IPost } from '../posts/post.interface'
import { database } from '../../lib/pg/db'
import { IStudent } from './student.interface'

export const getAllPosts = async (): Promise<IPost[]> => {
    try {
        const result = await database.clientInstance?.query(
            `SELECT id, title, author, description, to_char(CREATION, 'YYYY-MM-DD') creation, to_char(update_date, 'YYYY-MM-DD') update_date, idteacher FROM posts order by id asc`,
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

//Função para inserir um Estudante
export const insertStudent = async (student: IStudent): Promise<void> => {
    const { name, contact } = student

    try {
        await database.clientInstance?.query(
            'INSERT INTO STUDENT (NAME, CONTACT) VALUES ($1, $2)',
            [name, contact],
        )
    } catch (err) {
        console.error('Erro ao inserir um novo Estudante no BD', err)
        throw err
    }
}

// Função para atualizar um estudante existente
export const updateStudentById = async (
    id: number,
    student: IStudent,
): Promise<void> => {
    const { name, contact } = student

    try {
        await database.clientInstance?.query(
            'UPDATE STUDENT SET name = $1, contact = $2 WHERE id = $3',
            [name, contact, id],
        )
    } catch (err) {
        console.error('Erro ao atualizar um Aluno', err)
        throw err
    }
}

export const getAllStudent = async (): Promise<IStudent[]> => {
    try {
        const result = await database.clientInstance?.query(
            `SELECT ID, NAME, CONTACT FROM STUDENT order by id asc`,
        )
        return result?.rows || []
    } catch (err) {
        console.error('Erro ao buscar estudantes no BD', err)
        throw err
    }
}

// Função para excluir um professor pelo id
export const deleteStudentById = async (id: number): Promise<void> => {
    try {
        await database.clientInstance?.query(
            'DELETE FROM STUDENT WHERE id = $1',
            [id],
        )
    } catch (err) {
        console.error('Erro ao deletar um Aluno', err)
        throw err
    }
}
