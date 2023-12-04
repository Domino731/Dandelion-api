import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1701644949919 implements MigrationInterface {
    name = 'NewMigration1701644949919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying NOT NULL DEFAULT 'PL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying NOT NULL DEFAULT 'PL'`);
    }

}
