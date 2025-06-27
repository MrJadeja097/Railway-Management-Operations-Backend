import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleRequestDto } from './dto/Role Request Dtos/create-role.dto';
import { UpdateRoleDto } from './dto/Role Request Dtos/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create_role')
  async create(@Body() createRoleDto: RoleRequestDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get('all')
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(+id);
  }

  @Get('findRoleByName/:role_name')
  async findByName(@Param('role_name') role_name: string) {
    return await this.rolesService.findRoleByName(role_name);
  }

  @Get('add_permission/:Role/:Permission')
  async addPermissionToRole(@Param('Role') Role: string, @Param('Permission') Permission: string){
    return await this.rolesService.addPermissionToRole(Role, Permission);
  }

  @Get('remove_permission/:Role/:Permission')
  async RemovePermissionFromRole(@Param('Role') Role: string, @Param('Permission') Permission: string){
    return await this.rolesService.removePermissionToRole(Role, Permission);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return await this.rolesService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(+id);
  // }

  @Get('seePermissionsOfRole/:roleId')
  async seePermissionsAllwoes(@Param('roleId') roleId:number){
    return await this.rolesService.seePermissionsOfRole(roleId)
  }
}
