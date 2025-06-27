import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { CreateStaffService } from './services/create-staff.service';
import { GetAllStaffService } from './services/get-all-staff.service';
import { GetStaffByArgsService } from './services/get-staff-by-args.service';
import { DeleteStaffService } from './services/delete-staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './entities/staff.entity';
import { StaffRepository } from './repository/staff.repository';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { AutoMapperProfile } from 'src/profile/automapper.profile';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AssignRoleToStaffService } from './services/assign-role-to-staff.service';
import { RolesModule } from 'src/common/roles/roles.module';
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffEntity]),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }), RolesModule
  ],
  controllers: [StaffController],
  providers: [
    CreateStaffService,
    GetAllStaffService,
    GetStaffByArgsService,
    DeleteStaffService,
    AssignRoleToStaffService,
    StaffRepository,
    AutoMapperProfile,
  ],
  exports: [GetStaffByArgsService]
})
export class StaffModule {}
