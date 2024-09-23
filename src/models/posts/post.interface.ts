export interface Post {
    id?: number;
    title: string;
    author: string;
    description: string;
    creation: Date;
    update_date?: Date;
    idteacher: number;
}