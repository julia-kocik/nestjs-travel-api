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
import { Trip, TripStatus } from './trips.model';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  getAllTrips(): Trip[] {
    return this.tripsService.getAllTrips();
  }

  @Get('/:id')
  getTripById(@Param('id') id: string): Trip {
    return this.tripsService.getTripById(id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Trip[] {
    return this.tripsService.deleteById(id);
  }

  @Post()
  createTrip(@Body() createTripDto: CreateTripDto): Trip {
    return this.tripsService.createTrip(createTripDto);
  }

  @Patch('/:id/status')
  updateTrip(
    @Param('id') id: string,
    @Body('status') status: TripStatus,
  ): Trip {
    return this.tripsService.updateTrip(id, status);
  }
}
