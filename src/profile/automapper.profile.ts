import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PermissionsMainDto } from 'src/common/roles/dto/Main Dtos/permissions-main.dto';
import { Role_PermissionsMainDto } from 'src/common/roles/dto/Main Dtos/role_permissions-main.dto';
import { RoleMainDto } from 'src/common/roles/dto/Main Dtos/roles-main.dto';
import { RoleRequestDto } from 'src/common/roles/dto/Role Request Dtos/create-role.dto';
import { PermissionsEntity } from 'src/common/roles/entities/permissions.entity';
import { Role_PermissionsEntity } from 'src/common/roles/entities/role-permissions.entity';
import { RolesEntity } from 'src/common/roles/entities/role.entity';
import { ActiveRouteMainDto } from 'src/modules/active-routes/dto/Routes Main Dtos/active-routes-main.dto';
import { ActiveRouteResponseDto } from 'src/modules/active-routes/dto/Routes Response Dtos/routes-response.dto';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { RailLineMainDto } from 'src/modules/rail-lines/dto/Rail-Lines Main Dto/rail-line-main.dto';
import { RailLineResponseDto } from 'src/modules/rail-lines/dto/Rail-Lines Response Dtos/railLine-response.dto';
import { RailLineEntity } from 'src/modules/rail-lines/entities/rail-line.entity';
import { StaffMainDto } from 'src/modules/staff/dto/Staff Main Dtos/staff-main.dto';
import { CreateStaffDto } from 'src/modules/staff/dto/Staff Request Dtos/create-staff.dto';
import { StaffResponseDto } from 'src/modules/staff/dto/Staff Response Dtos/staff-response.dto';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';
import { CreateStationDto } from 'src/modules/stations/dto/Station Request Dtos/create-station.dto';
import { StationResponseDto } from 'src/modules/stations/dto/Station Response Dtos/station-response.dto';
import { StationMainDto } from 'src/modules/stations/dto/Stations Main Dtos/station-main.dto';
import { StationEntity } from 'src/modules/stations/entities/station.entity';
import { TrainMainDto } from 'src/modules/trains/dto/Train Main Dtos/train-main.dto';
import { CreateTrainDto } from 'src/modules/trains/dto/Train Request Dtos/create-train.dto';
import { TrainResponseDto } from 'src/modules/trains/dto/Train Response Dtos/train-response.dto';
import { TrainEntity } from 'src/modules/trains/entities/train.entity';

Injectable();
export class AutoMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      // For Responses
      createMap(mapper, StaffEntity, StaffMainDto);
      createMap(
        mapper,
        StationEntity,
        StationMainDto,
        forMember(
          (destination) => destination.railLine,
          mapFrom((source) => source.railLine),
        ),
      );
      createMap(mapper, RailLineEntity, RailLineMainDto);
      createMap(
        mapper,
        ActiveRouteEntity,
        ActiveRouteMainDto,
        forMember(
          (dest) => dest.driver,
          mapFrom((src) => src.driver),
        ),
        forMember(
          (dest) => dest.back_guard,
          mapFrom((src) => src.back_guard),
        ),
        forMember((dest) => dest.trainId, mapFrom((src) => src.trainId)),
        forMember(dest => dest.stations_included, mapFrom(src => src.stations_included))
      );
      createMap(mapper, TrainEntity, TrainMainDto);

      createMap(mapper, TrainMainDto, TrainResponseDto);
      createMap(
        mapper,
        StationMainDto,
        StationResponseDto,
        forMember(
          (dest) => dest.railLine,
          mapFrom((src) => src.railLine),
        ),
      );
      createMap(mapper, RailLineMainDto, RailLineResponseDto);
      createMap(mapper, ActiveRouteMainDto, ActiveRouteResponseDto, forMember(dest => dest.stations_included, mapFrom(src => src.stations_included)));
      createMap(mapper, StaffMainDto, StaffResponseDto);
      createMap(mapper, PermissionsEntity, PermissionsMainDto);
      createMap(mapper, RolesEntity, RoleMainDto);
      createMap(mapper, Role_PermissionsEntity, Role_PermissionsMainDto);

      createMap(mapper, RoleRequestDto, RoleMainDto)
      createMap(mapper, CreateStaffDto, StaffMainDto)
      createMap(mapper, CreateTrainDto, TrainMainDto)
      createMap(mapper, CreateStationDto, StationMainDto)
    };
  }
}
