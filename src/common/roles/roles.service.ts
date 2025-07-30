import { Injectable } from "@nestjs/common";
import { RoleRequestDto } from "./dto/Role Request Dtos/create-role.dto";
import { RolesRepository } from "./repositories/roles.repository";
import { Role_PermissionsRepository } from "./repositories/role-permissions.repository";
import { RPCBadRequestException } from "../exceptions/badReuest.exception";
import { RoleMainDto } from "./dto/Main Dtos/roles-main.dto";
import { PermissionsRepository } from "./repositories/permissions.repository";
import { Role_PermissionsRequestDto } from "./dto/Role Request Dtos/role_permissions-requesr.dto";
import { Role_PermissionsMainDto } from "./dto/Main Dtos/role_permissions-main.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { AddPermissionDto } from "./dto/Role Request Dtos/add-permission-to-role.dto";
import { RemovePermissionDto } from "./dto/Role Request Dtos/remove-permission-to-role.dto";
import { RPCNotFoundException } from "../exceptions";

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepo: RolesRepository,
    private readonly role_PermissionsRepo: Role_PermissionsRepository,
    private readonly permissionsRepo: PermissionsRepository,
    @InjectMapper() private readonly mapper:Mapper
  ) {}
  async create(createRoleDto: RoleRequestDto) {
    const check_role = await this.findRoleByName(createRoleDto.name);
    if (check_role) {
      throw new RPCBadRequestException(
        `Role named ${check_role.name} already exists.`
      );
    }
    const mappedDto = this.mapper.map(createRoleDto, RoleRequestDto, RoleMainDto)
    return this.rolesRepo.createAsync(mappedDto);
  }

  async findAll() {
    return this.rolesRepo.allAsync({});
  }

  async findOne(id: number) {
    return await this.rolesRepo.getAsync(id);
  }

  async findRoleByName(name: string) {
    const role = await this.rolesRepo.allAsync({ name: name });
    return role[0];
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  async remove(id: number) {
    try{
      return await this.rolesRepo.deleteAsync(id);
    } catch(error) {   
      if (
        error.error.table === 'staff_entity' &&
        error.error.constraint === 'FK_ea12604cdbecf98dbab458ec5a5'
      ) {
        throw new RPCBadRequestException('This Role is still assigned to some members.');
      } else {
        throw new RPCBadRequestException('Unknown error captured.');
      }
    }
  }

  async getRoles_PermissionByRoleId(id: number) {
    return await this.role_PermissionsRepo.allAsync({ role_id: id });
  }

  async findPermissionByname(permission: string) {
    const permissions = await this.permissionsRepo.allAsync({
      name: permission,
    });
    if (permissions.length===0) {
      throw new RPCNotFoundException(`No Permission found as ${permission}`)
    } else {
      return permissions[0];
    }
  }

  async addPermissionToRole(addPermissionDto: AddPermissionDto) {
    const get_permission = await this.findPermissionByname(addPermissionDto.permissionName);
    let create_role_permisson = new Role_PermissionsRequestDto();
    create_role_permisson.role_id = addPermissionDto.roleId;
    create_role_permisson.permission_id = get_permission.id;
    const created = await this.role_PermissionsRepo.createAsync({...create_role_permisson, deletedAt: null} as unknown as Role_PermissionsMainDto);
    return created;
  }

  async seePermissionsOfRole(roleId: number) {
    return await this.role_PermissionsRepo.allAsync({ role_id: roleId });
  }

  async removePermissionToRole(removePermissionDto:RemovePermissionDto) {
    const get_permission = await this.findPermissionByname(removePermissionDto.permissionName);

    const delete_id = await this.role_PermissionsRepo.allAsync({
      role_id: removePermissionDto.roleId,
      permission_id: get_permission.id,
    });

    if (delete_id.length === 0) {
      throw new RPCBadRequestException(`Permission: ${removePermissionDto.permissionName} is not given to this Role.`)
    }

    const deleted = await this.role_PermissionsRepo.deleteAsync({
      role_id: delete_id[0].role_id,
      permission_id: delete_id[0].permission_id,
    });
    return deleted
      ? {
          success: true,
          msg: `${get_permission.name} removed from this Role.`,
        }
      : {
          success: false,
          msg: `${get_permission.name} not removed from this Role.`,
        };
  }
}
