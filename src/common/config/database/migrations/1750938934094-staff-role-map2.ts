import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffRoleMap21750938934094 implements MigrationInterface {
    name = 'StaffRoleMap21750938934094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "description" SET NOT NULL`);
    }

}
