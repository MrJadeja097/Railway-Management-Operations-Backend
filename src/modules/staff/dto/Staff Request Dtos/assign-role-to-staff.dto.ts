import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssignRoleToStaffDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  public staffId: number;

  @ApiProperty({ example: 'create_staff' })
  @IsString()
  @IsNotEmpty()
  public role: string;
}
