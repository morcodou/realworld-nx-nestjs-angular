import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DB_ENGINE, DEFAULT_COLUMNS } from "./migration.helper";

export class InitFavorite1616818619700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.initFavoriteTable(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async initFavoriteTable(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: 'favorite',
            columns: [
                ...DEFAULT_COLUMNS,
                {
                    name: 'userId',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'articleSlug',
                    type: 'varchar',
                    length: '255'
                },
            ],
            indices: [{name: 'id-index', columnNames: ['id']}],
            engine: DB_ENGINE.MYISAM
        }))
    }
}
