import { AutoMap } from '@automapper/classes';
import { TrainStatus } from '../../entities/train.entity';
import { ActiveRouteMainDto } from 'src/modules/active-routes/dto/Routes Main Dtos/active-routes-main.dto';

export class TrainMainDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;

  @AutoMap()
  public status: TrainStatus;

  @AutoMap()
  public total_coaches: number;

  @AutoMap()
  public top_speed: number;

  @AutoMap()
  public activeRoute = ActiveRouteMainDto;

  @AutoMap()
 public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
