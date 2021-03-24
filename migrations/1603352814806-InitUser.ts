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
                    name: 'firstName',
                    type: 'varchar',
                    length: '50'
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    length: '50'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '50',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'emailConfirmToken',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'emailActive',
                    type: 'boolean',
                    default: 0
                },
                {
                    name: 'passwordRemiderToken',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'passwordRemiderExpiry',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '20'
                }
            ],
            indices: [{name: 'id-email-index', columnNames: ['id', 'email']}],
            engine: DB_ENGINE.MYISAM
        }))
    }

}
