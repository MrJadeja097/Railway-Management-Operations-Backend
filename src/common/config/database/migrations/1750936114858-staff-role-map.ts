import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffRoleMap1750936114858 implements MigrationInterface {
    name = 'StaffRoleMap1750936114858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."staff_entity_role_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."staff_entity_role_enum" AS ENUM('ADMIN', 'MANAGEMENT', 'DRIVER', 'BACK_GUARD')`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "role" "public"."staff_entity_role_enum" NOT NULL`);
    }

}
