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

    async connection() {
        // console.log(CONFIG)
        try {
            this.client = await this.pool.connect()
            console.log('connected')
        } catch (error) {
            console.error(`Error connecting to database: ${error}`)

            throw new Error(`Error connecting to database: ${error}`)
        }
    }

    get clientInstance() {
        return this.client
    }

    // async disconnect() {
    //     if (this.client) {
    //         this.client.release() // Libera o cliente
    //         this.client = undefined // Limpa a referência
    //     }
    //     await this.pool.end()
    // }
}

export const database = new Database()
