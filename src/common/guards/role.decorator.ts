// role.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { StaffRole } from 'src/modules/staff/entities/staff.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: StaffRole[]) => SetMetadata(ROLES_KEY, roles);
