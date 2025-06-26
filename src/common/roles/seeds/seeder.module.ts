import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PermissionSeedService } from './permissions.seeder.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from '../entities/permissions.entity';
import { AppDataSource } from 'src/common/config/database/typeorm-config';
import { PermissionsRepository } from '../repositories/permissions.repository';
import { LoggerModule } from 'nestjs-pino';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AutoMapperProfile } from 'src/profile/automapper.profile';
import { RolesRepository } from '../repositories/roles.repository';
import { RolesSeedService } from './role.seeder.service';
import { RolesEntity } from '../entities/role.entity';
import { Role_PermissionsSeedService } from './role_permissions.seed.service';
import { Role_PermissionsRepository } from '../repositories/role-permissions.repository';
import { Role_PermissionsEntity } from '../entities/role-permissions.entity';
dotenv.config({ path: '.././.env' });

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([PermissionsEntity, RolesEntity, Role_PermissionsEntity]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [Role_PermissionsSeedService, Role_PermissionsRepository,PermissionSeedService, PermissionsRepository, AutoMapperProfile, RolesRepository, RolesSeedService],
})
export class SeedModule {}
