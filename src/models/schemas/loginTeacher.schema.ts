import { z } from 'zod'

export const loginTeacherSchema = z.object({
    username: z.string().min(5, {
        message: 'É obrigatório, e deve conter no minimo 5 caractere',
    }),
    password: z.string().min(5, {
        message: 'É obrigatório, e deve conter no minimo 5 caractere',
    }),
})
