import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAllTable1750067589955 implements MigrationInterface {
    name = 'AddingAllTable1750067589955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raillines" RENAME COLUMN "length" TO "totalLength"`);
        await queryRunner.query(`CREATE TYPE "public"."staff_entity_role_enum" AS ENUM('MANAGEMENT', 'DRIVER', 'BACK_GUARD')`);
        await queryRunner.query(`CREATE TABLE "staff_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "mobileNumber" character varying NOT NULL, "email" character varying NOT NULL, "Address" text, "city" character varying NOT NULL, "role" "public"."staff_entity_role_enum" NOT NULL, CONSTRAINT "PK_a1ba12082b9e174c89c35fa132e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "active_route_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(15) NOT NULL, "total_length" integer NOT NULL, "totla_time" integer NOT NULL, "stations_included" integer array NOT NULL, "start_station_id" integer, "end_station_id" integer, "driver_id" integer, "back_guard_id" integer, "train_id" integer, "railLine_id" integer, CONSTRAINT "REL_aa459d67fb7fb7667547aa77b8" UNIQUE ("driver_id"), CONSTRAINT "REL_71e6c9b530cae96d69ac20a3e6" UNIQUE ("back_guard_id"), CONSTRAINT "REL_68a053ec1891d25fd1dc018337" UNIQUE ("train_id"), CONSTRAINT "PK_6e33acf588e7b23fd7f9b0fb454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."train_entity_status_enum" AS ENUM('ACTIVE', 'GROUNDED', 'UNDER_MAINTENANCE', 'ON_ACTIVEROUTE')`);
        await queryRunner.query(`CREATE TABLE "train_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(30) NOT NULL, "description" text, "status" "public"."train_entity_status_enum" NOT NULL DEFAULT 'ACTIVE', "total_coaches" integer NOT NULL, "top_speed" integer NOT NULL, "activeRoute_id" integer, CONSTRAINT "REL_a70b8148c0172d91f3233f010e" UNIQUE ("activeRoute_id"), CONSTRAINT "PK_70c787d4fe6a1520a1ddf97fc57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "raillines" ALTER COLUMN "isActive" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD CONSTRAINT "FK_63a0cb25b193d22280c616ae4ab" FOREIGN KEY ("start_station_id") REFERENCES "station_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD CONSTRAINT "FK_f59eb90083cdcfcaf5cc2d7eb01" FOREIGN KEY ("end_station_id") REFERENCES "station_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD CONSTRAINT "FK_aa459d67fb7fb7667547aa77b84" FOREIGN KEY ("driver_id") REFERENCES "staff_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD CONSTRAINT "FK_71e6c9b530cae96d69ac20a3e6a" FOREIGN KEY ("back_guard_id") REFERENCES "staff_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD CONSTRAINT "FK_68a053ec1891d25fd1dc0183373" FOREIGN KEY ("train_id") REFERENCES "train_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" ADD CONSTRAINT "FK_be7c34aff64bf1805164c40ff37" FOREIGN KEY ("railLine_id") REFERENCES "raillines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "train_entity" ADD CONSTRAINT "FK_a70b8148c0172d91f3233f010ee" FOREIGN KEY ("activeRoute_id") REFERENCES "active_route_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "train_entity" DROP CONSTRAINT "FK_a70b8148c0172d91f3233f010ee"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP CONSTRAINT "FK_be7c34aff64bf1805164c40ff37"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP CONSTRAINT "FK_68a053ec1891d25fd1dc0183373"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP CONSTRAINT "FK_71e6c9b530cae96d69ac20a3e6a"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP CONSTRAINT "FK_aa459d67fb7fb7667547aa77b84"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP CONSTRAINT "FK_f59eb90083cdcfcaf5cc2d7eb01"`);
        await queryRunner.query(`ALTER TABLE "active_route_entity" DROP CONSTRAINT "FK_63a0cb25b193d22280c616ae4ab"`);
        await queryRunner.query(`ALTER TABLE "raillines" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`DROP TABLE "train_entity"`);
        await queryRunner.query(`DROP TYPE "public"."train_entity_status_enum"`);
        await queryRunner.query(`DROP TABLE "active_route_entity"`);
        await queryRunner.query(`DROP TABLE "staff_entity"`);
        await queryRunner.query(`DROP TYPE "public"."staff_entity_role_enum"`);
        await queryRunner.query(`ALTER TABLE "raillines" RENAME COLUMN "totalLength" TO "length"`);
    }

}
