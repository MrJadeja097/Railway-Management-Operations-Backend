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
import { CreateRouteDto } from './dto/Routes Request Dtos/create-route.dto';
import { UpdateRouteDto } from './dto/Routes Request Dtos/update-route.dto';
import { CreateRouteService } from './services/create-route.service';
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
import { GetAllRoutesService } from './services/get-all-routes.service';
import { GetRouteByIdService } from './services/get-route-by-id.service';
import { Permissions } from 'src/common/guards/role.decorator';
import { AuthGuard } from 'src/common/guards/tokenAuth.guard';

@ApiBearerAuth('access-token')
@Controller('routes')
export class ActiveRoutesController {
  constructor(
    private readonly createRouteService: CreateRouteService,
    private readonly getAllRoutesService: GetAllRoutesService,
    private readonly getRouteByIdService: GetRouteByIdService,
  ) {}

  @UseGuards(AuthGuard)
  @Permissions('create_activeroute')
  @Post('create-route')
  @ApiOperation({
    summary: 'Create a new route using all the existing resources.',
    description:
      'Only users with MANAGEMENT or ADMIN roles can create a new active route.',
  })
  @ApiCreatedResponse({ description: 'Route created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid route data provided.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing token.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.createRouteService.create(createRouteDto);
  }

  // @UseGuards(AuthGuard)
  // @Permissions('read_activeroute')
  @Get()
  @ApiOperation({
    summary: 'Retrieve all active routes.',
    description: 'Lists all routes currently marked as active.',
  })
  @ApiOkResponse({
    description: 'List of active routes returned successfully.'})
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing token.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  findAll() {
    return this.getAllRoutesService.getAllActiveRoutes();
  }

  @UseGuards(AuthGuard)
  @Permissions('read_activeroute')
  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a specific active route by ID.',
    description: 'Fetches an active route by its unique identifier.',
  })
  @ApiOkResponse({
    description: 'Active route found.'  })
  @ApiNotFoundResponse({ description: 'Route not found with the given ID.' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing token.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  findOne(@Param('id') id: string) {
    return this.getRouteByIdService.getActiveRouteById(+id);
  }
}

//   @UseGuards(AuthGuard)
// @Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
// @Patch(':id')
// update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
//   return this.activeRoutesService.update(+id, updateRouteDto);
// }

//   @UseGuards(AuthGuard)
// @Roles(StaffRole.MANAGEMENT, StaffRole.ADMIN)
// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.activeRoutesService.remove(+id);
// }