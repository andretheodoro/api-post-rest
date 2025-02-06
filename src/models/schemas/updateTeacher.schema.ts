import { z } from 'zod'

export const updateTeacherSchema = z.object({
    name: z.string().trim().min(5, {
        message: 'É obrigatório, e deve conter no minimo 5 caracteres',
    }),
    contact: z.string().trim().min(10, {
        message: 'É obrigatório, e deve conter no minimo 10 caracteres',
    }),
    password: z.string().trim().min(5, {
        message: 'É obrigatório, e deve conter no minimo 5 caracteres',
    }),
})

export const updateTeacherSchemaParam = z.object({
    id: z.coerce
        .number({
            message:
                'É obrigatório e deve estar no endpoint, e deve ser numérico',
        })
        .min(1, {
            message: 'Deve ser maior que 0',
        }),
})
