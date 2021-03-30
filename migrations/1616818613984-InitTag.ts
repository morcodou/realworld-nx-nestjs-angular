import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DB_ENGINE, DEFAULT_COLUMNS } from "./migration.helper";

export class InitTag1616818613984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.initTagTable(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async initTagTable(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: 'tag',
            columns: [
                ...DEFAULT_COLUMNS,
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'count',
                    type: 'integer',
                },
            ],
            indices: [{name: 'id-index', columnNames: ['id']}],
            engine: DB_ENGINE.MYISAM
        }))
    }
}
