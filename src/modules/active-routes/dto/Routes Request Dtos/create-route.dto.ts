import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { RailLineMainDto } from 'src/modules/rail-lines/dto/Rail-Lines Main Dto/rail-line-main.dto';
import { RailLineResponseDto } from 'src/modules/rail-lines/dto/Rail-Lines Response Dtos/railLine-response.dto';
import { StaffMainDto } from 'src/modules/staff/dto/Staff Main Dtos/staff-main.dto';
import { StaffResponseDto } from 'src/modules/staff/dto/Staff Response Dtos/staff-response.dto';
import { StationResponseDto } from 'src/modules/stations/dto/Station Response Dtos/station-response.dto';
import { StationMainDto } from 'src/modules/stations/dto/Stations Main Dtos/station-main.dto';
import { TrainMainDto } from 'src/modules/trains/dto/Train Main Dtos/train-main.dto';
import { TrainResponseDto } from 'src/modules/trains/dto/Train Response Dtos/train-response.dto';

export class CreateRouteDto {
  @AutoMap()
  @ApiProperty({ example: 'Gujarat-SF Route' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public startStation: number | StationResponseDto;

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public endStation: number | StationResponseDto;

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public total_length: number; // IN KM

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public total_time: number; // In Minutes

  @AutoMap()
  @ApiProperty({ example: [1, 2, 3], type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  public stations_included: number[];

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public driver: number | StaffResponseDto;

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public back_guard: number | StaffResponseDto;

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public trainId: number | TrainResponseDto;

  @AutoMap()
  @ApiProperty({ example: 3 })
  @IsInt()
  public railLineId: number | RailLineResponseDto;
}
