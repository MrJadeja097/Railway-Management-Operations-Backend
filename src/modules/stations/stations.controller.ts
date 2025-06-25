import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateStationDto } from './dto/Station Request Dtos/create-station.dto';
import { UpdateStationDto } from './dto/Station Request Dtos/update-station.dto';
import { GetAllStationsService } from './service/get-all-stations.service';
import { GetStationByIdService } from './service/get-station-by-id.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { StationMainDto } from './dto/Stations Main Dtos/station-main.dto';
import { CreateStationService } from './service/create-station.service';
import { UpdateStationService } from './service/update-station.service';
import { DeleteStationService } from './service/delete-station.service';
import { SearchStationService } from './service/search-station.service';
import { SearchStationByRailLineService } from './service/search-station-by-rail-line.service';
import { Roles } from 'src/common/guards/role.decorator';
import { AuthGuard } from 'src/common/guards/tokenAuth.guard';
import { StaffRole } from '../staff/entities/staff.entity';
import { StationResponseDto } from './dto/Station Response Dtos/station-response.dto';

@ApiBearerAuth('access-token')
@Controller('stations')
export class StationsController {
  constructor(
    private readonly getAllStationsService: GetAllStationsService,
    private readonly getStationByIdService: GetStationByIdService,
    private readonly createStationService: CreateStationService,
    private readonly updateStationService: UpdateStationService,
    private readonly deleteStationService: DeleteStationService,
    private readonly searchStationService: SearchStationService,
    private readonly searchStationByRailLineService: SearchStationByRailLineService,
  ) {}

@UseGuards(AuthGuard)
@Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
@Post()
@ApiOperation({
  summary: 'Create a station in the database.',
  description: `Creates a new station with the provided details such as \`name\`, \`location\`, and optionally associated RailLine.
Only MANAGEMENT and ADMIN roles are authorized to access this endpoint.`,
})
@ApiCreatedResponse({ description: `Station created successfully.` })
@ApiBadRequestResponse({ description: `Invalid station data provided.` })
@ApiUnauthorizedResponse({ description: `Unauthorized. Access token is required.` })
@ApiInternalServerErrorResponse({ description: `Server error occurred while creating the station.` })
create(@Body() createStationDto: CreateStationDto) : Promise<StationResponseDto> {
  return this.createStationService.create(createStationDto);
}

@UseGuards(AuthGuard)
@Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
@Get()
@ApiOperation({
  summary: 'Get all stations.',
  description: `Retrieves all stations available in the system database. 
Includes full station information like name, location, and linked rail lines.`,
})
@ApiOkResponse({ description: `List of stations retrieved successfully.` })
@ApiUnauthorizedResponse({ description: `Unauthorized. Access token is required.` })
@ApiInternalServerErrorResponse({ description: `Failed to fetch stations due to server error.` })
findAll() : Promise<StationResponseDto[]> {
  return this.getAllStationsService.allStations();
}

@UseGuards(AuthGuard)
@Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
@Get(':id')
@ApiOperation({
  summary: 'Find a station by ID.',
  description: `Fetches a specific station based on its unique numeric ID.
Returns detailed station information if found. Accessible by MANAGEMENT and ADMIN roles.`,
})
@ApiOkResponse({ description: `Station retrieved successfully.` })
@ApiNotFoundResponse({ description: `No station found with the provided ID.` })
@ApiUnauthorizedResponse({ description: `Unauthorized. Access token is required.` })
@ApiInternalServerErrorResponse({ description: `Error occurred while fetching the station.` })
findOne(@Param('id') id: string): Promise<StationResponseDto> {
  return this.getStationByIdService.stationById(+id);
}

@UseGuards(AuthGuard)
@Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
@Patch(':id')
@ApiOperation({
  summary: 'Update a station by ID.',
  description: `Updates the station information like name, location, or RailLine based on the provided ID.
Only users with MANAGEMENT or ADMIN privileges can perform this action.`,
})
@ApiOkResponse({ description: `Station updated successfully.` })
@ApiBadRequestResponse({ description: `Invalid update payload.` })
@ApiNotFoundResponse({ description: `Station not found with the specified ID.` })
@ApiUnauthorizedResponse({ description: `Unauthorized. Access token is required.` })
@ApiInternalServerErrorResponse({ description: `Server error while updating the station.` })
update(@Param('id') id: number, @Body() updateStationDto: UpdateStationDto) : Promise<StationResponseDto> {
  return this.updateStationService.update(updateStationDto, +id);
}

@UseGuards(AuthGuard)
@Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
@Delete(':id')
@ApiOperation({
  summary: 'Delete a station by ID.',
  description: `Deletes a station permanently using its ID.
Ensure the station is not linked to critical operations before deleting. Only ADMIN and MANAGEMENT roles are allowed.`,
})
@ApiOkResponse({ description: `Station deleted successfully.` })
@ApiNotFoundResponse({ description: `No station found with the given ID.` })
@ApiUnauthorizedResponse({ description: `Unauthorized. Access token is required.` })
@ApiInternalServerErrorResponse({ description: `Failed to delete the station due to server error.` })
remove(@Param('id') id: string) : Promise<boolean> {
  return this.deleteStationService.delete(+id);
}

@UseGuards(AuthGuard)
@Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
@Get('/searchStation/:name')
@ApiOperation({
  summary: 'Search a station by name.',
  description: `Finds one or more stations that match the provided \`name\`.
Supports partial or full name searches. Available to MANAGEMENT and ADMIN roles.`,
})
@ApiOkResponse({ description: `Matching stations retrieved successfully.` })
@ApiNotFoundResponse({ description: `No station found with the given name.` })
@ApiUnauthorizedResponse({ description: `Unauthorized. Access token is required.` })
@ApiInternalServerErrorResponse({ description: `Server error occurred during station search.` })
search(@Param('name') name: string): Promise<StationResponseDto[]> {
  return this.searchStationService.searchStation(name);
}

@UseGuards(AuthGuard)
@Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
@Get('/searchStationByRailLine/:RailLineName')
@ApiOperation({
  summary: 'Search stations by RailLine name.',
  description: `Returns a list of stations that belong to a RailLine matching the given \`RailLineName\`.
Useful for filtering stations by route. Only accessible to MANAGEMENT and ADMIN roles.`,
})
@ApiOkResponse({ description: `Stations retrieved successfully by RailLine.` })
@ApiNotFoundResponse({ description: `No stations found under the specified RailLine.` })
@ApiUnauthorizedResponse({ description: `Unauthorized. Access token is required.` })
@ApiInternalServerErrorResponse({ description: `Error occurred while filtering by RailLine.` })
searchByRailLine(@Param('RailLineName') RailLineName: string): Promise<StationResponseDto[]> {
  return this.searchStationByRailLineService.searchStationByRailLine(RailLineName);
}
}
