import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class Role_PermissionsRequestDto {
  @AutoMap()
  @IsInt()
  @ApiProperty()
  role_id: number;

  @AutoMap()
  @IsInt()
  @ApiProperty()
  permission_id: number;
}
