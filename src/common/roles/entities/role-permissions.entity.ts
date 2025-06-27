import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesEntity } from './role.entity';
import { PermissionsEntity } from './permissions.entity';

@Entity('role_permissions')
export class Role_PermissionsEntity {

  @AutoMap()
  @PrimaryColumn()
  role_id: number;

  @AutoMap()
  @PrimaryColumn()
  permission_id: number;

  @AutoMap()
  @ManyToOne(() => RolesEntity, (roles) => roles.role_permissions)
  @JoinColumn({ name: 'role_id' })
  roles: RolesEntity;

  @AutoMap()
  @ManyToOne(() => PermissionsEntity, (permissions) => permissions.role_permissions)
  @JoinColumn({ name: 'permission_id' })
  permissions: PermissionsEntity;

  @AutoMap()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt!: Date;

  @AutoMap()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public updatedAt!: Date;

  @AutoMap()
  @DeleteDateColumn({ type: 'timestamptz' })
  public deletedAt!: Date;
}
