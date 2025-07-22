import { Injectable } from '@nestjs/common';
import { TrainMainDto } from '../dto/Train Main Dtos/train-main.dto';
import { TrainRepository } from '../repository/train.repository';
import { UpdateTrainDto } from '../dto/Train Request Dtos/update-train.dto';
import { GetTrainByIdService } from './get-train-by-id.service';
import { TrainResponseDto } from '../dto/Train Response Dtos/train-response.dto';
@Injectable()
export class UpdateTrainService {
  constructor(private readonly trainRepo: TrainRepository, private readonly getTrainByIdService: GetTrainByIdService) {}

  async update(id: number, updateTrain : UpdateTrainDto): Promise<TrainResponseDto> {
    const train = await this.getTrainByIdService.trainById(id)

    train.name = updateTrain.name ? updateTrain.name : train.name
    train.description = updateTrain.description ? updateTrain.description : train.description
    train.status = updateTrain.status ? updateTrain.status : train.status
    train.top_speed = updateTrain.top_speed ? updateTrain.top_speed : train.top_speed
    train.total_coaches = updateTrain.total_coaches ? updateTrain.total_coaches : train.total_coaches
    
    const update_train =  await this.trainRepo.updateAsync(train as unknown as TrainMainDto)
    return this.trainRepo.mapObjectToResponse(update_train)
  }
}
