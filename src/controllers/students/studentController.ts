import { NextFunction, Request, Response } from 'express'
import { getAllPosts, findPostById } from '../../models/students/studentModel'

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Listar todos os Posts
 *     description: Buscar todos os posts cadastrados
 *     tags: [Posts]
 *
 *
 *     responses:
 *           200:
 *             description: "Retorna a lista com todos os posts"
 *             content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 1
 *                      title:
 *                        type: string
 *                        example: Desenvolvimento de Software
 *                      author:
 *                        type: string
 *                        example: Tiago
 *                      description:
 *                        type: string
 *                        example: O desenvolvimento de software é o processo de criar, projetar, implementar, testar e manter programas e aplicativos
 *                      creation:
 *                        type: string
 *                        format: date
 *                        example: 2024-01-01
 *                      update_date:
 *                        type: string
 *                        format: date
 *                        example: 2024-01-01
 *                      idteacher:
 *                        type: number
 *                        example: 1
 *
 *           404:
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Informações de falha/validações
 */
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

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Buscar Post
 *     description: Buscar o post filtrando pelo ID
 *     tags: [Student]
 *     parameters:
 *      - name: id
 *        required: true
 *        in: path
 *        schema:
 *          type: string
 *
 *     responses:
 *           200:
 *             description: "Retorna o post com o ID informado"
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 1
 *                    title:
 *                      type: string
 *                      example: Desenvolvimento de Software
 *                    author:
 *                      type: string
 *                      example: Tiago
 *                    description:
 *                      type: string
 *                      example: O desenvolvimento de software é o processo de criar, projetar, implementar, testar e manter programas e aplicativos
 *                    creation:
 *                      type: string
 *                      format: date
 *                      example: 2024-01-01
 *                    update_date:
 *                      type: string
 *                      format: date
 *                      example: 2024-01-01
 *                    idteacher:
 *                      type: number
 *                      example: 1
 *           400:
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: ID em formato inválido
 *
 *           404:
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Post não encontrado
 */
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
