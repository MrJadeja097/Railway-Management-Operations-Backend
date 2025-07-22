import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RailLineResponseDto } from 'src/modules/rail-lines/dto/Rail-Lines Response Dtos/railLine-response.dto';

export class CreateStationDto {
  @ApiProperty({ example: 'Ahmedabad' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 35.20124678 })
  @IsNumber()
  public latitude: number;

  @ApiProperty({ example: 53.56123407 })
  @IsNumber()
  public longitude: number;

  @ApiProperty({ example: 3 })
  // @IsNumber()
  public railLine: RailLineResponseDto | number;
}
