import { AutoMap } from '@automapper/classes';
import { RailLineResponseDto } from 'src/modules/rail-lines/dto/Rail-Lines Response Dtos/railLine-response.dto';
import { StaffResponseDto } from 'src/modules/staff/dto/Staff Response Dtos/staff-response.dto';
import { StationResponseDto } from 'src/modules/stations/dto/Station Response Dtos/station-response.dto';
import { TrainResponseDto } from 'src/modules/trains/dto/Train Response Dtos/train-response.dto';

export class ActiveRouteResponseDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public startStation: StationResponseDto;

  @AutoMap()
  public endStation: StationResponseDto;

  @AutoMap()
  public total_length: number; // IN KM

  @AutoMap()
  public total_time: number; // In Minute

  @AutoMap()
  public stations_included: number[];

  @AutoMap()
  public driver: StaffResponseDto;

  @AutoMap()
  public back_guard: StaffResponseDto;

  @AutoMap()
  public trainId: TrainResponseDto;

  @AutoMap()
  public railLineId: RailLineResponseDto;

  @AutoMap()
 public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
