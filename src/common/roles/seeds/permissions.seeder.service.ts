import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from '../repositories/permissions.repository';
import { PermissionsRequestDto } from '../dto/Role Request Dtos/permissions-request.dto';
import { PermissionsMainDto } from '../dto/Main Dtos/permissions-main.dto';

@Injectable()
export class PermissionSeedService {
  constructor(private readonly permissionsRepo: PermissionsRepository) {}

  async seedPermissions() {
    const permissionsArr = [
      'update_staff',
      'delete_staff',
      'create_station',
      'read_station',
      'update_station',
      'delete_station',
      'create_railLine',
      'read_railLine',
      'update_railLine',
      'delete_railLine',
      'create_activeroute',
      'read_activeroute',
      'update_activeroute',
      'delete_activeroute',
      'create_train',
      'read_train',
      'update_train',
      'delete_train',
      'create_role',
      'add_permission',
      'remove_permission',
      'delete_role',
      'assign_role_to_staff',
      'read_permissions/roles'
    ];

    const permissionsDescriptions = [
      'Can update staff details',
      'Can remove staff members',
      'Can create a station',
      'Can view stations',
      'Can update station info',
      'Can delete stations',
      'Can create a rail line',
      'Can view rail lines',
      'Can update rail line data',
      'Can delete rail lines',
      'Can create active routes',
      'Can view active routes',
      'Can update active routes',
      'Can delete active routes',
      'Can create trains',
      'Can view trains',
      'Can update train info',
      'Can delete trains',
      'Can create a new Role.',
      'Can add permission to a role.',
      'Can remove permission from a role',
      'Can remove/delete a role.',
      'Can assign a role to any staff member.',
      'Can read all the permissions and roles.'
    ];

    for(let i =0; i< permissionsArr.length; i++){
      let create_permission = new PermissionsRequestDto();
      create_permission.name = permissionsArr[i];
      create_permission.description = permissionsDescriptions[i];
      const created = await this.permissionsRepo.createAsync(create_permission as unknown as PermissionsMainDto);
      console.log(`${created.name} permission seed successfully.`);
    }

    console.log(`All permission seeded successfully.`);
  }
}
