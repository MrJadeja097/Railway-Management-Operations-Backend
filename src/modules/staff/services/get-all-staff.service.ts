import { HttpStatus, Injectable } from '@nestjs/common';
import {
  RpcBaseException,
  RpcInternalServerErrorException,
} from 'src/common/exceptions';
import { StaffRepository } from '../repository/staff.repository';
import { StaffResponseDto } from '../dto/Staff Response Dtos/staff-response.dto';

@Injectable()
export class GetAllStaffService {
    constructor(private readonly staffRepository: StaffRepository) {}
  

  async findAll() : Promise<StaffResponseDto[]>  {
    try {
      const response = await this.staffRepository.allAsync();
      if (!response) {
        throw new RpcBaseException('No staff member found.',HttpStatus.NOT_FOUND);
      }
      return this.staffRepository.mapArrayToResponse(response);
    } catch (error) {
      throw new RpcInternalServerErrorException();
    }
  }
}
