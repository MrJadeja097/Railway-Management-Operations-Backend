import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ActiveRouteMainDto } from 'src/modules/active-routes/dto/Routes Main Dtos/active-routes-main.dto';
import { ActiveRouteResponseDto } from 'src/modules/active-routes/dto/Routes Response Dtos/routes-response.dto';
import { ActiveRouteEntity } from 'src/modules/active-routes/entities/activeRoute.entity';
import { RailLineMainDto } from 'src/modules/rail-lines/dto/Rail-Lines Main Dto/rail-line-main.dto';
import { RailLineResponseDto } from 'src/modules/rail-lines/dto/Rail-Lines Response Dtos/railLine-response.dto';
import { RailLineEntity } from 'src/modules/rail-lines/entities/rail-line.entity';
import { StaffMainDto } from 'src/modules/staff/dto/Staff Main Dtos/staff-main.dto';
import { StaffResponseDto } from 'src/modules/staff/dto/Staff Response Dtos/staff-response.dto';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';
import { StationResponseDto } from 'src/modules/stations/dto/Station Response Dtos/station-response.dto';
import { StationMainDto } from 'src/modules/stations/dto/Stations Main Dtos/station-main.dto';
import { StationEntity } from 'src/modules/stations/entities/station.entity';
import { TrainMainDto } from 'src/modules/trains/dto/Train Main Dtos/train-main.dto';
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
      createMap(mapper, StationEntity, StationMainDto,
        forMember(
          (destination) => destination.railLine,
          mapFrom((source) => source.railLine)
        ),);
      createMap(mapper, RailLineEntity, RailLineMainDto);
      createMap(mapper, ActiveRouteEntity, ActiveRouteMainDto, forMember((dest) => dest.driver, mapFrom((src) => src.driver)), forMember((dest) => dest.back_guard, mapFrom((src) => src.back_guard)));
      createMap(mapper, TrainEntity, TrainMainDto);

      createMap(mapper, TrainMainDto, TrainResponseDto)
      createMap(mapper, StationMainDto, StationResponseDto, forMember((dest) => dest.railLine, mapFrom((src) => src.railLine)))
      createMap(mapper, RailLineMainDto, RailLineResponseDto)
      createMap(mapper,ActiveRouteMainDto,ActiveRouteResponseDto)
      createMap(mapper,StaffMainDto,StaffResponseDto)
    };
  }
}
