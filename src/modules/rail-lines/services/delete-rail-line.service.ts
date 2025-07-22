import { Injectable } from '@nestjs/common';
import { RailLineRepository } from '../repository/railLines.repository';
import { GetRailLineByIdService } from './get-rail-line-by-id.service';
import {
  RpcInternalServerErrorException,
  RPCNotFoundException,
} from 'src/common/exceptions';
import { SearchStationByRailLineService } from 'src/modules/stations/service/search-station-by-rail-line.service';
import { DeleteStationService } from 'src/modules/stations/service/delete-station.service';

@Injectable()
export class DeleteRailLineService {
  constructor(
    private readonly RailLineRepo: RailLineRepository,
    private readonly getRailLineByIdService: GetRailLineByIdService,
    private readonly searchStationByRailLineService: SearchStationByRailLineService,
    private readonly deleteStationService: DeleteStationService,
  ) {}

  async delete(id: number): Promise<boolean> {
    const check_railLine = await this.getRailLineByIdService.RailLineById(id);
    if (!check_railLine) {
      throw new RPCNotFoundException(`No Rail Line found on id ${id}.`);
    }
    const stations =
      await this.searchStationByRailLineService.searchStationByRailLine(
        check_railLine.name,
      );

    if (stations.length === 2) {
      await this.deleteStationService.deleteForce(check_railLine.startStation.id);
      await this.deleteStationService.deleteForce(check_railLine.endStation.id);
      return await this.RailLineRepo.deleteAsync(id);
    }

    if (stations.length === 0) {
      return await this.RailLineRepo.deleteAsync(id);
    } else {
      throw new RpcInternalServerErrorException(
        'Can not delete this Rail Line until all the stations except start & end stations on this rail line are deleted.',
      );
    }
  }
}