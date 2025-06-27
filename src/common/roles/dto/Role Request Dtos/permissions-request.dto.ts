import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PermissionsRequestDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty()
  public description: string;
}