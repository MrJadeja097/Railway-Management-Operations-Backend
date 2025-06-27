import { PartialType } from '@nestjs/mapped-types';
import { CreateStationDto } from './create-station.dto';
import { IsInt } from 'class-validator';

export class UpdateStationDto extends PartialType(CreateStationDto) {
    public id?: number
}
