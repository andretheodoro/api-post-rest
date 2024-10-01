import { ZodError } from 'zod'
import { env } from '../env'
import { Request, Response, NextFunction } from 'express'

interface IErrorHandlerMap {
    [key: string]: (
        error: Error | ZodError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => void
}

export const errorHandlerMap: IErrorHandlerMap = {
    ZodError: (
        error: Error | ZodError,
        _: Request,
        reply: Response,
        next: NextFunction,
    ) => {
        if (error instanceof ZodError) {
            return reply.status(400).json({
                code: 400,
                status: 'Bad Request',
                message: 'Dados de entrada inválidos',
                errors: error.errors.map((issue) => ({
                    [issue.path.join('.')]: issue.message,
                })),
            })
        }
        next(error)
    },
    ResourceNotFoundError: (error: Error, _: Request, reply: Response) => {
        return reply.status(404).send({ message: error.message })
    },
    UserHasExists: (error: Error, _: Request, reply: Response) => {
        return reply.status(400).send({ message: error.message })
    },
    InvalidCredentialsError: (error: Error, _: Request, reply: Response) => {
        return reply.status(404).send({ message: error.message })
    },
    default: (error: Error, _: Request, reply: Response) => {
        // if (env.NODE_ENV == 'development')
        return reply.status(500).send({
            message: 'Internal server error',
        })
    },
}

const errorHandler = (
    error: Error,
    req: Request,
    reply: Response,
    next: NextFunction,
) => {
    if (env.NODE_ENV == 'development') {
        console.error(error)
    }

    const handler = errorHandlerMap[error.constructor.name]
    if (handler) return handler(error, req, reply, next)

    reply.status(500).send({
        message: 'Internal server error',
    })
}

export default errorHandler
