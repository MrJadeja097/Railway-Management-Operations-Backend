import { MigrationInterface, QueryRunner } from "typeorm";

export class Staffpassord1750747243199 implements MigrationInterface {
    name = 'Staffpassord1750747243199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "raillines" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "train_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "train_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "raillines" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "station_entity" DROP COLUMN "deletedAt"`);
    }

}
