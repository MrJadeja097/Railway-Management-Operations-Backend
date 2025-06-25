import { AutoMap } from "@automapper/classes";
import { StationResponseDto } from "src/modules/stations/dto/Station Response Dtos/station-response.dto";

export class RailLineResponseDto{
      @AutoMap()
      public name: string;
    
      @AutoMap()
      public description: string;
    
      @AutoMap()
      public startStation: StationResponseDto;
    
      @AutoMap()
      public endStation: StationResponseDto;
    
      @AutoMap()
      public totalLength: number;
    
      @AutoMap()
      public totalStations: number;
    
      @AutoMap()
      public isActive: boolean;
        
      @AutoMap()
     public id: number;
    
      @AutoMap()
      public createdAt: Date;
    
      @AutoMap()
      public updatedAt: Date;
    
      @AutoMap()
      public deletedAt: Date;
}