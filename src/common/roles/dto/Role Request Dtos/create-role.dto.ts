import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class RoleRequestDto {
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
