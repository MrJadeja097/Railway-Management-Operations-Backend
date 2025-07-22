import { Injectable } from '@nestjs/common';
import { RailLineRepository } from '../repository/railLines.repository';
import { RPCNotFoundException } from 'src/common/exceptions';
import { RailLineResponseDto } from '../dto/Rail-Lines Response Dtos/railLine-response.dto';

@Injectable()
export class GetAllRailLinesService {
  constructor(private readonly railLineRepository: RailLineRepository) {}

  async getAll() : Promise<RailLineResponseDto[]>{
    const railLines = await this.railLineRepository.allAsync({})
    if (railLines.length === 0) {
      throw new RPCNotFoundException("No Rail lines found.")
    }

    return await this.railLineRepository.mapArrayToResponse(railLines);
  }
}
