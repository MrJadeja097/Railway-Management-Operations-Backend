import { Injectable } from '@nestjs/common';
import { StationRepository } from '../Repository/stations.repository';
import { StationMainDto } from '../dto/Stations Main Dtos/station-main.dto';
import { RPCNotFoundException } from 'src/common/exceptions';
import { StationResponseDto } from '../dto/Station Response Dtos/station-response.dto';

@Injectable()
export class GetStationByIdService {
  constructor(private readonly stationRepo: StationRepository) {}

  async stationById(id: number): Promise<StationResponseDto> {
    const stations =  await this.stationRepo.allAsync({id:id});
    if (stations.length === 0) {
                  throw new RPCNotFoundException(`No station found on id ${id}.`);
                }
    return this.stationRepo.mapObjectToResponse(stations[0])
  }
}
