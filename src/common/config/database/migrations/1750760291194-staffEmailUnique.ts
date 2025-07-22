import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffEmailUnique1750760291194 implements MigrationInterface {
    name = 'StaffEmailUnique1750760291194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD CONSTRAINT "UQ_a773f7fb53c118b3112843816ac" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP CONSTRAINT "UQ_a993f7fb53c118b3112843816ac"`);
    }

}
