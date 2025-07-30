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

  async create(createStation: CreateStationDto): Promise<StationResponseDto> {
    try {
      const station = await this.stationRepo.createAsync(
        createStation as unknown as StationMainDto,
      );
      this.updateRaillineService.updateRailLine(station.rail_line_id, {});
      return this.stationRepo.mapObjectToResponse(station);
    } catch (error) {
      if (
        error.error.table === 'station_entity' &&
        error.error.constraint === 'rail_line_id'
      ) {
        throw new RPCBadRequestException('Rail Line id is inaccurate.');
      }
      if (
        error.error.table === 'station_entity' &&
        error.error.constraint === 'UQ_dee947e3b88a53c8752d2c46aef'
      ) {
        throw new RPCBadRequestException('Station with that name already exist.');
      }
      throw new RPCBadRequestException("Unknown error captured.");
    }
  }
}
