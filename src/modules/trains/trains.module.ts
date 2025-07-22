import { Module } from '@nestjs/common';
import { TrainsController } from './trains.controller';
import { CreateTrainService } from './services/create-train.service';
import { GetAllTrainsService } from './services/get-all-trains.service';
import { AutoMapperProfile } from 'src/profile/automapper.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainEntity } from './entities/train.entity';
import { TrainRepository } from './repository/train.repository';
import { DeleteTrainService } from './services/delete-train.service';
import { SearchTrainService } from './services/search-train.service';
import { GetTrainByIdService } from './services/get-train-by-id.service';
import { JwtModule } from '@nestjs/jwt';
import { UpdateTrainService } from './services/update-train.service';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [TypeOrmModule.forFeature([TrainEntity]), JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
          }),],
  controllers: [TrainsController],
  providers: [TrainRepository, CreateTrainService, GetAllTrainsService, AutoMapperProfile, DeleteTrainService, SearchTrainService, GetTrainByIdService, UpdateTrainService],
  exports: [GetTrainByIdService, UpdateTrainService]
})
export class TrainsModule {}
