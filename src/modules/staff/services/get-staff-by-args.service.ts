import { Injectable } from '@nestjs/common';
import {
  ArgumentNilException,
  RpcInternalServerErrorException,
  RPCNotFoundException,
} from 'src/common/exceptions';
import { StaffRepository } from '../repository/staff.repository';
import { StaffMainDto } from '../dto/Staff Main Dtos/staff-main.dto';
import { StaffRequestArgsDto } from '../dto/Staff Request Dtos/staff-args-request.dto';
import { StaffResponseDto } from '../dto/Staff Response Dtos/staff-response.dto';

@Injectable()
export class GetStaffByArgsService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async findbyId(id: number): Promise<StaffResponseDto> {
    try {
      const response = await this.staffRepository.getAsync(id);

      if (!response) {
        throw new RPCNotFoundException('No staff member found.');
      }
      return this.staffRepository.mapObjectToResponse(response);
    } catch (error) {
      throw new RpcInternalServerErrorException();
    }
  }

  async findByArgs(staffColumns: Partial<StaffRequestArgsDto>) : Promise<StaffResponseDto[]>  {
    if (!staffColumns)
      throw new ArgumentNilException(
        'Not found any of following staff column arguments',
      );

    const response = await this.staffRepository.allAsync( staffColumns as unknown as StaffMainDto);

    if (response.length == 0) {
      throw new RPCNotFoundException('No staff member found.');
    }
    return this.staffRepository.mapArrayToResponse(response);
  }
}
