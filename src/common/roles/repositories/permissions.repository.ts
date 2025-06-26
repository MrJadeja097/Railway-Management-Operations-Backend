import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';

import { BaseRepo } from 'src/common/Base Repository';
import { PermissionsEntity } from 'src/common/roles/entities/permissions.entity';
import { PermissionsMainDto } from 'src/common/roles/dto/Main Dtos/permissions-main.dto';
import { IPageableFilterBase, IFilterBase } from 'src/common/Base Repository/filtering';

@Injectable()
export class PermissionsRepository extends BaseRepo<
  PermissionsEntity,
  PermissionsMainDto,
  number
> {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly PermissionsRepo: Repository<PermissionsEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(PermissionsRepo,classMapper,logger,PermissionsEntity,PermissionsMainDto);
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }


  //   public mapObjectToResponse(answer: any) {
  //       return this.classMapper.map(answer, PermissionsMainDto, PermissionsResponseDto);
  //     }

  //     public mapArrayToResponse(answer: any) {
  //       return this.classMapper.mapArray(answer,PermissionsMainDto,PermissionsResponseDto);
  //     }
}
