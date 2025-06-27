import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/Role Request Dtos/update-role.dto';
import { RoleRequestDto } from './dto/Role Request Dtos/create-role.dto';
import { RolesRepository } from './repositories/roles.repository';
import { Role_PermissionsRepository } from './repositories/role-permissions.repository';


@Injectable()
export class RolesService {
  constructor(private readonly rolesRepo: RolesRepository, private readonly role_PermissionsRepo:Role_PermissionsRepository){}
  create(createRoleDto: RoleRequestDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  async findOne(id: number) {
    return await this.rolesRepo.getAsync(id)
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async getRoles_PermissionByRoleId(id: number){
    return await this.role_PermissionsRepo.allAsync({role_id:id})
  }
}
