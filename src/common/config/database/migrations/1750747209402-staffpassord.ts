import { MigrationInterface, QueryRunner } from "typeorm";

export class Staffpassord1750747209402 implements MigrationInterface {
    name = 'Staffpassord1750747209402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station_entity" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "station_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "raillines" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "raillines" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "staff_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "train_entity" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "train_entity" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "train_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "train_entity" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "staff_entity" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "raillines" ADD "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "raillines" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "station_entity" ADD "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "station_entity" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

}
