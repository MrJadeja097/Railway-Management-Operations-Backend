import { Injectable } from '@nestjs/common';
import { TrainRepository } from '../repository/train.repository';
import { RPCNotFoundException } from 'src/common/exceptions';

@Injectable()
export class DeleteTrainService {
  constructor(private readonly trainRepo: TrainRepository) {}

  async delete(id: number) : Promise<boolean> {
    const train = await this.trainRepo.allAsync({id:id})
    if (train.length === 0 ) {
        throw new RPCNotFoundException(`Train is not found on id ${id}`);
    }
    return await this.trainRepo.deleteAsync(id)
  }
}
