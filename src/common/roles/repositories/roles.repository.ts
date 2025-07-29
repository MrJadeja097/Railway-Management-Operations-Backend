import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';

import { BaseRepo } from 'src/common/Base Repository';
import { RolesEntity } from '../entities/role.entity';
import { RoleMainDto } from '../dto/Main Dtos/roles-main.dto';

@Injectable()
export class RolesRepository extends BaseRepo<
  RolesEntity,
  RoleMainDto,
  number
> {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly RolesRepo: Repository<RolesEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(RolesRepo,classMapper,logger,RolesEntity,RoleMainDto);
  }

  // public override get softDeleteEnabled(): boolean {
  //   return true;
  // }

  //   public mapObjectToResponse(answer: any) {
  //       return this.classMapper.map(answer, RolesMainDto, RolesResponseDto);
  //     }

  //     public mapArrayToResponse(answer: any) {
  //       return this.classMapper.mapArray(answer,RolesMainDto,RolesResponseDto);
  //     }
}
