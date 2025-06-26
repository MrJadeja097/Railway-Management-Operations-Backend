import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../repositories/roles.repository';
import { PermissionsRepository } from '../repositories/permissions.repository';
import { Role_PermissionsRequestDto } from '../dto/Role Request Dtos/role_permissions-requesr.dto';
import { Role_PermissionsMainDto } from '../dto/Main Dtos/role_permissions-main.dto';
import { Role_PermissionsRepository } from '../repositories/role-permissions.repository';
import { PermissionsMainDto } from '../dto/Main Dtos/permissions-main.dto';

@Injectable()
export class Role_PermissionsSeedService {
  constructor(
    private readonly role_permissionsRepo: Role_PermissionsRepository,
    private readonly permissionsRepo: PermissionsRepository,
    private readonly rolesRepo: RolesRepository,
  ) {}

  async seedRole_Permissions() {
    const public_permissions = [
      'read_station',
      'read_activeroute',
      'read_train',
    ];

    const driver_backguard_permissions = [
      'read_station',
      'read_railLine',
      'read_activeroute',
      'read_train',
    ];

    const admin_permissions : PermissionsMainDto[]= await this.permissionsRepo.allAsync({});

    const public_role = await this.rolesRepo.allAsync({name:'Public'})
    const public_role_id = public_role[0].id;

    const driver_role = await this.rolesRepo.allAsync({name:'Driver'})
    const driver_role_id = driver_role[0].id;

    const backGuard_role = await this.rolesRepo.allAsync({name:'Back Guard'})
    const backGuard_role_id = backGuard_role[0].id;

    const admin_role = await this.rolesRepo.allAsync({name:'Super Admin'})
    const admin_role_id = admin_role[0].id;


    for(let i = 0; i < public_permissions.length; i++){
      const permission = await this.permissionsRepo.allAsync({name: `${public_permissions[i]}`})
      const permission_id = permission[0].id;
      const role_PermissionsEntry = new Role_PermissionsRequestDto()
      role_PermissionsEntry.role_id = public_role_id;
      role_PermissionsEntry.permission_id = permission_id;

      const created = await this.role_permissionsRepo.createAsync(role_PermissionsEntry as unknown as Role_PermissionsMainDto)
      console.log(`${created} is created for public role.`);
      
    }

    for(let i = 0; i < driver_backguard_permissions.length; i++){
      const permission = await this.permissionsRepo.allAsync({name: `${driver_backguard_permissions[i]}`})
      const permission_id = permission[0].id;
      const role_PermissionsEntry = new Role_PermissionsRequestDto()
      role_PermissionsEntry.role_id = driver_role_id;
      role_PermissionsEntry.permission_id = permission_id;

      const created = await this.role_permissionsRepo.createAsync(role_PermissionsEntry as unknown as Role_PermissionsMainDto)
      console.log(`${created} is created for Driver role.`);
    }

     for(let i = 0; i < driver_backguard_permissions.length; i++){
      const permission = await this.permissionsRepo.allAsync({name: `${driver_backguard_permissions[i]}`})
      const permission_id = permission[0].id;
      const role_PermissionsEntry = new Role_PermissionsRequestDto()
      role_PermissionsEntry.role_id = backGuard_role_id;
      role_PermissionsEntry.permission_id = permission_id;

      const created = await this.role_permissionsRepo.createAsync(role_PermissionsEntry as unknown as Role_PermissionsMainDto)
      console.log(`${created} is created for Back Ground role.`);
    }

    for(let i = 0; i < admin_permissions.length; i++){
      const role_PermissionsEntry = new Role_PermissionsRequestDto()
      role_PermissionsEntry.role_id = admin_role_id;
      role_PermissionsEntry.permission_id = admin_permissions[i].id;

      const created = await this.role_permissionsRepo.createAsync(role_PermissionsEntry as unknown as Role_PermissionsMainDto)
      console.log(`${created} is created for Admin role.`);
    }

    console.log(`All Role_Permissions data seeded successfully.`);
  }
}