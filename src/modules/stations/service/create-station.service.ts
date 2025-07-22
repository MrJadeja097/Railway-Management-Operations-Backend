import { Injectable } from '@nestjs/common';
import { CreateStationDto } from '../dto/Station Request Dtos/create-station.dto';
import { StationRepository } from '../Repository/stations.repository';
import { GetRailLineByIdService } from '../../rail-lines/services/get-rail-line-by-id.service';
import { StationMainDto } from '../dto/Stations Main Dtos/station-main.dto';
import { UpdateRaillineService } from 'src/modules/rail-lines/services/update-railline.service';
import { StationResponseDto } from '../dto/Station Response Dtos/station-response.dto';
import { RPCBadRequestException } from 'src/common/exceptions/badReuest.exception';

@Injectable()
export class CreateStationService {
  constructor(
    private readonly stationRepo: StationRepository,
    private readonly getRailLineByIdService: GetRailLineByIdService,
    private readonly updateRaillineService: UpdateRaillineService,
  ) {}

  async create(createStation: CreateStationDto) : Promise<StationResponseDto>{
    if (typeof createStation.railLine === 'number') {
      try {
        const rail_line = await this.getRailLineByIdService.RailLineById(createStation.railLine);
        createStation.railLine = rail_line;
        const station = await this.stationRepo.createAsync(createStation as unknown as StationMainDto);
        this.updateRaillineService.updateRailLine(rail_line.id, {})
        return this.stationRepo.mapObjectToResponse(station);
      } catch (error) {
        throw new RPCBadRequestException(error.error.message)
      }
    } else {
     const station = await this.stationRepo.createAsync(createStation as unknown as StationMainDto);
        return this.stationRepo.mapObjectToResponse(station);
    }
  }
}
