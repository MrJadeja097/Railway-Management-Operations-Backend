import { Injectable, NotFoundException } from '@nestjs/common';
import { RailLineRepository } from '../repository/railLines.repository';
import { RailLineMainDto } from '../dto/Rail-Lines Main Dto/rail-line-main.dto';
import { CreateRailLineDto } from '../dto/Rail-Lines Request Dto/create-rail-line.dto';
import { GetStationByIdService } from 'src/modules/stations/service/get-station-by-id.service';
import {
  DbException,
  RpcInternalServerErrorException,
} from 'src/common/exceptions';
import { CreateStationService } from 'src/modules/stations/service/create-station.service';
import { isObject } from 'class-validator';
import { UpdateStationService } from 'src/modules/stations/service/update-station.service';
import { UpdateRaillineService } from './update-railline.service';
import { RPCBadRequestException } from 'src/common/exceptions/badReuest.exception';

@Injectable()
export class CreateRailLineService {
  constructor(
    private readonly railLineRepository: RailLineRepository,
    private readonly getStationByIdService: GetStationByIdService,
    private readonly createStationService: CreateStationService,
    private readonly updateStationService: UpdateStationService,
    private readonly updateRaillineService: UpdateRaillineService,
  ) {}

  async create(createRailLine: CreateRailLineDto) {
    if (
      typeof createRailLine.startStation === 'number' &&
      typeof createRailLine.endStation === 'number'
    ) {
      const confirm_startStation = await this.getStationByIdService.stationById(
        createRailLine.startStation,
      );
      const confirm_endStation = await this.getStationByIdService.stationById(
        createRailLine.endStation,
      );

      if (
        !confirm_endStation ||
        Object.keys(confirm_startStation).length === 0 ||
        !confirm_endStation ||
        Object.keys(confirm_endStation).length === 0
      ) {
        throw new NotFoundException(
          'Either start station or end station is irrelevant',
        );
      } else {
        if (
          confirm_startStation.railLine.id !== confirm_endStation.railLine.id
        ) {
          throw new RpcInternalServerErrorException(
            'Start station and end station should be on same rail line.',
          );
        } else {
          const created = await this.railLineRepository.createAsync(
            createRailLine as unknown as RailLineMainDto,
          );
          return this.railLineRepository.mapObjectToResponse(created);
        }
      }
    } else if (
      isObject(createRailLine.startStation) &&
      isObject(createRailLine.endStation)
    ) {
      const create_startStation = await this.createStationService.create(
        createRailLine.startStation,
      );
      const create_endStation = await this.createStationService.create(
        createRailLine.endStation,
      );

      if (
        create_startStation !== undefined &&
        create_endStation !== undefined
      ) {
        createRailLine.startStation = create_startStation.id;
        createRailLine.endStation = create_endStation!.id;

        const create_railline = await this.railLineRepository.createAsync(
          createRailLine as unknown as RailLineMainDto,
        );

        create_startStation.railLine = create_railline;
        create_endStation.railLine = create_railline;

        const update_startStation = await this.updateStationService.update(
          create_startStation,
          create_startStation.id,
        );
        const update_endStation = await this.updateStationService.update(
          create_endStation,
          create_endStation.id,
        );

        if (!update_startStation && !update_endStation) {
          throw new DbException('Error while updating stations.');
        }

        await this.updateRaillineService.updateRailLine(create_railline.id, {});

        return this.railLineRepository.mapObjectToResponse(create_railline);
      }
    } else {
      throw new RPCBadRequestException();
    }
  }
}
