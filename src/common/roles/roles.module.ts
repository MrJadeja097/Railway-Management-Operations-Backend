import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import { AppDataSource } from "../config/database/typeorm-config";
import { PermissionsEntity } from "./entities/permissions.entity";
import { Role_PermissionsEntity } from "./entities/role-permissions.entity";
import { RolesEntity } from "./entities/role.entity";
import { RolesRepository } from "./repositories/roles.repository";
import { PermissionsRepository } from "./repositories/permissions.repository";
import { Role_PermissionsRepository } from "./repositories/role-permissions.repository";
import { AutoMapperProfile } from "src/profile/automapper.profile";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([
      PermissionsEntity,
      RolesEntity,
      Role_PermissionsEntity,
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            singleLine: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesRepository,
    PermissionsRepository,
    Role_PermissionsRepository,
    AutoMapperProfile,
  ],
  exports: [RolesService],
})
export class RolesModule {}
