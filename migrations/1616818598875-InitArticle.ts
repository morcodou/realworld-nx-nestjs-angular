import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DB_ENGINE, DEFAULT_COLUMNS } from "./migration.helper";

export class InitArticle1616818598875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.initArticleTable(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async initArticleTable(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: 'article',
            columns: [
                ...DEFAULT_COLUMNS,
                {
                    name: 'slug',
                    type: 'varchar',
                    length: '250',
                    isUnique: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '200'
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'body',
                    type: 'text',
                },
                {
                    name: 'authorId',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'tagList',
                    type: 'json',
                },
            ],
            indices: [{name: 'id-index', columnNames: ['id']}],
            engine: DB_ENGINE.MYISAM
        }))
    }

}
