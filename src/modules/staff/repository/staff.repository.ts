import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';

import { StaffEntity } from '../entities/staff.entity';
import { StaffMainDto } from '../dto/Staff Main Dtos/staff-main.dto';
import { InjectMapper } from '@automapper/nestjs';
import { BaseRepo } from 'src/common/Base Repository';
import { StaffResponseDto } from '../dto/Staff Response Dtos/staff-response.dto';
import { IPageableFilterBase, IFilterBase } from 'src/common/Base Repository/filtering';

@Injectable()
export class StaffRepository extends BaseRepo<
  StaffEntity,
  StaffMainDto,
  number
> {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepo: Repository<StaffEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(staffRepo, classMapper, logger, StaffEntity, StaffMainDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  protected modifyFindOption(findOpts: FindManyOptions<StaffEntity>, filterObj: Partial<StaffMainDto & IPageableFilterBase<number>> | Partial<StaffMainDto & IFilterBase<number>>): void {
    findOpts.relations= ['role']
  }

  public mapObjectToResponse(answer: any) {
    return this.classMapper.map(answer, StaffMainDto, StaffResponseDto);
  }

  public mapArrayToResponse(answer: any) {
    return this.classMapper.mapArray(answer,StaffMainDto,StaffResponseDto);
  }
}
