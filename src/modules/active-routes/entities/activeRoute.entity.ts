import { AutoMap } from '@automapper/classes';
import { RailLineEntity } from 'src/modules/rail-lines/entities/rail-line.entity';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';
import { StationEntity } from 'src/modules/stations/entities/station.entity';
import { BaseCommonEntity } from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { TrainEntity } from 'src/modules/trains/entities/train.entity';


@Entity()
export class ActiveRouteEntity extends BaseCommonEntity {
  @Column({ type: 'varchar', length: 15 })
  @AutoMap()
  public name: string;

  @ManyToOne(
    () => StationEntity,
    (stationEntity) => stationEntity.startingRoutes,
  )
  @JoinColumn({
    name: 'start_station_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public startStation: StationEntity;

  @ManyToOne(() => StationEntity, (stationEntity) => stationEntity.endingRoutes)
  @JoinColumn({
    name: 'end_station_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public endStation: StationEntity;

  @Column({ nullable: true })
  @AutoMap()
  public total_length: number; // IN KM

  @Column({ nullable: true })
  @AutoMap()
  public total_time: number; // In Minutes

  @Column({ type: 'int', array: true, nullable: true })
  @AutoMap()
  public stations_included: number[];

  @OneToOne(() => StaffEntity, (staffEntity) => staffEntity.activeRouteDriver)
  @JoinColumn({
    name: 'driver_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public driver: StaffEntity;

  @OneToOne(
    () => StaffEntity,
    (staffEntity) => staffEntity.activeRouteBackGuard,
  )
  @JoinColumn({
    name: 'back_guard_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public back_guard: StaffEntity;

  @OneToOne(() => TrainEntity, (trainEntity) => trainEntity.activeRoute)
  @JoinColumn({
    name: 'train_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public trainId: TrainEntity;

  @ManyToOne(
    () => RailLineEntity,
    (railLineEntity) => railLineEntity.activeRoutes,
  )
  @JoinColumn({
    name: 'railLine_id',
    referencedColumnName: 'id',
  })
  @AutoMap()
  public railLineId: RailLineEntity;

}
