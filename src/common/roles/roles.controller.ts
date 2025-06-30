import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleRequestDto } from './dto/Role Request Dtos/create-role.dto';
import { AuthGuard } from '../guards/tokenAuth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from '../guards/role.decorator';

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

  @Permissions('add_permission')
  @Get('add_permission/:Role/:Permission')
  async addPermissionToRole(@Param('Role') Role: string, @Param('Permission') Permission: string){
    return await this.rolesService.addPermissionToRole(Role, Permission);
  }

  @Permissions('remove_permission')
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
