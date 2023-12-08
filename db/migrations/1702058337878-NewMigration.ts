import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1702058337878 implements MigrationInterface {
  name = 'NewMigration1702058337878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new column with a default value
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "nick" character varying DEFAULT 'default_value'`,
    );

    // Update existing rows to provide a non-null value for "nick"
    await queryRunner.query(
      `UPDATE "user_entity" SET "nick" = 'default_value' WHERE "nick" IS NULL`,
    );

    // Alter the column to be NOT NULL
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "nick" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the changes
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "nick"`);
  }
}
