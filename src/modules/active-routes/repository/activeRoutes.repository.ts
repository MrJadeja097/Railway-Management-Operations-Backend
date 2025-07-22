import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';

import { BaseRepo } from 'src/common/Base Repository';
import { ActiveRouteMainDto } from '../dto/Routes Main Dtos/active-routes-main.dto';
import { ActiveRouteEntity } from '../entities/activeRoute.entity';
import { ActiveRouteResponseDto } from '../dto/Routes Response Dtos/routes-response.dto';

@Injectable()
export class ActiveRouteRepository extends BaseRepo<
  ActiveRouteEntity,
  ActiveRouteMainDto,
  number
> {
  constructor(
    @InjectRepository(ActiveRouteEntity)
    private readonly ActiveRouteRepo: Repository<ActiveRouteEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(ActiveRouteRepo, classMapper, logger, ActiveRouteEntity, ActiveRouteMainDto);
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<ActiveRouteEntity>,
    filterObj: any,
  ): void {
    super.modifyFindOption(findOpts, filterObj);
    findOpts.relations = ['startStation', 'endStation', 'driver', 'back_guard', 'trainId', 'railLineId'];
  }

  public override get softDeleteEnabled(): boolean {
    return true
  }

  public mapObjectToResponse(answer: any) {
      return this.classMapper.map(answer, ActiveRouteMainDto, ActiveRouteResponseDto);
    }
  
    public mapArrayToResponse(answer: any) {
      return this.classMapper.mapArray(answer,ActiveRouteMainDto,ActiveRouteResponseDto);
    }
}