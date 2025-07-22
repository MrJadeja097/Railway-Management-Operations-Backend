import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { BaseRepo } from 'src/common/Base Repository';
import { InjectMapper } from '@automapper/nestjs';
import { TrainEntity } from '../entities/train.entity';
import { TrainMainDto } from '../dto/Train Main Dtos/train-main.dto';
import { TrainResponseDto } from '../dto/Train Response Dtos/train-response.dto';

@Injectable()
export class TrainRepository extends BaseRepo<
  TrainEntity,
  TrainMainDto,
  number
> {
  constructor(
    @InjectRepository(TrainEntity)
    private readonly trainRepo: Repository<TrainEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(trainRepo, classMapper, logger, TrainEntity, TrainMainDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  public mapObjectToResponse(answer : any) {
    return this.classMapper.map(answer, TrainMainDto, TrainResponseDto);
  }

  public mapArrayToResponse(answer : any) {
    return this.classMapper.mapArray(answer, TrainMainDto, TrainResponseDto);
  }
}
