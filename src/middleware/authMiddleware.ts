import jwt from 'jsonwebtoken'
import { env } from '../env'

export const generateToken = (userName: string) => {
    const payload = { userName: userName }
    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '2m' }) // O token expira em 1 hora
    return token
}

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN"
    console.log('???', authHeader)
    if (!token) {
        return res.status(403).send('Token não fornecido')
    }
    console.log('???', token)
    jwt.verify(`${token}`, env.JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send('Token inválido')
        }
        req.userId = decoded.id // Armazena o ID do usuário na requisição
        next()
    })
}
