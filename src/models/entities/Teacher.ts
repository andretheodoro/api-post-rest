import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ITeacher } from '../teachers/teacher.interface'

@Entity({ name: 'teacher' })
export class Teacher implements ITeacher {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number | undefined

    @Column({ name: 'name', type: 'varchar' })
    name: string

    @Column({ name: 'password', type: 'varchar' })
    password: string
}
