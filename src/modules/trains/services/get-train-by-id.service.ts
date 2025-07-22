import { Injectable } from '@nestjs/common';
import { RPCNotFoundException } from 'src/common/exceptions';
import { TrainRepository } from '../repository/train.repository';
import { TrainResponseDto } from '../dto/Train Response Dtos/train-response.dto';

@Injectable()
export class GetTrainByIdService {
  constructor(private readonly trainRepo: TrainRepository) {}

  async trainById(id: number): Promise<TrainResponseDto> {
    const trains = await this.trainRepo.allAsync({ id: id });
    if (trains.length === 0) {
      throw new RPCNotFoundException(`No train found on train id ${id}`);
    }
    return this.trainRepo.mapObjectToResponse(trains[0]);
  }
}
