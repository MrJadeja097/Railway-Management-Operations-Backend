import { AutoMap } from '@automapper/classes';
import { RoleMainDto } from 'src/common/roles/dto/Main Dtos/roles-main.dto';
import { ActiveRouteMainDto } from 'src/modules/active-routes/dto/Routes Main Dtos/active-routes-main.dto';

export class StaffMainDto {
  @AutoMap()
  public firstName: string;

  @AutoMap()
  public lastName: string;

  @AutoMap()
  public mobileNumber: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public Address: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public password: string;

  @AutoMap()
  public role: RoleMainDto;

  @AutoMap()
  public activeRouteDriver: ActiveRouteMainDto;

  @AutoMap()
  public activeRouteBackGuard: ActiveRouteMainDto;

  @AutoMap()
 public id: number;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;

  @AutoMap()
  public deletedAt: Date;
}
