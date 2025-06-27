import { CreateStaffDto } from './dto/Staff Request Dtos/create-staff.dto';
import { GetAllStaffService } from './services/get-all-staff.service';
import { LoggingInterceptor } from 'src/common/Interceptors/logging.interceptor';
import { CreateStaffService } from './services/create-staff.service';
import { GetStaffByArgsService } from './services/get-staff-by-args.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { StaffRequestArgsDto } from './dto/Staff Request Dtos/staff-args-request.dto';
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
import { DeleteStaffService } from './services/delete-staff.service';
import { AuthGuard } from 'src/common/guards/tokenAuth.guard';
import { Permissions } from 'src/common/guards/role.decorator';
import { StaffResponseDto } from './dto/Staff Response Dtos/staff-response.dto';
import { AssignRoleToStaffService } from './services/assign-role-to-staff.service';

@UseInterceptors(LoggingInterceptor)
@Controller('staff')
@ApiBearerAuth('access-token')
export class StaffController {
  constructor(
    private readonly getAllStaffService: GetAllStaffService,
    private readonly createStaffService: CreateStaffService,
    private readonly getStaffByArgsService: GetStaffByArgsService,
    private readonly deleteStaffService: DeleteStaffService,
    private readonly assignRoleToStaffService: AssignRoleToStaffService,
  ) {}

  @UseGuards(AuthGuard)
  // @Permissions('dcs','csaf')
  @Post()
  @ApiOperation({
    summary: 'Create a staff person.',
    description: `Creates a new staff member in the system. Only ADMIN users are authorized to access this endpoint.
Provide all necessary staff details through the request body.`,
  })
  @ApiCreatedResponse({ description: `Staff member created successfully.` })
  @ApiBadRequestResponse({ description: `Invalid staff data provided.` })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Access token is missing or invalid.`,
  })
  @ApiInternalServerErrorResponse({
    description: `An unexpected error occurred while creating the staff.`,
  })
  create(@Body() createStaffDto: CreateStaffDto): Promise<StaffResponseDto> {
    return this.createStaffService.create(createStaffDto);
  }

  @UseGuards(AuthGuard)
  @Permissions('create_staff')
  @Get('all')
  @ApiOperation({
    summary: 'Get all staff persons info.',
    description: `Fetches a list of all staff members currently present in the system. Accessible to MANAGEMENT and ADMIN users only.`,
  })
  @ApiOkResponse({
    description: `List of staff members retrieved successfully.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Access token is missing or invalid.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Failed to retrieve staff list due to server error.`,
  })
  findAll(): Promise<StaffResponseDto[]> {
    return this.getAllStaffService.findAll();
  }

  @UseGuards(AuthGuard)
  @Permissions('read_staff')
  @Get(':id')
  @ApiOperation({
    summary: 'Find a staff person by ID.',
    description: `Retrieves the details of a specific staff member using their unique ID. Accessible to MANAGEMENT and ADMIN roles.`,
  })
  @ApiOkResponse({ description: `Staff member data retrieved successfully.` })
  @ApiNotFoundResponse({
    description: `No staff member found with the given ID.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Access token is missing or invalid.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Error occurred while fetching staff details.`,
  })
  findOne(@Param('id') id: string): Promise<StaffResponseDto> {
    return this.getStaffByArgsService.findbyId(+id);
  }

  @UseGuards(AuthGuard)
  @Permissions('delete_staff')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a staff member by ID.',
    description: `Permanently removes a staff member from the system based on their ID. Only MANAGEMENT and ADMIN roles are permitted.`,
  })
  @ApiOkResponse({ description: `Staff member deleted successfully.` })
  @ApiNotFoundResponse({
    description: `No staff member found with the specified ID.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Access token is missing or invalid.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Failed to delete staff due to server error.`,
  })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.deleteStaffService.delete(+id);
  }

  @UseGuards(AuthGuard)
  @Permissions('read_staff')
  @Post('find-user-by-args')
  @ApiOperation({
    summary: 'Find a staff person from arguments.',
    description: `Search for a staff member using partial arguments such as \`firstname\`, \`lastname\`, \`email\`, etc.
Useful for flexible staff queries. Accessible to MANAGEMENT and ADMIN users.`,
  })
  @ApiOkResponse({
    description: `Matching staff members retrieved successfully.`,
  })
  @ApiBadRequestResponse({
    description: `Invalid arguments provided for the search.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Access token is missing or invalid.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected error during staff lookup.`,
  })
  findStaffByArgs(
    @Body() staffColums: Partial<StaffRequestArgsDto>,
  ): Promise<StaffResponseDto[]> {
    return this.getStaffByArgsService.findByArgs(staffColums);
  }

  @UseGuards(AuthGuard)
  @Permissions('update_staff')
  @Get('assign-role-to-staff/:staffId/:role')
  async assignRole(@Param('staffId') staffId:number, @Param('role') role:string){
    return await this.assignRoleToStaffService.assignRole(staffId, role)
  }
}
