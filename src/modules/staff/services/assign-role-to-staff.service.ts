import { Injectable } from '@nestjs/common';
import { LogExecutionTime } from 'src/utils/executionTimeLogger.util';
import { StaffRepository } from '../repository/staff.repository';
import { StaffMainDto } from '../dto/Staff Main Dtos/staff-main.dto';
import { StaffResponseDto } from '../dto/Staff Response Dtos/staff-response.dto';
import { GetStaffByArgsService } from './get-staff-by-args.service';
import { RolesService } from '../../../common/roles/roles.service';

@Injectable()
export class AssignRoleToStaffService {
   constructor(private readonly staffRepository: StaffRepository, private readonly getStaffByArgsService:GetStaffByArgsService, private readonly rolesService:RolesService){}
    
    @LogExecutionTime()
    async  assignRole(staffId: number, role: string) : Promise<StaffResponseDto> {
        const user = await this.getStaffByArgsService.findbyId(staffId)
        const getRole = await this.rolesService.findRoleByName(role)
        user.role = getRole;
        const staff = await  this.staffRepository.updateAsync(user as unknown as StaffMainDto)
        return this.staffRepository.mapObjectToResponse(staff)
    }
}
