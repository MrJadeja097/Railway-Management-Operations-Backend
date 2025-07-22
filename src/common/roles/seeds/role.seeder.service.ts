import { Injectable } from '@nestjs/common';
import { RoleRequestDto } from '../dto/Role Request Dtos/create-role.dto';
import { RoleMainDto } from '../dto/Main Dtos/roles-main.dto';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable()
export class RolesSeedService {
  constructor(private readonly rolesRepo: RolesRepository) {}

  async seedRoles() {
    const roleArr = ['Super Admin', 'Public', 'Driver', 'Back Guard'];

    const roleDescriptions = [
      'Has full access to all resources and administrative actions',
      'Can view public data but cannot perform actions',
      'Can view public data but cannot perform actions',
      'Can view public data but cannot perform actions',
    ];

    for(let i = 0; i< roleArr.length; i++){
        let newRole = new RoleRequestDto()
        newRole.name = roleArr[i]
        newRole.description = roleDescriptions[i]
        const created = await this.rolesRepo.createAsync(newRole as unknown as RoleMainDto)
        console.log(`${created.name} Role Added.`);
        
    }

    console.log(`All Roles seeded successfully.`);
  }
}
