import { z } from 'zod'

export const updatePostSchema = z.object({
    title: z.string().trim().min(10, {
        message: 'É obrigatório, e deve conter no minimo 10 caracteres',
    }), // .min(10).max(255),
    author: z
        .string()
        .trim()
        .min(5, {
            message: 'É obrigatório, e deve conter no minimo 5 caracteres',
        })
        .max(100),
    description: z.string().trim().min(10, {
        message: 'É obrigatório e deve conter no minimo 10 caracteres',
    }),
    idteacher: z.coerce.number({
        message: 'id do Professor é obrigatório',
    }),
})

export const updatePostSchemaParam = z.object({
    id: z.coerce
        .number({
            message:
                'É obrigatório e deve estar no endpoint, e deve ser numérico',
        })
        .min(1, {
            message: 'É deve ser maior que 1',
        }),
})
