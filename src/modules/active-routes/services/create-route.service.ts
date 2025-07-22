import { Injectable } from '@nestjs/common';
import { ActiveRouteRepository } from '../repository/activeRoutes.repository';
import { CreateRouteDto } from '../dto/Routes Request Dtos/create-route.dto';
import { GetStaffByArgsService } from 'src/modules/staff/services/get-staff-by-args.service';
import { GetTrainByIdService } from 'src/modules/trains/services/get-train-by-id.service';
import { GetStationByIdService } from 'src/modules/stations/service/get-station-by-id.service';
import { GetRailLineByIdService } from 'src/modules/rail-lines/services/get-rail-line-by-id.service';
import { RPCBadRequestException } from 'src/common/exceptions/badReuest.exception';
import { TrainStatus } from 'src/modules/trains/entities/train.entity';
import { ActiveRouteMainDto } from '../dto/Routes Main Dtos/active-routes-main.dto';
import { DbException } from 'src/common/exceptions';
import { UpdateTrainService } from 'src/modules/trains/services/update-train.service';
import { ActiveRouteResponseDto } from '../dto/Routes Response Dtos/routes-response.dto';

@Injectable()
export class CreateRouteService {
  constructor(
    private readonly activeRouteRepo: ActiveRouteRepository,
    private readonly getStaffByArgsService: GetStaffByArgsService,
    private readonly getTrainByIdService: GetTrainByIdService,
    private readonly getStationByIdService: GetStationByIdService,
    private readonly getRailLineByIdService: GetRailLineByIdService,
    private readonly updateTrainService: UpdateTrainService,
  ) {}

  async create(createRoute: CreateRouteDto) : Promise<ActiveRouteResponseDto> {

    if (
      typeof createRoute.startStation === 'number' &&
      typeof createRoute.endStation === 'number' &&
      typeof createRoute.driver === 'number' &&
      typeof createRoute.back_guard === 'number' &&
      typeof createRoute.railLineId === 'number' &&
      typeof createRoute.trainId === 'number'
    ) {

    const startStation = await this.getStationByIdService.stationById(createRoute.startStation)
    const endStation = await this.getStationByIdService.stationById(createRoute.endStation)
    const driver = await this.getStaffByArgsService.findbyId(createRoute.driver)
    const backGuard = await this.getStaffByArgsService.findbyId(createRoute.back_guard)
    const train = await this.getTrainByIdService.trainById(createRoute.trainId)
    const railLine = await this.getRailLineByIdService.RailLineById(createRoute.railLineId)

    if (startStation.railLine.id !== endStation.railLine.id || startStation.railLine.id  != createRoute.railLineId ) {
        throw new RPCBadRequestException("Start station's rail line, end station's rail line and Rail line you entered have to be same.")
    }

    // if(driver.role !== StaffRole.DRIVER){
    //     throw new RPCBadRequestException("The staff member id you entered at driver is not a driver.")
    // }

    // if(backGuard.role !== StaffRole.BACK_GUARD){
    //     throw new RPCBadRequestException("The staff member id you entered at driver is not a driver.")
    // }

    if (train.status !== TrainStatus.ACTIVE) {
        throw new RPCBadRequestException("The train id not active to put on any route.")
    }

    createRoute.startStation = startStation;
    createRoute.endStation = endStation;
    createRoute.driver = driver;
    createRoute.back_guard = backGuard;
    createRoute.trainId = train;
    createRoute.railLineId = railLine;

    const active_route = await this.activeRouteRepo.createAsync(createRoute as unknown as ActiveRouteMainDto)

    if (!active_route) {
      throw new DbException("Error while creating route")
    }

    const update_train = await this.updateTrainService.update(active_route.trainId.id, {status: TrainStatus.ON_ACTIVEROUTE})

    return this.activeRouteRepo.mapObjectToResponse(active_route);
    } else {
        throw new RPCBadRequestException('You have entered somrthing else insted of number in input fields.')
    }
  }
}