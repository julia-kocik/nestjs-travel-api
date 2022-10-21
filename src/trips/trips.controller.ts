import { Controller, Get } from '@nestjs/common';
import { Trip } from './trips.model';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  getAllTrips(): Trip[] {
    return this.tripsService.getAllTrips();
  }
}
