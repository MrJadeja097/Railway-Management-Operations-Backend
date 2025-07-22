import { forwardRef, Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from './entities/station.entity';
import { CreateStationService } from './service/create-station.service';
import { GetAllStationsService } from './service/get-all-stations.service';
import { GetStationByIdService } from './service/get-station-by-id.service';
import { StationRepository } from './Repository/stations.repository';
import { AutoMapperProfile } from 'src/profile/automapper.profile';
import { RailLinesModule } from '../rail-lines/rail-lines.module';
import { UpdateStationService } from './service/update-station.service';
import { DeleteStationService } from './service/delete-station.service';
import { SearchStationService } from './service/search-station.service';
import { SearchStationByRailLineService } from './service/search-station-by-rail-line.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity]), forwardRef(() => RailLinesModule), JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
          }),],
  controllers: [StationsController],
  providers: [StationsService, CreateStationService, GetAllStationsService, GetStationByIdService, StationRepository, AutoMapperProfile, UpdateStationService, DeleteStationService, SearchStationService, SearchStationByRailLineService],
  exports: [GetStationByIdService, CreateStationService, UpdateStationService, SearchStationByRailLineService, DeleteStationService]
})
export class StationsModule {}
