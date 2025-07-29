import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStaffDto {
  @AutoMap()
  @ApiProperty({ example: 'Jayrajsinh' })
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @AutoMap()
  @ApiProperty({ example: 'Jadeja' })
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @AutoMap()
  @ApiProperty({ example: '9704414441' })
  @IsString()
  @IsNotEmpty()
  public mobileNumber: string;

  @AutoMap()
  @ApiProperty({ example: 'jayrajsinh@gmail.com' })
  @IsString()
  @IsNotEmpty()
  public email: string;

  @AutoMap()
  @ApiProperty({ example: 'Digvijay Nagar' })
  @IsString()
  @IsNotEmpty()
  public Address: string;

  @AutoMap()
  @ApiProperty({ example: 'Wankaner' })
  @IsString()
  @IsNotEmpty()
  public city: string;

  @AutoMap()
  @ApiProperty({ example: '1234567@Qa' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
