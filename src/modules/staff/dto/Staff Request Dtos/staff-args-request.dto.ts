import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EOrder } from 'src/common/Base Repository/filtering';
import { RoleMainDto } from 'src/common/roles/dto/Main Dtos/roles-main.dto';
import { RoleRequestDto } from 'src/common/roles/dto/Role Request Dtos/create-role.dto';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';

export class StaffRequestArgsDto {
  @AutoMap()
  // @ApiProperty()
  @IsInt()
  @IsOptional()
  public id: number;

  @AutoMap()
  @ApiProperty({ example: 'Yashrajsinh' })
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @AutoMap()
  @ApiProperty({ example: 'Jadeja' })
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @AutoMap()
  @ApiProperty({ example: '9510525822' })
  @IsString()
  @IsNotEmpty()
  public mobileNumber: string;

  @AutoMap()
  @ApiProperty({ example: 'admin@hotmail.com' })
  @IsString()
  @IsNotEmpty()
  public email: string;

  @AutoMap()
  @ApiProperty({ example: 'Nr. Omlareshwar temple' })
  @IsString()
  @IsNotEmpty()
  public Address: string;

  @AutoMap()
  @ApiProperty({ example: 'Wankaner' })
  @IsString()
  @IsNotEmpty()
  public city: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public role: RoleRequestDto | number;

  @AutoMap()
  // @ApiProperty()
  public activeRouteDriver: ActiveRouteEntity;

  @AutoMap()
  // @ApiProperty()
  public activeRouteBackGuard: ActiveRouteEntity;

  @AutoMap()
  // @ApiProperty()
  public createdAt: Date;

  @AutoMap()
  // @ApiProperty()
  public updatedAt: Date;

  @AutoMap()
  $ids: number[];

  @AutoMap()
  @IsString()
  $orderBy: string;

  @AutoMap()
  $order: EOrder;

  @AutoMap()
  @IsInt()
  $page: number;

  @AutoMap()
  @IsInt()
  $perPage: number;
}
