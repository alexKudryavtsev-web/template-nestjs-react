import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1659453534381 implements MigrationInterface {
  name = 'UpdateUser1659453534381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `isActived`');
    await queryRunner.query(
      'ALTER TABLE `users` ADD `isActivated` tinyint NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      "ALTER TABLE `users` ADD `bio` varchar(255) NOT NULL DEFAULT ''",
    );
    await queryRunner.query(
      "ALTER TABLE `users` ADD `address` varchar(255) NOT NULL DEFAULT ''",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `address`');
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `bio`');
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `isActivated`');
    await queryRunner.query(
      "ALTER TABLE `users` ADD `isActived` tinyint NOT NULL DEFAULT '0'",
    );
  }
}
