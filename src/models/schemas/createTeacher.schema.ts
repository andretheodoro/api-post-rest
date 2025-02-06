import { z } from 'zod'

export const createTeacherSchema = z.object({
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
