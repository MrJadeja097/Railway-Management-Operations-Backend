import { Injectable } from "@nestjs/common";
import { UpdateRoleDto } from "./dto/Role Request Dtos/update-role.dto";
import { RoleRequestDto } from "./dto/Role Request Dtos/create-role.dto";
import { RolesRepository } from "./repositories/roles.repository";
import { Role_PermissionsRepository } from "./repositories/role-permissions.repository";
import { RPCBadRequestException } from "../exceptions/badReuest.exception";
import { RoleMainDto } from "./dto/Main Dtos/roles-main.dto";
import { PermissionsRepository } from "./repositories/permissions.repository";
import { Role_PermissionsRequestDto } from "./dto/Role Request Dtos/role_permissions-requesr.dto";
import { Role_PermissionsMainDto } from "./dto/Main Dtos/role_permissions-main.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepo: RolesRepository,
    private readonly role_PermissionsRepo: Role_PermissionsRepository,
    private readonly permissionsRepo: PermissionsRepository
  ) {}
  async create(createRoleDto: RoleRequestDto) {
    const check_role = await this.findRoleByName(createRoleDto.name);
    if (check_role) {
      throw new RPCBadRequestException(
        `Role named ${check_role.name} already exists.`
      );
    }
    return this.rolesRepo.createAsync(createRoleDto as unknown as RoleMainDto);
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

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }

  async getRoles_PermissionByRoleId(id: number) {
    return await this.role_PermissionsRepo.allAsync({ role_id: id });
  }

  async findPermissionByname(permission: string) {
    const permissions = await this.permissionsRepo.allAsync({
      name: permission,
    });
    return permissions[0];
  }

  async addPermissionToRole(role: string, permission: string) {
    const get_role = await this.findRoleByName(role);
    const get_permission = await this.findPermissionByname(permission);
    let create_role_permisson = new Role_PermissionsRequestDto();
    create_role_permisson.role_id = get_role;
    create_role_permisson.permission_id = get_permission;
    

    const created = await this.role_PermissionsRepo.createAsync(
      {...create_role_permisson, deletedAt: null} as unknown as Role_PermissionsMainDto
    );
    return created;
  }

  async seePermissionsOfRole(roleId: number) {
    return await this.role_PermissionsRepo.allAsync({ role_id: roleId });
  }

  async removePermissionToRole(role: string, permission: string) {
    const get_role = await this.findRoleByName(role);
    const get_permission = await this.findPermissionByname(permission);

    const delete_id = await this.role_PermissionsRepo.allAsync({
      role_id: get_role.id,
      permission_id: get_permission.id,
    });

    if (delete_id.length === 0) {
      throw new RPCBadRequestException(`Permission: ${permission} is not given to Role: ${role}.`)
    }

    const deleted = await this.role_PermissionsRepo.deleteAsync({
      role_id: delete_id[0].role_id,
      permission_id: delete_id[0].permission_id,
    });
    return deleted
      ? {
          success: true,
          msg: `${get_permission.name} removed from ${get_role.name}.`,
        }
      : {
          success: false,
          msg: `${get_permission.name} not removed from ${get_role.name}.`,
        };
  }
}
