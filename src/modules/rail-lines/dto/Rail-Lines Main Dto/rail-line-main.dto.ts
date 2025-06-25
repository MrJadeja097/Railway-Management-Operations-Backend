import { AutoMap } from '@automapper/classes';
import { ActiveRouteMainDto } from 'src/modules/active-routes/dto/Routes Main Dtos/active-routes-main.dto';
import { StationMainDto } from 'src/modules/stations/dto/Stations Main Dtos/station-main.dto';

export class RailLineMainDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;

  @AutoMap()
  public startStation: StationMainDto;

  @AutoMap()
  public endStation: StationMainDto;

  @AutoMap()
  public totalLength: number;

  @AutoMap()
  public totalStations: number;

  @AutoMap()
  public isActive: boolean;

  @AutoMap()
  public activeRoutes: ActiveRouteMainDto[];

  @AutoMap()
  public station: StationMainDto;

  @AutoMap()
 public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
