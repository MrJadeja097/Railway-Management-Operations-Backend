import { Injectable } from '@nestjs/common';
import { LogExecutionTime } from 'src/utils/executionTimeLogger.util';
import { StaffRepository } from '../repository/staff.repository';
import { StaffMainDto } from '../dto/Staff Main Dtos/staff-main.dto';
import { StaffResponseDto } from '../dto/Staff Response Dtos/staff-response.dto';
import { GetStaffByArgsService } from './get-staff-by-args.service';
import { RolesService } from '../../../common/roles/roles.service';
import { AssignRoleToStaffDto } from '../dto/Staff Request Dtos/assign-role-to-staff.dto';

@Injectable()
export class AssignRoleToStaffService {
   constructor(private readonly staffRepository: StaffRepository, private readonly getStaffByArgsService:GetStaffByArgsService, private readonly rolesService:RolesService){}
    
    @LogExecutionTime()
    async  assignRole(assignRoleToStaffDto:AssignRoleToStaffDto) : Promise<StaffResponseDto> {
        const user = await this.getStaffByArgsService.findbyId(assignRoleToStaffDto.staffId)
        const getRole = await this.rolesService.findRoleByName(assignRoleToStaffDto.role)
        user.role = getRole;
        const staff = await  this.staffRepository.updateAsync(user as unknown as StaffMainDto)
        return this.staffRepository.mapObjectToResponse(staff)
    }
}
