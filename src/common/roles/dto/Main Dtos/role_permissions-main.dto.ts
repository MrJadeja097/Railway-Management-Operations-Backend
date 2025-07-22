import { AutoMap } from '@automapper/classes';
import { RoleMainDto } from './roles-main.dto';
import { PermissionsMainDto } from './permissions-main.dto';

export class Role_PermissionsMainDto {
  @AutoMap()
  role_id: number;

  @AutoMap()
  permission_id: number;

  @AutoMap()
  roles: RoleMainDto;

  @AutoMap()
  permissions: PermissionsMainDto;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
