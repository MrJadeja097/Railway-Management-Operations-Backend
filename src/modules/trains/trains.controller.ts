import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CreateTrainDto } from './dto/Train Request Dtos/create-train.dto';
import { GetAllTrainsService } from './services/get-all-trains.service';
import { CreateTrainService } from './services/create-train.service';
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
import { DeleteTrainService } from './services/delete-train.service';
import { SearchTrainService } from './services/search-train.service';
import { GetTrainByIdService } from './services/get-train-by-id.service';
import { Permissions } from 'src/common/guards/role.decorator';
import { AuthGuard } from 'src/common/guards/tokenAuth.guard';
import { UpdateTrainService } from './services/update-train.service';
import { UpdateTrainDto } from './dto/Train Request Dtos/update-train.dto';
import { TrainResponseDto } from './dto/Train Response Dtos/train-response.dto';

@ApiBearerAuth('access-token')
@Controller('trains')
export class TrainsController {
  constructor(
    private readonly getAllTrainService: GetAllTrainsService,
    private readonly createTrainService: CreateTrainService,
    private readonly deleteTrainService: DeleteTrainService,
    private readonly searchTrainService: SearchTrainService,
    private readonly getTrainByIdService: GetTrainByIdService,
    private readonly updateTrainService: UpdateTrainService,
  ) {}

  @UseGuards(AuthGuard)
  @Permissions('create_train')
  @Post()
  @ApiOperation({
    summary: 'Add Train to Database.',
    description: `Creates a new Train entity in the database. 
You must provide valid details such as \`train name\`, \`capacity\`, and related properties in the request body.
Only users with MANAGEMENT or ADMIN roles can perform this operation.`,
  })
  @ApiCreatedResponse({ description: `Train added successfully.` })
  @ApiBadRequestResponse({
    description: `Invalid data provided for train creation.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected error occurred while creating train.`,
  })
  create(@Body() createTrainDto: CreateTrainDto): Promise<TrainResponseDto> {
    return this.createTrainService.create(createTrainDto);
  }

  @UseGuards(AuthGuard)
  @Permissions('read_train')
  @Get()
  @ApiOperation({
    summary: 'See all available Trains.',
    description: `Retrieves a list of all available Trains from the database. 
Returns data including train name, capacity, and metadata. Accessible to MANAGEMENT and ADMIN roles.`,
  })
  @ApiOkResponse({ description: `List of trains fetched successfully.` })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Error occurred while retrieving train data.`,
  })
  findAll(): Promise<TrainResponseDto[]> {
    return this.getAllTrainService.allTrains();
  }

  @UseGuards(AuthGuard)
  @Permissions('read_train')
  @Get(':name')
  @ApiOperation({
    summary: 'Search a train by name.',
    description: `Searches for trains by their name (case-insensitive match supported).
Useful for finding specific trains when the ID is unknown. Only accessible to MANAGEMENT and ADMIN users.`,
  })
  @ApiOkResponse({ description: `Matching trains found successfully.` })
  @ApiNotFoundResponse({
    description: `No trains found with the provided name.`,
  })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Failed to search trains due to server error.`,
  })
  findByName(@Param('name') name: string): Promise<TrainResponseDto[]> {
    return this.searchTrainService.searchTrain(name);
  }

  @UseGuards(AuthGuard)
  @Permissions('read_train')
  @Get('/findById/:id')
  @ApiOperation({
    summary: 'Search a train by ID.',
    description: `Fetches a train by its unique numeric ID. Returns complete information about the train if found.
This operation is restricted to MANAGEMENT and ADMIN roles.`,
  })
  @ApiOkResponse({ description: `Train found successfully.` })
  @ApiNotFoundResponse({ description: `No train found with the specified ID.` })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Unexpected error occurred while retrieving the train.`,
  })
  findById(@Param('id') id: string): Promise<TrainResponseDto> {
    return this.getTrainByIdService.trainById(+id);
  }

  @UseGuards(AuthGuard)
  @Permissions('update_train')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a train by ID.',
    description: `Updates a train’s information using its ID. You may modify fields like \`name\`, \`capacity\`, etc.
Only MANAGEMENT and ADMIN roles can access this operation.`,
  })
  @ApiOkResponse({ description: `Train updated successfully.` })
  @ApiBadRequestResponse({
    description: `Invalid data provided for train update.`,
  })
  @ApiNotFoundResponse({ description: `Train not found with the given ID.` })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `Failed to update train due to server error.`,
  })
  update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.updateTrainService.update(+id, updateTrainDto);
  }

  @UseGuards(AuthGuard)
  @Permissions('delete_train')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a train by ID.',
    description: `Deletes a train from the database using its ID. 
Ensure the train is not assigned or in active operation before attempting to delete.
This operation is restricted to MANAGEMENT and ADMIN users.`,
  })
  @ApiOkResponse({ description: `Train deleted successfully.` })
  @ApiNotFoundResponse({ description: `No train found with the given ID.` })
  @ApiUnauthorizedResponse({
    description: `Unauthorized. Valid access token is required.`,
  })
  @ApiInternalServerErrorResponse({
    description: `An error occurred while deleting the train.`,
  })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.deleteTrainService.delete(+id);
  }
}
