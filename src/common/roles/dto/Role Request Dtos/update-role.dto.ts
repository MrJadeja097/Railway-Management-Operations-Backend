import { PartialType } from '@nestjs/swagger';
import { RoleRequestDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(RoleRequestDto) {}
