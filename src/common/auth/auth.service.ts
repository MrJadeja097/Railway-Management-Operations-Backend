import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './Dto/auth-request.dto';
import { GetStaffByArgsService } from '../../modules/staff/services/get-staff-by-args.service';
import * as bcrypt from 'bcrypt';
import { StaffMainDto } from 'src/modules/staff/dto/Staff Main Dtos/staff-main.dto';
import { RPCUnauthorizedException } from '../exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly getStaffByArgsService: GetStaffByArgsService, private readonly jwtService: JwtService) {}

    async login(loginBody: AuthLoginDto){
        const users = await this.getStaffByArgsService.findByArgs({email: loginBody.email})
        const user  = users[0]
        const match : boolean = await bcrypt.compare(loginBody.password, user.password)

        if (match) {
            const token = await this.jwtService.signAsync({id: user.id, role: user.role})
            return token;
        } else {
            throw new RPCUnauthorizedException("Wrong Credentials.")
        }
    }
}