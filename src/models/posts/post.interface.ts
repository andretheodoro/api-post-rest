export interface IPost {
    id?: number | null
    title: string
    author: string
    description: string
    creation?: Date | null
    update_date?: Date | null
    idteacher: number
}
