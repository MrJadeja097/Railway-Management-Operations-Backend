import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffEmailUnique1750846613356 implements MigrationInterface {
    name = 'StaffEmailUnique1750846613356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raillines" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raillines" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

}
