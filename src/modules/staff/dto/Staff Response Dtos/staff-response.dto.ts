import { AutoMap } from '@automapper/classes';
import { StaffRole } from 'src/modules/staff/entities/staff.entity';

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
  public role: StaffRole;

  @AutoMap()
  public createdAt: Date;

  @AutoMap()
  public updatedAt: Date;
}
