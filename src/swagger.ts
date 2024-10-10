import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Fiap - Techchallenge (Posts)',
            version: '1.0.0',
            description: `Documentação da API usando Swagger
            \r\nEsta API REST permite o gerenciamento de posts, oferecendo funcionalidades para alunos e professores.
            \r\nDesenvolvida com Node.js, ela facilita a criação, leitura, visualização, atualização e exclusão de posts de forma eficiente e centralizada.`,
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: [
        './src/controllers/teachers/*.ts',
        './src/controllers/students/*.ts',
    ], // Caminho para os controllers
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export default (app: Express) => {
    app.use('/api-posts', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
