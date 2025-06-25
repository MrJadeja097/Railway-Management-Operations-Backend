import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';

import { BaseRepo } from 'src/common/Base Repository';
import { RailLineMainDto } from '../dto/Rail-Lines Main Dto/rail-line-main.dto';
import { RailLineEntity } from '../entities/rail-line.entity';
import { RailLineResponseDto } from '../dto/Rail-Lines Response Dtos/railLine-response.dto';

@Injectable()
export class RailLineRepository extends BaseRepo<
  RailLineEntity,
  RailLineMainDto,
  number
> {
  constructor(
    @InjectRepository(RailLineEntity)
    private readonly RailLineRepo: Repository<RailLineEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(RailLineRepo, classMapper, logger, RailLineEntity, RailLineMainDto);
  }

  protected override modifyFindOption(
    findOpts: FindManyOptions<RailLineEntity>,
    filterObj: any,
  ): void {
    super.modifyFindOption(findOpts, filterObj);
    findOpts.relations = ['startStation', 'endStation'];
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public mapObjectToResponse(answer: any) {
    return this.classMapper.map(answer, RailLineMainDto, RailLineResponseDto);
  }

  public mapArrayToResponse(answer: any) {
    return this.classMapper.mapArray(answer,RailLineMainDto,RailLineResponseDto);
  }
}
