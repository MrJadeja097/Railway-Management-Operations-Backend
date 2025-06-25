import { Injectable } from '@nestjs/common';
import { TrainRepository } from '../repository/train.repository';
import { CreateTrainDto } from '../dto/Train Request Dtos/create-train.dto';
import { TrainMainDto } from '../dto/Train Main Dtos/train-main.dto';
import { TrainResponseDto } from '../dto/Train Response Dtos/train-response.dto';

@Injectable()
export class CreateTrainService {
  constructor(private readonly trainRepo: TrainRepository) {}

  async create(createTrain: CreateTrainDto): Promise<TrainResponseDto> {
    const train = await this.trainRepo.createAsync(createTrain as unknown as TrainMainDto);
    return this.trainRepo.mapObjectToResponse(train);
  }
}
