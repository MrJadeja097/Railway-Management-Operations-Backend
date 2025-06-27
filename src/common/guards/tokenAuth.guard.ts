import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY, Permissions } from './role.decorator';
import { Reflector } from '@nestjs/core';
import { JwtPayloadDto } from '../auth/Dto/jwt-token.dto';
import { decode } from 'punycode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest();

    let decoded: JwtPayloadDto;

    const token = request.headers['authorization'].split(' ')[1];
    try {
      decoded = await this.jwtService.verify(token);
    } catch {
      return false;
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (decoded.permissions.length === 0) {
      return false;
    }

    if (decoded.permissions.includes(requiredRoles[0])) {
      return true;
    }

    return false;
  }
}
