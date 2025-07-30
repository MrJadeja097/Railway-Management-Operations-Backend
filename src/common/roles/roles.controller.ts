import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleRequestDto } from './dto/Role Request Dtos/create-role.dto';
import { AuthGuard } from '../guards/tokenAuth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from '../guards/role.decorator';
import { AddPermissionDto } from './dto/Role Request Dtos/add-permission-to-role.dto';
import { RemovePermissionDto } from './dto/Role Request Dtos/remove-permission-to-role.dto';

@Controller('roles')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Permissions('create_role')
  @Post('create_role')
  async create(@Body() createRoleDto: RoleRequestDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Permissions('read_permissions/roles')
  @Get('all')
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Permissions('read_permissions/roles')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(+id);
  }

  @Permissions('read_permissions/roles')
  @Get('findRoleByName/:role_name')
  async findByName(@Param('role_name') role_name: string) {
    return await this.rolesService.findRoleByName(role_name);
  }

  @Permissions('add_permission')
  @Post('add_permission')
  async addPermissionToRole(@Body() addPermissionDto: AddPermissionDto){
    return await this.rolesService.addPermissionToRole(addPermissionDto);
  }
  
  @Permissions('remove_permission')
  @Post('remove_permission')
  async RemovePermissionFromRole(@Body() removePermissionDto:RemovePermissionDto){
    return await this.rolesService.removePermissionToRole(removePermissionDto);
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return await this.rolesService.update(+id, updateRoleDto);
  // }

  @Permissions('delete_role')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  @Permissions('read_permissions/roles')
  @Get('seePermissionsOfRole/:roleId')
  async seePermissionsAllwoes(@Param('roleId') roleId:number){
    return await this.rolesService.seePermissionsOfRole(roleId)
  }
}
