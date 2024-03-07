import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigrationWishesTable1709815449640
  implements MigrationInterface
{
  name = 'InitMigrationWishesTable1709815449640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(250) NOT NULL, "link" character varying NOT NULL, "image" character varying NOT NULL, "price" numeric NOT NULL, "raised" numeric NOT NULL DEFAULT '0', "description" character varying(1024) NOT NULL, "copied" integer NOT NULL DEFAULT '0', "ownerId" uuid NOT NULL, CONSTRAINT "CHK_b7de3446913ba02c02a1cbabbc" CHECK ("copied" >= 0), CONSTRAINT "CHK_5c7d82cd4c69453f3d422cbf3e" CHECK ("raised" >= 0), CONSTRAINT "CHK_1a7327f790bd5eac8e0a81bac5" CHECK ("price" >= 1), CONSTRAINT "PK_9c08d144e42ca0aa37a024597ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishes" ADD CONSTRAINT "FK_72f773f4c32469a4871dfe0dd9b" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishes" DROP CONSTRAINT "FK_72f773f4c32469a4871dfe0dd9b"`,
    );
    await queryRunner.query(`DROP TABLE "wishes"`);
  }
}
