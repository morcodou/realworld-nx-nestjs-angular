import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { DB_ENGINE, DEFAULT_COLUMNS } from "./migration.helper";

export class InitFollow1616860544015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async initFollowTable(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: 'follow',
            columns: [
                ...DEFAULT_COLUMNS,
                {
                    name: 'followingUsername',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'followedUsername',
                    type: 'varchar',
                    length: '255'
                },
            ],
            indices: [{name: 'id-index', columnNames: ['id']}],
            engine: DB_ENGINE.MYISAM
        }))
    }

}
