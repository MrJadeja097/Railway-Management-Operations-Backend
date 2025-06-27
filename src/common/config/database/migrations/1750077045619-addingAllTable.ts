import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAllTable1750077045619 implements MigrationInterface {
    name = 'AddingAllTable1750077045619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."staff_entity_role_enum" RENAME TO "staff_entity_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."staff_entity_role_enum" AS ENUM('ADMIN', 'MANAGEMENT', 'DRIVER', 'BACK_GUARD')`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" TYPE "public"."staff_entity_role_enum" USING "role"::"text"::"public"."staff_entity_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."staff_entity_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."staff_entity_role_enum_old" AS ENUM('MANAGEMENT', 'DRIVER', 'BACK_GUARD')`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ALTER COLUMN "role" TYPE "public"."staff_entity_role_enum_old" USING "role"::"text"::"public"."staff_entity_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."staff_entity_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."staff_entity_role_enum_old" RENAME TO "staff_entity_role_enum"`);
    }

}
