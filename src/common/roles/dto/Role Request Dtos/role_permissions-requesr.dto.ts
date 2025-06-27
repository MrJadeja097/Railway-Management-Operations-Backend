import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { RoleMainDto } from '../Main Dtos/roles-main.dto';
import { PermissionsMainDto } from '../Main Dtos/permissions-main.dto';

export class Role_PermissionsRequestDto {
  @AutoMap()
  @IsInt()
  @ApiProperty()
  role_id: number | RoleMainDto;

  @AutoMap()
  @IsInt()
  @ApiProperty()
  permission_id: number | PermissionsMainDto;
}
