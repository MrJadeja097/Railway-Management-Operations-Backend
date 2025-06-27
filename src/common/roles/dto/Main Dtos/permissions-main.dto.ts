import { AutoMap } from '@automapper/classes';
import { Role_PermissionsEntity } from '../../entities/role-permissions.entity';

export class PermissionsMainDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;

  @AutoMap()
  public role_permissions: Role_PermissionsEntity[];

  @AutoMap()
  public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}