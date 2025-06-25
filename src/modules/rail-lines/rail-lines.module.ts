import { forwardRef, Module } from '@nestjs/common';
import { RailLinesController } from './rail-lines.controller';
import { RailLineRepository } from './repository/railLines.repository';
import { RailLineEntity } from './entities/rail-line.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoMapperProfile } from 'src/profile/automapper.profile';
import { GetAllRailLinesService } from './services/get-all-rail-lines.service';
import { GetRailLineByIdService } from './services/get-rail-line-by-id.service';
import { CreateRailLineService } from './services/create-rail-line.service';
import { StationsModule } from '../stations/stations.module';
import { DeleteRailLineService } from './services/delete-rail-line.service';
import { JwtModule } from '@nestjs/jwt';
import { UpdateRaillineService } from './services/update-railline.service';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [forwardRef(() => StationsModule), TypeOrmModule.forFeature([RailLineEntity]),  JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
          }),],
  controllers: [RailLinesController],
  providers: [ RailLineRepository, AutoMapperProfile, GetAllRailLinesService, GetRailLineByIdService, CreateRailLineService, DeleteRailLineService, UpdateRaillineService],
  exports: [GetRailLineByIdService, UpdateRaillineService]
})
export class RailLinesModule {}
