import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
      .forRoutes(
        { path:'staff', method:RequestMethod.POST},
        { path:'staff/:id', method:RequestMethod.GET},
        { path:'staff/', method:RequestMethod.GET},
        { path:'staff/:id', method:RequestMethod.DELETE},
        { path:'staff/find-user-by-args', method:RequestMethod.POST},
        { path:'staff/assign-role-to-staff/:staffId/:role', method:RequestMethod.GET},

        { path:'stations', method:RequestMethod.POST},
        { path:'stations/:id', method:RequestMethod.GET},
        { path:'stations/:id', method:RequestMethod.PATCH},
        { path:'stations/:id', method:RequestMethod.DELETE},
        { path:'stations/searchStationByName/:name', method:RequestMethod.GET},
        { path:'stations/searchStationByRailLine/:RailLineName', method:RequestMethod.GET},

        { path:'trains', method:RequestMethod.POST},
        { path:'trains/:name', method:RequestMethod.GET},
        { path:'trains/findById/:id', method:RequestMethod.GET},
        { path:'trains/:id', method:RequestMethod.PATCH},
        { path:'trains/:id', method:RequestMethod.DELETE},
        
        { path:'routes/create-route', method:RequestMethod.POST},
        { path:'routes/:id', method:RequestMethod.GET},

        { path:'rail-lines', method:RequestMethod.POST},
        { path:'rail-lines', method:RequestMethod.GET},
        { path:'rail-lines/:id', method:RequestMethod.GET},
        { path:'rail-lines/:id', method:RequestMethod.PATCH},
        { path:'rail-lines/:id', method:RequestMethod.DELETE},
      )
  }
}