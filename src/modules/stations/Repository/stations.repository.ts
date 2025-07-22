import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';
import { StationEntity } from '../entities/station.entity';
import { StationMainDto } from '../dto/Stations Main Dtos/station-main.dto';
import { BaseRepo } from 'src/common/Base Repository';
import { StationResponseDto } from '../dto/Station Response Dtos/station-response.dto';

@Injectable()
export class StationRepository extends BaseRepo<
  StationEntity,
  StationMainDto,
  number
> {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepo: Repository<StationEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(stationRepo, classMapper, logger, StationEntity, StationMainDto);
  }


  protected override modifyFindOption(
    findOpts: FindManyOptions<StationEntity>,
    filterObj: any,
  ): void {
    super.modifyFindOption(findOpts, filterObj);
    findOpts.relations = ['railLine'];
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

   public mapObjectToResponse(answer : any) {
      return this.classMapper.map(answer, StationMainDto, StationResponseDto);
    }
  
    public mapArrayToResponse(answer : any) {
      return this.classMapper.mapArray(answer, StationMainDto, StationResponseDto);
    }
}