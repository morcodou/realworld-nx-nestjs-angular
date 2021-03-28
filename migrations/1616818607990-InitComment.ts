import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DB_ENGINE, DEFAULT_COLUMNS } from "./migration.helper";

export class InitComment1616818607990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.initCommentTable(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async initCommentTable(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: 'comment',
            columns: [
                ...DEFAULT_COLUMNS,
                {
                    name: 'articleSlug',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'authorId',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'body',
                    type: 'text',
                },
            ],
            indices: [{name: 'id-index', columnNames: ['id']}],
            engine: DB_ENGINE.MYISAM
        }))
    }

}
