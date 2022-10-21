import { Controller, Get } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  getAllTrips() {
    return this.tripsService.getAllTrips();
  }
}
