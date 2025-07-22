import { AutoMap } from '@automapper/classes';
import { TrainStatus } from '../../entities/train.entity';

export class TrainResponseDto {
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
  public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
