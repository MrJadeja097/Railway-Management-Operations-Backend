import { Injectable } from '@nestjs/common';
import { StationRepository } from '../Repository/stations.repository';
import { UpdateStationDto } from '../dto/Station Request Dtos/update-station.dto';
import { StationMainDto } from '../dto/Stations Main Dtos/station-main.dto';
import { StationResponseDto } from '../dto/Station Response Dtos/station-response.dto';
import { GetRailLineByIdService } from 'src/modules/rail-lines/services/get-rail-line-by-id.service';

@Injectable()
export class UpdateStationService {
  constructor(private readonly stationRepo: StationRepository,
    private readonly getRailLineByIdService:GetRailLineByIdService) {}

  async update(updateStation: UpdateStationDto, id: number) : Promise<StationResponseDto> {
    updateStation.id = id;
    if(updateStation.railLine && typeof (updateStation.railLine) === 'number' ){
      updateStation.railLine = await this.getRailLineByIdService.RailLineById(updateStation.railLine)
    }
    const update_station =  await this.stationRepo.updateAsync(updateStation as unknown as StationMainDto);
    return this.stationRepo.mapObjectToResponse(update_station)
  }
}