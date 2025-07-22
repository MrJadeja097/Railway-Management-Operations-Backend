import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffRoleMap1751015223457 implements MigrationInterface {
    name = 'StaffRoleMap1751015223457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP CONSTRAINT "FK_ea12604cdbecf98dbab458ec5a5"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP CONSTRAINT "UQ_ea12604cdbecf98dbab458ec5a5"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD CONSTRAINT "FK_ea12604cdbecf98dbab458ec5a5" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP CONSTRAINT "FK_ea12604cdbecf98dbab458ec5a5"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD CONSTRAINT "UQ_ea12604cdbecf98dbab458ec5a5" UNIQUE ("role_id")`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD CONSTRAINT "FK_ea12604cdbecf98dbab458ec5a5" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
