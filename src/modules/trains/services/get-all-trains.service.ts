import { Injectable } from '@nestjs/common';
import { TrainRepository } from '../repository/train.repository';
import { TrainResponseDto } from '../dto/Train Response Dtos/train-response.dto';

@Injectable()
export class GetAllTrainsService {
    constructor(private readonly trainRepo: TrainRepository){}
    
        async allTrains() : Promise<TrainResponseDto[]>{
            const trains = await this.trainRepo.allAsync({})
            return this.trainRepo.mapArrayToResponse(trains)
        }
}
