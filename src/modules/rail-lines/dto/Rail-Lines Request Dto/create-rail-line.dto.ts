import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateStationDto } from 'src/modules/stations/dto/Station Request Dtos/create-station.dto';

export class CreateRailLineDto {
      @AutoMap()
      @ApiProperty({ example: 'NorthEast2' })
      @IsString()
      @IsNotEmpty()
      public name: string;

      @AutoMap()
      @ApiProperty({ example: 'this line have mode from a to b city.' })
      @IsString()
      @IsNotEmpty()
      public description: string;

      @AutoMap()
      @ApiProperty({ example: 3 })
      public startStation: CreateStationDto | number;

      @AutoMap()
      @ApiProperty({ example: 13 })
      public endStation: CreateStationDto | number;

      @AutoMap()
      @ApiProperty({ example: 777 })
      @IsInt()
      public totalLength: number;

      @AutoMap()
      @IsInt()
      @ApiProperty({example: 10})
      public totalStations?: number;
}
