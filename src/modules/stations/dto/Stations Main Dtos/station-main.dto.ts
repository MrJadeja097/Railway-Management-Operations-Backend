import { AutoMap } from '@automapper/classes';
import { ActiveRouteMainDto } from 'src/modules/active-routes/dto/Routes Main Dtos/active-routes-main.dto';
import { RailLineMainDto } from 'src/modules/rail-lines/dto/Rail-Lines Main Dto/rail-line-main.dto';

export class StationMainDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public latitude: number;

  @AutoMap()
  public longitude: number;

  @AutoMap()
  public railLine: RailLineMainDto;

  @AutoMap()
  public startingRoutes: ActiveRouteMainDto[];

  @AutoMap()
  public endingRoutes: ActiveRouteMainDto[];

  @AutoMap()
  public startingRailLine: RailLineMainDto[];

  @AutoMap()
  public endingRaliLine: RailLineMainDto[];

  @AutoMap()
 public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
