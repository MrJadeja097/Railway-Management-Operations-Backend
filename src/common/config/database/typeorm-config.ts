import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(process.cwd()),'dist/modules/**/**/*.entity.js'],
  // entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(process.cwd()),`dist/common/config/database/migrations/*{.ts,.js}`],
  synchronize: false,
  migrationsRun: false,
  logging: true,
});