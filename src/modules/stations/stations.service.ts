import { Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/Station Request Dtos/create-station.dto';
import { UpdateStationDto } from './dto/Station Request Dtos/update-station.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StationEntity } from './entities/station.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StationsService {
  constructor(@InjectRepository(StationEntity) private readonly stationRepo: Repository<StationEntity>){}
  create(createStationDto: CreateStationDto) {
    return 'This action adds a new station';
  }

  findAll() {
    return this.stationRepo.find({relations: ['railLine']});
  }

  findOne(id: number) {
    return `This action returns a #${id} station`;
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    return `This action updates a #${id} station`;
  }

  remove(id: number) {
    return `This action removes a #${id} station`;
  }
}
