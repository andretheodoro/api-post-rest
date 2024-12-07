import jwt from 'jsonwebtoken'
import { env } from '../env'

const JWT_EXPIRATION_TIME = 60 * 5 // Tempo de expiração do JWT (10 minutos)

export const generateToken = (userName: string) => {
    const payload = { userName: userName }
    const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIME,
    })
    return token
}

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN"
    console.log('???', authHeader)
    if (!token) {
        return res.status(403).send('Token não fornecido')
    }
    // console.log('???', token)
    jwt.verify(`${token}`, env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            console.log(err)
            return res.status(401).send('Token inválido')
        }

        const expiredTime = 180 // minutos para expirar
        const currentTime = Math.floor(Date.now() / 1000) // Tempo atual em segundos
        const isNearExpiration = decoded.exp - currentTime < expiredTime // 3 minutos de folga antes da expiração
        console.log(decoded.exp - currentTime)

        console.log(
            `Token expira em ${expiredTime / 60} minutos: ${isNearExpiration ? 'sim' : 'não'}`,
        )

        if (isNearExpiration) {
            // Renovar o token
            const newToken = jwt.sign(
                { userId: decoded.userName }, // Dados que você quer no payload
                env.JWT_SECRET,
                { expiresIn: JWT_EXPIRATION_TIME }, // Novo token com o mesmo tempo de expiração
            )
            // console.log(decoded.userId)
            console.log(decoded.userName)
            console.log(newToken)

            res.setHeader('Authorization', `Bearer ${newToken}`)
        }

        req.userId = decoded.id // Armazena o ID do usuário na requisição
        next()
    })
}
