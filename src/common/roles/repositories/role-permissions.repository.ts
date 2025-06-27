import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { PinoLogger } from 'nestjs-pino';
import { InjectMapper } from '@automapper/nestjs';

import { BaseRepo } from 'src/common/Base Repository';
import { Role_PermissionsEntity } from '../entities/role-permissions.entity';
import { Role_PermissionsMainDto } from '../dto/Main Dtos/role_permissions-main.dto';
import {
  IPageableFilterBase,
  IFilterBase,
} from 'src/common/Base Repository/filtering';

@Injectable()
export class Role_PermissionsRepository extends BaseRepo<
  Role_PermissionsEntity,
  Role_PermissionsMainDto,
  {role_id: number, permission_id: number}
> {
  constructor(
    @InjectRepository(Role_PermissionsEntity)
    private readonly Role_PermissionsRepo: Repository<Role_PermissionsEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    logger: PinoLogger,
  ) {
    super(
      Role_PermissionsRepo,
      classMapper,
      logger,
      Role_PermissionsEntity,
      Role_PermissionsMainDto,
    );
  }

  public override get softDeleteEnabled(): boolean {
    return true;
  }

  protected modifyFindOption(
    findOpts: FindManyOptions<Role_PermissionsEntity>,
    filterObj:
      | Partial<Role_PermissionsMainDto & IPageableFilterBase<{role_id: number, permission_id: number}>>
      | Partial<Role_PermissionsMainDto & IFilterBase<{role_id: number, permission_id: number}>>,
  ): void {
    findOpts.relations = ['roles', 'permissions'];
  }

  //   public mapObjectToResponse(answer: any) {
  //       return this.classMapper.map(answer, Role_PermissionsMainDto, Role_PermissionsResponseDto);
  //     }

  //     public mapArrayToResponse(answer: any) {
  //       return this.classMapper.mapArray(answer,Role_PermissionsMainDto,Role_PermissionsResponseDto);
  //     }
}
