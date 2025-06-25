import { Injectable } from '@nestjs/common';
import { StationRepository } from '../Repository/stations.repository';
import { GetStationByIdService } from './get-station-by-id.service';
import { RpcInternalServerErrorException, RPCNotFoundException } from 'src/common/exceptions';
import { GetRailLineByIdService } from 'src/modules/rail-lines/services/get-rail-line-by-id.service';

@Injectable()
export class DeleteStationService {
  constructor(
    private readonly stationRepo: StationRepository,
    private readonly getStationByIdService: GetStationByIdService,
    private readonly getRailLineByIdService: GetRailLineByIdService,
  ) {}

  async delete(id: number) {
    const check_station = await this.getStationByIdService.stationById(id);
    if (!check_station) {
      throw new RPCNotFoundException(`No station found on id ${id}.`);
    }
    const railLine = await this.getRailLineByIdService.RailLineById(check_station.railLine.id)
    if (railLine.startStation.id === id || railLine.endStation.id === id) {
      throw new RpcInternalServerErrorException("Can not delete this staion, because it is at the start or end of the rail line.")
    }
    return await this.stationRepo.deleteAsync(id);
  }
}
