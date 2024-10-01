export class InvalidCredentialsError extends Error {
    constructor() {
        super('Usuário ou Senha inválido')
    }
}
