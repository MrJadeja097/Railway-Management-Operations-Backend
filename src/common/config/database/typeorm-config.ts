import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { PermissionsEntity } from 'src/common/roles/entities/permissions.entity';
import { Role_PermissionsEntity } from 'src/common/roles/entities/role-permissions.entity';
import { RolesEntity } from 'src/common/roles/entities/role.entity';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { TrainEntity } from 'src/modules/trains/entities/train.entity';
import { StationEntity } from 'src/modules/stations/entities/station.entity';
import { RailLineEntity } from 'src/modules/rail-lines/entities/rail-line.entity';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // entities: [join(process.cwd()),'dist/**/**/**/*.entity.js'],
  entities: [PermissionsEntity, Role_PermissionsEntity, RolesEntity, StaffEntity, ActiveRouteEntity, TrainEntity, StationEntity, RailLineEntity],
  migrations: [join(process.cwd()),`dist/common/config/database/mig,rations/*{.ts,.js}`],
  synchronize: false,
  migrationsRun: false,
  logging: true,
});