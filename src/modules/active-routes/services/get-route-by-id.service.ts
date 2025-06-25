import { Injectable } from '@nestjs/common';
import { RPCNotFoundException } from 'src/common/exceptions';
import { ActiveRouteRepository } from '../repository/activeRoutes.repository';
import { ActiveRouteMainDto } from '../dto/Routes Main Dtos/active-routes-main.dto';
import { ActiveRouteResponseDto } from '../dto/Routes Response Dtos/routes-response.dto';

@Injectable()
export class GetRouteByIdService {
    constructor(private readonly activeRouteRepo: ActiveRouteRepository) {}
    
      async getActiveRouteById( id : number)  : Promise<ActiveRouteResponseDto>{
        const routes = await this.activeRouteRepo.allAsync({id : id});
        if (routes.length === 0) {
          throw new RPCNotFoundException('No active routes found.');
        }
        return this.activeRouteRepo.mapObjectToResponse(routes[0]);
      }
}
