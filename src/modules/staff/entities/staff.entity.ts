import { AutoMap } from '@automapper/classes';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { BaseCommonEntity } from 'src/utils/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

export enum StaffRole {
  ADMIN = 'ADMIN',
  MANAGEMENT = 'MANAGEMENT',
  DRIVER = 'DRIVER',
  BACK_GUARD = 'BACK_GUARD',
}

@Entity()
export class StaffEntity extends BaseCommonEntity {
  @Column({ type: 'varchar' })
  @AutoMap()
  public firstName: string;

  @Column({ type: 'varchar' })
  @AutoMap()
  public lastName: string;

  @Column({ type: 'varchar' })
  @AutoMap()
  public mobileNumber: string;

  @Column({ type: 'varchar' , unique: true })
  @AutoMap()
  public email: string;

  @Column({ type: 'text', nullable: true })
  @AutoMap()
  public Address: string;

  @Column({ type: 'varchar' })
  @AutoMap()
  public city: string;

  @Column({ type: 'varchar' })
  @AutoMap()
  public password: string;

  @Column({ type: 'enum', enum: StaffRole })
  @AutoMap()
  public role: StaffRole;

  @OneToOne(() => ActiveRouteEntity, (activeRoute) => activeRoute.driver)
  @AutoMap()
  public activeRouteDriver: ActiveRouteEntity;

  @OneToOne(() => ActiveRouteEntity, (activeRoute) => activeRoute.back_guard)
  @AutoMap()
  public activeRouteBackGuard: ActiveRouteEntity;
}
