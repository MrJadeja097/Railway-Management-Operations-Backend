import { AutoMap } from '@automapper/classes';
import { RailLineMainDto } from 'src/modules/rail-lines/dto/Rail-Lines Main Dto/rail-line-main.dto';

export class StationResponseDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public latitude: number;

  @AutoMap()
  public longitude: number;

  @AutoMap()
  public railLine: RailLineMainDto;

  @AutoMap()
  public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
