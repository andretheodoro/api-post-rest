import { z } from 'zod'

export const createPostSchema = z.object({
    title: z.string().trim().min(10, {
        message: 'É obrigatório, e deve conter no minimo 10 caractere',
    }), // .min(10).max(255),
    author: z
        .string()
        .trim()
        .min(5, {
            message: 'É obrigatório, e deve conter no minimo 5 caractere',
        })
        .max(100),
    description: z.string().trim().min(10, {
        message: 'É obrigatório e deve conter no minimo 10 caractere',
    }),
    creation: z
        .string({ message: 'É obrigatória' }) // Começamos com string para validar e depois coercionar
        .refine((value) => !isNaN(Date.parse(value)), {
            message: 'É obrigatória e deve seguir o formato YYYY-MM-DD',
        })
        .transform((value) => new Date(value)), // Converte para Date
    idteacher: z.coerce.number({
        message: 'É obrigatório',
    }),
})
