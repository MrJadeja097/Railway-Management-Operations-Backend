import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { StaffModule } from 'src/modules/staff/staff.module';
import * as dotenv from 'dotenv';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
dotenv.config({ path: '.././.env' });

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    StaffModule,
    RolesModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
