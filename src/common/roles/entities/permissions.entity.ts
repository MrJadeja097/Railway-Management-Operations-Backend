import { AutoMap } from '@automapper/classes';
import { BaseCommonEntity } from 'src/utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Role_PermissionsEntity } from './role-permissions.entity';

@Entity('permissions')
export class PermissionsEntity extends BaseCommonEntity {
  @AutoMap()
  @Column({ type: 'varchar', unique: true })
  public name: string;

  @AutoMap()
  @Column({ type: 'varchar' , nullable: true})
  public description: string;

  @AutoMap()
  @OneToMany(() => Role_PermissionsEntity,(role_permission) => role_permission.permissions)
  public role_permissions: Role_PermissionsEntity[];
}
