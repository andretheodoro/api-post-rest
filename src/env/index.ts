import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: z.coerce.number().default(3000),
    DB_USER: z.string(),
    DB_HOST: z.string(),
    DB_NAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.coerce.number(),
    JWT_SECRET: z.string(),
})
// console.log(process.env)
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    // console.error('Invalidd environment variables', _env.error.format())
    throw new Error('Invalidd environment variables')
}

export const env = _env.data
