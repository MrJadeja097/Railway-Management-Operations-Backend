import { Injectable } from '@nestjs/common';
import { TrainRepository } from '../repository/train.repository';
import { RPCNotFoundException } from 'src/common/exceptions';
import { TrainResponseDto } from '../dto/Train Response Dtos/train-response.dto';

@Injectable()
export class SearchTrainService {
  constructor(private readonly trainRepo: TrainRepository) {}

  async searchTrain(name: string): Promise<TrainResponseDto[]> {
    const trains = await this.trainRepo.allAsync({ name: name });
    if (trains.length === 0) {
      throw new RPCNotFoundException(`No train have name like ${name}`);
    }
    return this.trainRepo.mapArrayToResponse(trains);
  }
}
