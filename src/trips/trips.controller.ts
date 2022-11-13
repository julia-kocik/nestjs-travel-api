import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-task-status.dto';
import { Trip } from './trip.entity';
import { TripsService } from './trips.service';

@Controller('trips')
@UseGuards(AuthGuard())
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  getAllTrips(@GetUser() user: User): Promise<Trip[]> {
    return this.tripsService.getAllTrips(user);
  }

  @Get('/:id')
  getTripById(@Param('id') id: string, @GetUser() user: User): Promise<Trip> {
    return this.tripsService.getTripById(id, user);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tripsService.deleteById(id, user);
  }

  @Post()
  createTrip(
    @Body() createTripDto: CreateTripDto,
    @GetUser() user: User,
  ): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto, user);
  }

  @Patch('/:id/status')
  updateTrip(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
    @GetUser() user: User,
  ): Promise<Trip> {
    const { status } = updateTripDto;
    return this.tripsService.updateTrip(id, status, user);
  }
}
