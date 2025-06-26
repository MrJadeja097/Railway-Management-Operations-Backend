import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthLoginDto } from './Dto/auth-login-request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in for staff members.' })
  async login(@Body() loginBody: AuthLoginDto) {
    return this.authService.login(loginBody);
  }
}
