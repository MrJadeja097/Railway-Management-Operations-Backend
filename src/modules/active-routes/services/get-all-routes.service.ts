import { Injectable } from '@nestjs/common';
import { ActiveRouteRepository } from '../repository/activeRoutes.repository';
import { RPCNotFoundException } from 'src/common/exceptions';
import { ActiveRouteResponseDto } from '../dto/Routes Response Dtos/routes-response.dto';

@Injectable()
export class GetAllRoutesService {
  constructor(private readonly activeRouteRepo: ActiveRouteRepository) {}

  async getAllActiveRoutes() : Promise<ActiveRouteResponseDto[]> {
    const routes = await this.activeRouteRepo.allAsync({});
    if (routes.length === 0) {
      throw new RPCNotFoundException('No active routes found.');
    }
    return this.activeRouteRepo.mapArrayToResponse(routes);
  }
}
