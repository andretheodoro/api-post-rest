import { z } from 'zod'

export const createStudentSchema = z.object({
    name: z.string().trim().min(10, {
        message: 'É obrigatório, e deve conter no minimo 10 caracteres',
    }),
    contact: z.string().trim().min(5, {
        message: 'É obrigatório, e deve conter no minimo 5 caracteres',
    }),
})
