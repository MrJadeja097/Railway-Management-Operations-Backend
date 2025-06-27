import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './Dto/auth-login-request.dto';
import { GetStaffByArgsService } from '../../modules/staff/services/get-staff-by-args.service';
import * as bcrypt from 'bcrypt';
import { StaffMainDto } from 'src/modules/staff/dto/Staff Main Dtos/staff-main.dto';
import { RPCUnauthorizedException } from '../exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly getStaffByArgsService: GetStaffByArgsService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {}

  async login(loginBody: AuthLoginDto) {
    const users = await this.getStaffByArgsService.findByArgs({
      email: loginBody.email,
    });
    const user = users[0];
    const match: boolean = await bcrypt.compare(
      loginBody.password,
      user.password,
    );

    const all_role_permissions = await this.rolesService.getRoles_PermissionByRoleId(user.role.id)

    let all_permissions = all_role_permissions.map((allRP) => {return allRP.permissions.name})

    if (match) {
      const token = await this.jwtService.signAsync({
        id: user.id,
        permissions: all_permissions,
      });
      return token;
    } else {
      throw new RPCUnauthorizedException('Wrong Credentials.');
    }
  }
}
