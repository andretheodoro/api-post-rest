import { z } from 'zod'

export const updateStudentSchema = z.object({
    name: z.string().trim().min(10, {
        message: 'É obrigatório, e deve conter no minimo 10 caracteres',
    }),
    contact: z.string().trim().min(5, {
        message: 'É obrigatório, e deve conter no minimo 5 caracteres',
    }),
})

export const updateStudentSchemaParam = z.object({
    id: z.coerce
        .number({
            message:
                'É obrigatório e deve estar no endpoint, e deve ser numérico',
        })
        .min(1, {
            message: 'É deve ser maior que 1',
        }),
})
