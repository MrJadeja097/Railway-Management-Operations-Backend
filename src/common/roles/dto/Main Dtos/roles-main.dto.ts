import { AutoMap } from '@automapper/classes';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';
import { Role_PermissionsEntity } from '../../entities/role-permissions.entity';
import { StaffMainDto } from 'src/modules/staff/dto/Staff Main Dtos/staff-main.dto';

export class RoleMainDto {
  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;

  @AutoMap()
  public role_permissions: Role_PermissionsEntity[];

  @AutoMap()
  public staff: StaffMainDto[];

  @AutoMap()
  public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}