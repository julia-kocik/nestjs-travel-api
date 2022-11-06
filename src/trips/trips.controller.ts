import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-task-status.dto';
import { TripStatus } from './trip-status.enum';
import { Trip } from './trip.entity';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  getAllTrips(): Promise<Trip[]> {
    return this.tripsService.getAllTrips();
  }

  @Get('/:id')
  getTripById(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.getTripById(id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.tripsService.deleteById(id);
  }

  @Post()
  createTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripsService.createTrip(createTripDto);
  }

  @Patch('/:id/status')
  updateTrip(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    const { status } = updateTripDto;
    return this.tripsService.updateTrip(id, status);
  }
}
