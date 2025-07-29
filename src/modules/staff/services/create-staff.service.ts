import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../dto/Staff Request Dtos/create-staff.dto';
import { LogExecutionTime } from 'src/utils/executionTimeLogger.util';
import { StaffRepository } from '../repository/staff.repository';
import { StaffMainDto } from '../dto/Staff Main Dtos/staff-main.dto';
import * as bcrypt from 'bcrypt';
import { StaffResponseDto } from '../dto/Staff Response Dtos/staff-response.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class CreateStaffService {
  constructor(
    private readonly staffRepository: StaffRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @LogExecutionTime()
  async create(staffCreateDto: CreateStaffDto): Promise<StaffResponseDto> {
    if (staffCreateDto.password) {
      const saltRounds = 10;
      staffCreateDto.password = await bcrypt.hash(
        staffCreateDto.password,
        saltRounds,
      );
    }
    const mappedDto = this.mapper.map(
      staffCreateDto,
      CreateStaffDto,
      StaffMainDto,
    );
    const staff = await this.staffRepository.createAsync(mappedDto);
    return this.staffRepository.mapObjectToResponse(staff);
  }
}
