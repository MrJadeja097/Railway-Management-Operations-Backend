import { AutoMap } from '@automapper/classes';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { RailLineEntity } from 'src/modules/rail-lines/entities/rail-line.entity';
import { BaseCommonEntity } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class StationEntity extends BaseCommonEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @AutoMap()
  public name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 8,
    nullable: true,
  })
  @AutoMap()
  public latitude: number;

  @Column({
    type: 'decimal',
    precision: 11,
    scale: 8,
    nullable: true,
  })
  @AutoMap()
  public longitude: number;

  @ManyToOne(() => RailLineEntity, (railLineEntity) => railLineEntity.station)
  @JoinColumn({
    name: 'rail_line_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public railLine: RailLineEntity;

  @OneToMany(() => ActiveRouteEntity, (activeRoute) => activeRoute.startStation)
  @AutoMap()
  public startingRoutes: ActiveRouteEntity[];

  @OneToMany(() => ActiveRouteEntity, (activeRoute) => activeRoute.endStation)
  @AutoMap()
  public endingRoutes: ActiveRouteEntity[];

    @OneToMany(() => RailLineEntity, (railLine) => railLine.startStation)
  @AutoMap()
  public startingRailLine: RailLineEntity[];

  @OneToMany(() => RailLineEntity, (railLine) => railLine.endStation)
  @AutoMap()
  public endingRaliLine: RailLineEntity[];
}
