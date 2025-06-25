import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1749913580288 implements MigrationInterface {
    name = 'TestMigration1749913580288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "raillines" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "description" text, "length" double precision NOT NULL, "totalStations" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "start_station_id" integer, "end_station_id" integer, CONSTRAINT "UQ_b5a92f38519f7cb9e77f9b08482" UNIQUE ("name"), CONSTRAINT "PK_14c3ad9a0fa41442b971fb15ee6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "station_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "latitude" numeric(10,8), "longitude" numeric(11,8), "rail_line_id" integer, CONSTRAINT "UQ_dee947e3b88a53c8752d2c46aef" UNIQUE ("name"), CONSTRAINT "PK_9eff9776d1072329f6831a51e73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "raillines" ADD CONSTRAINT "FK_62c0268e9598855bdd6ce45df1c" FOREIGN KEY ("start_station_id") REFERENCES "station_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "raillines" ADD CONSTRAINT "FK_3cac3f009ae8a6024383ac9d902" FOREIGN KEY ("end_station_id") REFERENCES "station_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "station_entity" ADD CONSTRAINT "FK_253dcf37ee0ddb56a544a37a5d3" FOREIGN KEY ("rail_line_id") REFERENCES "raillines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station_entity" DROP CONSTRAINT "FK_253dcf37ee0ddb56a544a37a5d3"`);
        await queryRunner.query(`ALTER TABLE "raillines" DROP CONSTRAINT "FK_3cac3f009ae8a6024383ac9d902"`);
        await queryRunner.query(`ALTER TABLE "raillines" DROP CONSTRAINT "FK_62c0268e9598855bdd6ce45df1c"`);
        await queryRunner.query(`DROP TABLE "station_entity"`);
        await queryRunner.query(`DROP TABLE "raillines"`);
    }

}
