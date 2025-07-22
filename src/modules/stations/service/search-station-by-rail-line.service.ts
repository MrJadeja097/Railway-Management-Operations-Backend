import { Injectable } from '@nestjs/common';
import { RPCNotFoundException } from 'src/common/exceptions';
import { StationRepository } from '../Repository/stations.repository';
import { StationResponseDto } from '../dto/Station Response Dtos/station-response.dto';

@Injectable()
export class SearchStationByRailLineService {
  constructor(private readonly stationRepo: StationRepository) {}

  async searchStationByRailLine(name: string): Promise<StationResponseDto[]> {
    const all_stations = this.stationRepo.allAsync({});
    if ((await all_stations).length === 0) {
      throw new RPCNotFoundException(`No station have name like ${name}`);
    }
    const stations = (await all_stations).filter((station) => {
      if (station.railLine.name.toLowerCase().includes(name.toLowerCase()))
        return station;
    });
    return this.stationRepo.mapArrayToResponse(stations);
  }
}
