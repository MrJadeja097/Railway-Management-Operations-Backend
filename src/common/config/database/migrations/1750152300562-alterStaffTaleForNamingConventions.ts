import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterStaffTaleForNamingConventions1750152300562 implements MigrationInterface {
    name = 'AlterStaffTaleForNamingConventions1750152300562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "active_route_entity" ALTER COLUMN "total_length" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ALTER COLUMN "totla_time" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ALTER COLUMN "stations_included" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "train_entity" DROP CONSTRAINT "FK_a70b8148c0172d91f3233f010ee"`);
        await queryRunner.query(`ALTER TABLE "train_entity" ALTER COLUMN "activeRoute_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "train_entity" ADD CONSTRAINT "FK_a70b8148c0172d91f3233f010ee" FOREIGN KEY ("activeRoute_id") REFERENCES "active_route_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "train_entity" DROP CONSTRAINT "FK_a70b8148c0172d91f3233f010ee"`);
        await queryRunner.query(`ALTER TABLE "train_entity" ALTER COLUMN "activeRoute_id" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "train_entity" ADD CONSTRAINT "FK_a70b8148c0172d91f3233f010ee" FOREIGN KEY ("activeRoute_id") REFERENCES "active_route_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ALTER COLUMN "stations_included" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ALTER COLUMN "totla_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ALTER COLUMN "total_length" SET NOT NULL`);
    }

}
