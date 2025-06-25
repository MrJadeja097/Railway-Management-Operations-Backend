import { AutoMap } from '@automapper/classes';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { BaseCommonEntity } from 'src/utils/base.entity';
import { Column, OneToMany, OneToOne, JoinColumn, Entity } from 'typeorm';

export enum TrainStatus {
  ACTIVE = 'ACTIVE',
  GROUNDED = 'GROUNDED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  ON_ACTIVEROUTE = 'ON_ACTIVEROUTE',
}

@Entity()
export class TrainEntity extends BaseCommonEntity {
  @Column({ type: 'varchar', length: 30 })
  @AutoMap()
  public name: string;

  @Column({ type: 'text', nullable: true })
  @AutoMap()
  public description: string;

  @Column({ type: 'enum', enum: TrainStatus, default: TrainStatus.ACTIVE })
  @AutoMap()
  public status: TrainStatus;

  @Column({ type: 'int', unsigned: true })
  @AutoMap()
  public total_coaches: number;

  @Column({ type: 'int', unsigned: true })
  @AutoMap()
  public top_speed: number;

  @OneToOne(() => ActiveRouteEntity, (activeRoute) => activeRoute.trainId)
  @AutoMap()
  public activeRoute : ActiveRouteEntity;
}
