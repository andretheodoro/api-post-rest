import { Pool, PoolClient } from 'pg'
import { env } from '../../env'

const CONFIG = {
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
}

class Database {
    private pool: Pool
    private client: PoolClient | undefined

    constructor() {
        this.pool = new Pool(CONFIG)
        this.connection()
    }

    private async connection() {
        try {
            this.client = await this.pool.connect()
        } catch (error) {
            console.error(`Error connecting to database: ${error}`)

            throw new Error(`Error connecting to database: ${error}`)
        }
    }

    get clientInstance() {
        return this.client
    }
}

export const database = new Database()
