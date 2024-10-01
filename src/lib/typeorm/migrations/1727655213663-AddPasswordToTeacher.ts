import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddPasswordToTeacher1727655213663 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'teacher',
            new TableColumn({
                name: 'password',
                type: 'varchar(50)',
                isNullable: false,
                default: "'123456'",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('teacher', 'password')
    }
}
