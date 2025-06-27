import { AutoMap } from '@automapper/classes';
import { RolesEntity } from 'src/common/roles/entities/role.entity';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { BaseCommonEntity } from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

  @OneToOne(() => ActiveRouteEntity, (activeRoute) => activeRoute.driver)
  @AutoMap()
  public activeRouteDriver: ActiveRouteEntity;

  @OneToOne(() => ActiveRouteEntity, (activeRoute) => activeRoute.back_guard)
  @AutoMap()
  public activeRouteBackGuard: ActiveRouteEntity;
  
  @AutoMap()
  @OneToOne(() => RolesEntity, (role) => role.staff)
  @JoinColumn({name : 'role_id'})
  public role: RolesEntity;
}
