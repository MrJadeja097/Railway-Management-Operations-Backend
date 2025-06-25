import { AutoMap } from '@automapper/classes';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { StationEntity } from 'src/modules/stations/entities/station.entity';
import { BaseCommonEntity } from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'raillines' })
export class RailLineEntity extends BaseCommonEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
    @AutoMap()
  public name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @AutoMap()
  public description: string;

  @ManyToOne(() => StationEntity, (stationEntity) => stationEntity.id)
  @JoinColumn({
    name: 'start_station_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public startStation: StationEntity;

  @ManyToOne(() => StationEntity, (stationEntity) => stationEntity.id)
  @JoinColumn({
    name: 'end_station_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public endStation: StationEntity;

  @Column({type: 'float'})
  @AutoMap()
  public totalLength: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  @AutoMap()
  public totalStations: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  @AutoMap()
  public isActive: boolean;

  @OneToMany(()=> ActiveRouteEntity, (activeRoutes) => activeRoutes.railLineId)
  public activeRoutes: ActiveRouteEntity[]

  @OneToMany(() => StationEntity, (station) => station.railLine)
  @AutoMap()
  public station: StationEntity;
}
