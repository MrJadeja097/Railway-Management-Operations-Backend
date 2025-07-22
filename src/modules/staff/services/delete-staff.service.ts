import { Injectable } from '@nestjs/common';
import { StaffRepository } from '../repository/staff.repository';
import { RpcInternalServerErrorException, RPCNotFoundException } from 'src/common/exceptions';

@Injectable()
export class DeleteStaffService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async delete(id: number) : Promise<boolean>  {
    try {
      const response = await this.staffRepository.allAsync({ id: id });
      if (!response) {
        throw new RPCNotFoundException(`No staff member found on id ${id}.`);
      }
      return this.staffRepository.deleteAsync(id);
    } catch (error) {
      throw new RpcInternalServerErrorException();
    }
  }
}