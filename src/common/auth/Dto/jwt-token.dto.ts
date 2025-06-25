import { StaffRole } from "src/modules/staff/entities/staff.entity";

export class JwtPayloadDto {
  id: number;
  role: StaffRole;
  iat?: number;
  exp?: number;
}
