import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffEmailUnique1750837375751 implements MigrationInterface {
    name = 'StaffEmailUnique1750837375751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "active_route_entity" RENAME COLUMN "totla_time" TO "total_time"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "active_route_entity" RENAME COLUMN "total_time" TO "totla_time"`);
    }

}
