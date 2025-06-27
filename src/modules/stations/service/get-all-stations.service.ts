import { Injectable } from '@nestjs/common';
import { StationRepository } from '../Repository/stations.repository';
import { StationResponseDto } from '../dto/Station Response Dtos/station-response.dto';

@Injectable()
export class GetAllStationsService {
    constructor(private readonly stationRepo: StationRepository){}

    async allStations(): Promise<StationResponseDto[]>{
        const stations =  await this.stationRepo.allAsync({})
        return this.stationRepo.mapArrayToResponse(stations)
    }
}
