import { AutoMap } from '@automapper/classes';
import { RailLineMainDto } from 'src/modules/rail-lines/dto/Rail-Lines Main Dto/rail-line-main.dto';
import { StaffMainDto } from 'src/modules/staff/dto/Staff Main Dtos/staff-main.dto';
import { StationMainDto } from 'src/modules/stations/dto/Stations Main Dtos/station-main.dto';
import { TrainMainDto } from 'src/modules/trains/dto/Train Main Dtos/train-main.dto';

export class ActiveRouteMainDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public startStation: StationMainDto;

  @AutoMap()
  public endStation: StationMainDto;

  @AutoMap()
  public total_length: number; // IN KM

  @AutoMap()
  public total_time: number; // In Minute
  @AutoMap()
  public stations_included: number[];

  @AutoMap()
  public driver: StaffMainDto;

  @AutoMap()
  public back_guard: StaffMainDto;

  @AutoMap()
  public trainId: TrainMainDto;

  @AutoMap()
  public railLineId: RailLineMainDto;

  @AutoMap()
 public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
