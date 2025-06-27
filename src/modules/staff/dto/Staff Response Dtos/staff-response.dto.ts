import { AutoMap } from '@automapper/classes';
import { RoleMainDto } from 'src/common/roles/dto/Main Dtos/roles-main.dto';

export class StaffResponseDto {
  @AutoMap()
  public id: number;

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
  public password: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public role: RoleMainDto;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;
}
