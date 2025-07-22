// // role.decorator.ts
import { SetMetadata } from '@nestjs/common';
// import { StaffRole } from 'src/modules/staff/entities/staff.entity';

export const ROLES_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => SetMetadata(ROLES_KEY, permissions);
