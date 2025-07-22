import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAllTable1750077719835 implements MigrationInterface {
    name = 'AddingAllTable1750077719835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "firstname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "lasttname" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "lasttname"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "name" character varying NOT NULL`);
    }

}
