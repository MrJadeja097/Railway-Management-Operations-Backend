import { Module } from '@nestjs/common';
import { ActiveRoutesController } from './routes.controller';
import { CreateRouteService } from './services/create-route.service';
import { GetAllRoutesService } from './services/get-all-routes.service';
import { GetRouteByIdService } from './services/get-route-by-id.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveRouteEntity } from './entities/activeRoute.entity';
import { StaffModule } from '../staff/staff.module';
import { RailLinesModule } from '../rail-lines/rail-lines.module';
import { TrainsModule } from '../trains/trains.module';
import { StationsModule } from '../stations/stations.module';
import { ActiveRouteRepository } from './repository/activeRoutes.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ActiveRouteEntity]),JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
          }), StaffModule, RailLinesModule, TrainsModule, StationsModule],
  controllers: [ActiveRoutesController],
  providers: [ActiveRouteRepository, CreateRouteService, GetAllRoutesService, GetRouteByIdService],
})
export class ActiveRoutesModule {}
