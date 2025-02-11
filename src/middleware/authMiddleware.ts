import jwt from 'jsonwebtoken'
import { env } from '../env'

const JWT_EXPIRATION_TIME = 60 * 5 // Tempo de expiração do JWT (10 minutos)
const JWT_EXPIRATION_TIME_MOBILE = 60 * 60 * 24; // 1 dia em segundos

export const generateToken = (userName: string, isMobile: boolean) => {
    const payload = { userName: userName }
    const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: isMobile ? JWT_EXPIRATION_TIME_MOBILE : JWT_EXPIRATION_TIME,
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

export const isAuthenticated = (req: any, res: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN"
    console.log(authHeader)
    console.log(token)
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' })
    }

    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: 'Token inválido ou expirado' })
        }
        req.userId = decoded.id // Armazena o ID do usuário na requisição
        console.log('aaaaaa')
        return res.status(200).json({ message: 'Token válido', ok: true })
    })
}
