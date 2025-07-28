import { MigrationInterface, QueryRunner } from "typeorm";

export class Rail1753708803838 implements MigrationInterface {
    name = 'Rail1753708803838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station_entity" DROP CONSTRAINT "FK_253dcf37ee0ddb56a544a37a5d3"`);
        await queryRunner.query(`ALTER TABLE "station_entity" ALTER COLUMN "rail_line_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "station_entity" ADD CONSTRAINT "rail_line_id" FOREIGN KEY ("rail_line_id") REFERENCES "raillines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "station_entity" DROP CONSTRAINT "rail_line_id"`);
        await queryRunner.query(`ALTER TABLE "station_entity" ALTER COLUMN "rail_line_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "station_entity" ADD CONSTRAINT "FK_253dcf37ee0ddb56a544a37a5d3" FOREIGN KEY ("rail_line_id") REFERENCES "raillines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
