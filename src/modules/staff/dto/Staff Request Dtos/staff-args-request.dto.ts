import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EOrder } from 'src/common/Base Repository/filtering';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { StaffRole } from 'src/modules/staff/entities/staff.entity';

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
  @ApiProperty({ example: 'yashrajsinh@gmail.com' })
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
  @ApiProperty({ example: StaffRole.MANAGEMENT })
  @IsString()
  @IsNotEmpty()
  public role: StaffRole;

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
