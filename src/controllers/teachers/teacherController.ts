import { NextFunction, Request, Response } from 'express'
import {
    insertPost,
    updatePostById,
    findPostByIdTeacher,
    deletePostById,
    postExists,
    searchPostsByKeyword,
    loginTeacher,
} from '../../models/teachers/teacherModel'
import { IPost } from '../../models/posts/post.interface'
import { InvalidCredentialsError } from '../../middleware/errors/invalid-credentials-error'
import {
    updatePostSchema,
    updatePostSchemaParam,
} from '../../models/schemas/updatePost.schema'
import { deletePostSchema } from '../../models/schemas/deletePost.schema'
import { loginTeacherSchema } from '../../models/schemas/loginTeacher.schema'
import { generateToken } from '../../middleware/authMiddleware'
import { createPostSchema } from '../../models/schemas/createPost.schema'
import { getPostByIdTeacherSchema } from '../../models/schemas/getPostByIdTeacher.schema'

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Validação do corpo da requisição, com base no schema de criação de post
        const validateCreatePost = createPostSchema.parse(req.body)

        const postData: IPost = {
            title: validateCreatePost.title,
            author: validateCreatePost.author,
            description: validateCreatePost.description,
            creation: new Date(),
            idteacher: validateCreatePost.idteacher,
        }
        await insertPost(postData)
        res.status(201).json(postData)
    } catch (error) {
        // Passa o erro para o middleware de erro
        next(error)
    }
}

export const getPostByIdTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Validação do corpo da requisição, com base no schema de get post por id professor
        const validateGetByIdTeacher = getPostByIdTeacherSchema.parse(
            req.params,
        )
        // console.log(validateGetByIdTeacher)
        const post = await findPostByIdTeacher(validateGetByIdTeacher.id)
        // console.log(post)

        if (post.length == 0) {
            res.status(404).json({
                message: 'Professor(a) não possui Posts criados.',
            })
        } else {
            res.json(post)
        }
    } catch (error) {
        next(error)
    }
}

// Controlador para atualizar um post existente
export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { id } = req.params // Pega o id do post da URL
        const validateUpdatePostParam = updatePostSchemaParam.parse(req.params)

        // Validação do corpo da requisição, com base no schema de criação de post
        const validateUpdatePost = updatePostSchema.parse(req.body)

        const postData: IPost = {
            title: validateUpdatePost.title,
            author: validateUpdatePost.author,
            description: validateUpdatePost.description,
            idteacher: validateUpdatePost.idteacher,
            creation: new Date(),
            update_date: new Date(),
        }

        // Verificar se o post existe
        const exists = await postExists(validateUpdatePostParam.id)
        if (!exists) {
            res.status(404).json({ message: 'Post não encontrado' })
            return
        }

        await updatePostById(Number(id), postData)
        res.status(200).json(postData)
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Excluir Post
 *     description: Excluir o post pelo ID
 *     tags: [Teacher]
 *     parameters:
 *      - name: id
 *        required: true
 *        in: path
 *        schema:
 *          type: number
 *     security:
 *      - jwt: []  # Indica que este endpoint requer autenticação JWT
 *
 *     responses:
 *           200:
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Post deletado com sucesso
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
 * components:
 *  securitySchemes:
 *      jwt:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
// Controlador para excluir um post existente
export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const validateDeletePost = deletePostSchema.parse(req.params)

        // Verificar se o post existe
        const exists = await postExists(validateDeletePost.id)
        if (!exists) {
            res.status(404).json({ message: 'Post não encontrado' })
            return
        }

        // Tenta excluir o post pelo ID
        await deletePostById(validateDeletePost.id)
        res.status(200).json({ message: 'Post deletado com sucesso!' })
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/posts/search:
 *   get:
 *     summary: Busca Post keyword
 *     description: Retorna lista de post que contenham o keyword informado em pesquisa
 *     tags: [Student]
 *     parameters:
 *      - name: keyword
 *        required: true
 *        in: query
 *        schema:
 *          type: string
 *
 *     responses:
 *           200:
 *             description: Lista de Posts encontrados
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                    title:
 *                      type: string
 *                    author:
 *                      type: string
 *                    description:
 *                      type: string
 *                    creation:
 *                      type: string
 *                      format: date
 *                    update_date:
 *                      type: string
 *                      format: date-time
 *                    idteacher:
 *                      type: number
 *
 *           400:
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Palavra chave é obrigatória
 *           404:
 *             content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Nenhum Post encontrado para a palavra chave informada.
 */
// Controlador para buscar posts por palavra-chave
export const searchPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { keyword } = req.query

        if (!keyword || typeof keyword !== 'string') {
            res.status(400).json({ message: 'Palavra chave é obrigatória' })
            return
        }

        const posts = await searchPostsByKeyword(keyword)

        if (posts.length === 0) {
            res.status(404).json({
                message:
                    'Nenhum Post encontrado para a palavra chave informada.',
            })
        } else {
            res.status(200).json(posts)
        }
    } catch (error) {
        next(error)
    }
}

/**
 * @swagger
 * /api/professor/login:
 *   post:
 *     summary: Autenticação de Professores
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Tiago
 *               password:
 *                 type: string
 *                 example: 1234567
 *     responses:
 *       200:
 *         description: Retorna token de autenticação
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: token(Json Web Token)
 */
export async function login(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        // Schema de validação usando Zod
        const { username, password } = loginTeacherSchema.parse(req.body)
        const teacher = await loginTeacher(username, password)
        // console.log('controller: ', teacher)
        // const doestPasswordMatch = await compare(password, teacher.password)
        if (teacher === null) {
            return next(new InvalidCredentialsError())
        }
        const token = generateToken(username) // Gera o token

        res.status(200).send({ token: token })
    } catch (error: any) {
        // Passa o erro para o middleware de erro
        next(error)
    }
}
