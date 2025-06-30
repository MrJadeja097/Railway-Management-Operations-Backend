import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ActiveRoutesModule } from './modules/active-routes/routes.module';
import { TrainsModule } from './modules/trains/trains.module';
import { StationsModule } from './modules/stations/stations.module';
import { RailLinesModule } from './modules/rail-lines/rail-lines.module';
import { ConfigModule } from '@nestjs/config';
import { StaffModule } from './modules/staff/staff.module';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './common/config/database/typeorm-config';
import { AuthenticateTokenMiddleware } from './common/Middlewares/token-check.middleware';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './common/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RolesModule } from './common/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }), 
    StationsModule,
    RailLinesModule,
    ActiveRoutesModule,
    TrainsModule,
    StaffModule,
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
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
    AuthModule,
    RolesModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateTokenMiddleware)
      .forRoutes('staff', 'trains', 'stations', 'rail-lines');
  }
}
