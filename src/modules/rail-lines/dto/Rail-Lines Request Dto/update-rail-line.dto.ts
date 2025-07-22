import { PartialType } from '@nestjs/mapped-types';
import { CreateRailLineDto } from './create-rail-line.dto';
import { AutoMap } from '@automapper/classes';
import { IsOptional } from 'class-validator';
import { StationResponseDto } from 'src/modules/stations/dto/Station Response Dtos/station-response.dto';

export class UpdateRailLineDto extends PartialType(CreateRailLineDto) {
  @AutoMap()
  @IsOptional()
  public  startStation?: StationResponseDto | number;

  @AutoMap()
  @IsOptional()
  public  endStation?: StationResponseDto | number;
}
