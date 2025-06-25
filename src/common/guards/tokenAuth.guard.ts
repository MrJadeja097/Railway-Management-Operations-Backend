import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { StaffRole } from 'src/modules/staff/entities/staff.entity';
import { ROLES_KEY } from './role.decorator';
import { Reflector } from '@nestjs/core';
import { JwtPayloadDto } from '../auth/Dto/jwt-token.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<StaffRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();

    let decoded: JwtPayloadDto;

    const token = request.headers['authorization'].split(' ')[1];
    try {
      decoded = this.jwtService.verify(token);
    } catch {
      return false;
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.includes(decoded.role)) {
      return true;
    }

    return false;
  }
}
