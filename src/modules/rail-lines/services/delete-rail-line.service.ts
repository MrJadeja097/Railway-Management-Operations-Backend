import { Injectable } from '@nestjs/common';
import { RailLineRepository } from '../repository/railLines.repository';
import { RailLineMainDto } from '../dto/Rail-Lines Main Dto/rail-line-main.dto';
import { GetRailLineByIdService } from './get-rail-line-by-id.service';
import {
  RpcInternalServerErrorException,
  RPCNotFoundException,
} from 'src/common/exceptions';
import { SearchStationByRailLineService } from 'src/modules/stations/service/search-station-by-rail-line.service';

@Injectable()
export class DeleteRailLineService {
  constructor(
    private readonly RailLineRepo: RailLineRepository,
    private readonly getRailLineByIdService: GetRailLineByIdService,
    private readonly searchStationByRailLineService: SearchStationByRailLineService,
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
    if (stations.length === 0) {
      return await this.RailLineRepo.deleteAsync(id);
    } else {
      throw new RpcInternalServerErrorException(
        'Can not delete this Rail Line until all the station on this rail line are deleted.',
      );
    }
  }
}
