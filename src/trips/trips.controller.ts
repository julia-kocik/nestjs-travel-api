import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trips.model';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  getAllTrips(): Trip[] {
    return this.tripsService.getAllTrips();
  }

  @Post()
  createTrip(@Body() createTripDto: CreateTripDto): Trip {
    return this.tripsService.createTrip(createTripDto);
  }
}
