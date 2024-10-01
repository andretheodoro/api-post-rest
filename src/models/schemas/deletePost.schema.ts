import { z } from 'zod'

export const deletePostSchema = z.object({
    id: z.coerce
        .number({
            message:
                'É obrigatório e deve estar no endpoint, e deve ser numérico',
        })
        .min(1, {
            message: 'Deve ser maior que 1',
        }),
})
