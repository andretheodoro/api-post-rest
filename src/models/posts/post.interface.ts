export interface IPost {
    id?: number | null
    title: string
    author: string
    description: string
    creation: Date
    update_date?: Date | null
    idteacher: number
}
