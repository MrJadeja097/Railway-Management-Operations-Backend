import { Injectable } from '@nestjs/common';
import { StationRepository } from '../Repository/stations.repository';
import { RPCNotFoundException } from 'src/common/exceptions';
import { StationResponseDto } from '../dto/Station Response Dtos/station-response.dto';

@Injectable()
export class SearchStationService {
      constructor(private readonly stationRepo: StationRepository) {}
    
      async searchStation(name: string): Promise<StationResponseDto[]> {
        const station = await this.stationRepo.allAsync({ name: name });
        if (station.length === 0) {
          throw new RPCNotFoundException(`No station have name like ${name}`);
        }
        return this.stationRepo.mapArrayToResponse(station);
      }
}