import { DataSource } from 'typeorm'
import { env } from '../../env'
import { Teacher } from '../../models/entities/Teacher'
import { AddPasswordToTeacher1727655213663 } from './migrations/1727655213663-AddPasswordToTeacher'

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [
        // 'src/entities/*.ts',
        Teacher,
    ],
    migrations: [AddPasswordToTeacher1727655213663],
    logging: env.NODE_ENV == 'development',
})

appDataSource
    .initialize()
    .then(() => {
        console.log('Database with typeorm connected')
    })
    .catch((error: any) => {
        console.error('Error connecting to database with typeorm', error)
    })
