import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterStaffTaleForNamingConventions1750077782717 implements MigrationInterface {
    name = 'AlterStaffTaleForNamingConventions1750077782717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "lasttname"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "lastName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "lasttname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "firstname" character varying NOT NULL`);
    }

}
