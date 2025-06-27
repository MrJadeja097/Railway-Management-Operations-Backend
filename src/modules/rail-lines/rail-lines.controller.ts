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
import { CreateRailLineDto } from './dto/Rail-Lines Request Dto/create-rail-line.dto';
import { UpdateRailLineDto } from './dto/Rail-Lines Request Dto/update-rail-line.dto';
import { GetAllRailLinesService } from './services/get-all-rail-lines.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetRailLineByIdService } from './services/get-rail-line-by-id.service';
import { CreateRailLineService } from './services/create-rail-line.service';
import { DeleteRailLineService } from './services/delete-rail-line.service';
import { AuthGuard } from 'src/common/guards/tokenAuth.guard';
import { Permissions } from 'src/common/guards/role.decorator';
import { UpdateRaillineService } from './services/update-railline.service';
import { RailLineResponseDto } from './dto/Rail-Lines Response Dtos/railLine-response.dto';

@ApiBearerAuth('access-token')
@Controller('rail-lines')
export class RailLinesController {
  constructor(
    private readonly getAllRailLinesService: GetAllRailLinesService,
    private readonly getRailLineByIdService: GetRailLineByIdService,
    private readonly createRailLineService: CreateRailLineService,
    private readonly deleteRailLineService: DeleteRailLineService,
    private readonly updateRaillineService: UpdateRaillineService,
  ) {}

  @UseGuards(AuthGuard)
  // @Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
  @Post()
  @ApiOperation({
    summary: 'Add RailLine',
    description: `Create a new RailLine. You may optionally include the starting and ending stations during creation. 
This endpoint is restricted to MANAGEMENT and ADMIN roles.`,
  })
  @ApiCreatedResponse({ description: `RailLine created successfully.` })
  @ApiBadRequestResponse({
    description: `Invalid data provided for creating the RailLine.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected server error occurred while creating RailLine.`,
  })
  create(@Body() createRailLineDto: CreateRailLineDto) {
    return this.createRailLineService.create(createRailLineDto);
  }

  @UseGuards(AuthGuard)
  // @Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
  @Get()
  @ApiOperation({
    summary: 'Get all RailLines',
    description: `Retrieve a list of all RailLines present in the system. This includes RailLines with or without associated stations. 
Access is limited to MANAGEMENT and ADMIN roles.`,
  })
  @ApiOkResponse({ description: `List of RailLines fetched successfully.` })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected error while retrieving RailLines.`,
  })
  findAll() : Promise<RailLineResponseDto[]> {
    return this.getAllRailLinesService.getAll();
  }

  @UseGuards(AuthGuard)
  // @Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
  @Get(':id')
  @ApiOperation({
    summary: 'Get RailLine by ID',
    description: `Fetch details of a specific RailLine using its ID. This includes associated stations and other metadata. 
Only users with MANAGEMENT or ADMIN privileges are allowed.`,
  })
  @ApiOkResponse({ description: `RailLine found and returned successfully.` })
  @ApiNotFoundResponse({
    description: `No RailLine found with the specified ID.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected error occurred while retrieving RailLine.`,
  })
  findOne(@Param('id') id: string) : Promise<RailLineResponseDto>{
    return this.getRailLineByIdService.RailLineById(+id);
  }

  @UseGuards(AuthGuard)
  // @Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update RailLine by ID',
    description: `Update the details of an existing RailLine by its ID. You can modify properties such as name or station associations. 
This operation is restricted to MANAGEMENT and ADMIN roles.`,
  })
  @ApiOkResponse({ description: `RailLine updated successfully.` })
  @ApiBadRequestResponse({
    description: `Invalid update data or malformed request.`,
  })
  @ApiNotFoundResponse({ description: `RailLine not found with the given ID.` })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected server error while updating RailLine.`,
  })
  update(
    @Param('id') id: string,
    @Body() updateRailLineDto: UpdateRailLineDto,
  ): Promise<RailLineResponseDto> {
    return this.updateRaillineService.updateRailLine(+id, updateRailLineDto);
  }

  @UseGuards(AuthGuard)
  // @Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete RailLine by ID',
    description: `Permanently delete a RailLine from the system using its ID. This operation may be restricted if the RailLine is in use. 
Only MANAGEMENT and ADMIN roles are permitted to perform this action.`,
  })
  @ApiOkResponse({ description: `RailLine deleted successfully.` })
  @ApiNotFoundResponse({
    description: `RailLine not found with the specified ID.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected error occurred while deleting the RailLine.`,
  })
  remove(@Param('id') id: string) : Promise<boolean>{
    return this.deleteRailLineService.delete(+id);
  }
}
