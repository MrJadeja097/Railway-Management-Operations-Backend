import { Injectable } from '@nestjs/common';
import { RailLineRepository } from '../repository/railLines.repository';
import { RailLineMainDto } from '../dto/Rail-Lines Main Dto/rail-line-main.dto';
import { RPCNotFoundException } from 'src/common/exceptions';
import { RailLineResponseDto } from '../dto/Rail-Lines Response Dtos/railLine-response.dto';

@Injectable()
export class GetRailLineByIdService {
      constructor(private readonly RailLineRepo: RailLineRepository) {}
    
      async RailLineById(id: number) : Promise<RailLineResponseDto>{
        const RailLine =  await this.RailLineRepo.allAsync({id:id});
        if (RailLine.length === 0) {
              throw new RPCNotFoundException(`No Rail Line found on id ${id}.`);
            }
        return await this.RailLineRepo.mapObjectToResponse(RailLine[0]);
      }
}
