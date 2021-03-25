import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DB_ENGINE, DEFAULT_COLUMNS } from "./migration.helper";

export class InitUser1603352814806 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.initUserTable(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async initUserTable(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                ...DEFAULT_COLUMNS,
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '255',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'bio',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'image',
                    type: 'text',
                    isNullable: true
                },
            ],
            indices: [{name: 'id-email-username-index', columnNames: ['id', 'email', 'username']}],
            engine: DB_ENGINE.MYISAM
        }))
    }

}
