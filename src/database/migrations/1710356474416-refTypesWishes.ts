import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefTypesWishes1710356474416 implements MigrationInterface {
  name = 'RefTypesWishes1710356474416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishes" ALTER COLUMN "price" TYPE numeric(20,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishes" ALTER COLUMN "raised" TYPE numeric(20,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishes" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishes" ALTER COLUMN "price" TYPE numeric`,
    );
  }
}
