import { Injectable } from '@nestjs/common';
import { RailLineMainDto } from '../dto/Rail-Lines Main Dto/rail-line-main.dto';
import { UpdateRailLineDto } from '../dto/Rail-Lines Request Dto/update-rail-line.dto';
import { RailLineRepository } from '../repository/railLines.repository';
import { GetStationByIdService } from 'src/modules/stations/service/get-station-by-id.service';
import { GetRailLineByIdService } from './get-rail-line-by-id.service';
import { RPCBadRequestException } from 'src/common/exceptions/badReuest.exception';
import { SearchStationByRailLineService } from 'src/modules/stations/service/search-station-by-rail-line.service';
import { RailLineResponseDto } from '../dto/Rail-Lines Response Dtos/railLine-response.dto';

@Injectable()
export class UpdateRaillineService {
  constructor(
    private readonly RailLineRepo: RailLineRepository,
    private readonly getStationByIdService: GetStationByIdService,
    private readonly getRailLineByIdService: GetRailLineByIdService,
    private readonly searchStationByRailLineService: SearchStationByRailLineService,
  ) {}

  async updateRailLine(
    id: number,
    updateRailLine: UpdateRailLineDto,
  ): Promise<RailLineResponseDto> {
    const RailLine = await this.getRailLineByIdService.RailLineById(id)

    if (typeof (updateRailLine.startStation) === 'number') {
        updateRailLine.startStation = await this.getStationByIdService.stationById(updateRailLine.startStation)
    } 
    if (typeof (updateRailLine.endStation) === 'number') {
        updateRailLine.endStation = await this.getStationByIdService.stationById(updateRailLine.endStation)
    } 

    if ( updateRailLine.startStation && id !== updateRailLine.startStation.railLine.id) {
      throw new RPCBadRequestException("Start station should be on this rail line.")
    }

    if (updateRailLine.endStation && id !== updateRailLine.endStation.railLine.id) {
      throw new RPCBadRequestException("End station should be on this rail line.")
    }

    RailLine.name = updateRailLine.name ? updateRailLine.name : RailLine.name; 
    RailLine.startStation = updateRailLine.startStation ? updateRailLine.startStation : RailLine.startStation; 
    RailLine.endStation = updateRailLine.endStation ? updateRailLine.endStation : RailLine.endStation; 
    RailLine.description = updateRailLine.description ? updateRailLine.description : RailLine.description; 
    RailLine.totalLength = updateRailLine.totalLength ? updateRailLine.totalLength : RailLine.totalLength; 
    
    const totalStations = await this.searchStationByRailLineService.searchStationByRailLine(RailLine.name)

    RailLine.totalStations = totalStations.length;

    const updated = await this.RailLineRepo.updateAsync(RailLine as unknown as RailLineMainDto)
    return this.RailLineRepo.mapObjectToResponse(updated)
  }
}
