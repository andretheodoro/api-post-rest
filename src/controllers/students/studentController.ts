import { NextFunction, Request, Response } from 'express'
import { getAllPosts, findPostById } from '../../models/students/studentModel'

export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const posts = await getAllPosts() // Acesso à conexão do banco de dados
        res.json(posts)
    } catch (error) {
        next(error)
    }
}

export const getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const { id } = req.params

    if (isNaN(Number(id))) {
        res.status(400).json({ message: 'ID em formato inválido' })
        return
    }

    try {
        const post = await findPostById(Number(id))

        if (!post) {
            res.status(404).json({ message: 'Post não encontrado' })
        } else {
            res.json(post)
        }
    } catch (error) {
        next(error)
    }
}
