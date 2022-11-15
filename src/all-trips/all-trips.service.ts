import { Injectable } from '@nestjs/common';
import { Trip } from './all-trips.entity';
import { AllTripsRepository } from './all-trips.repository';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class AllTripsService {
  constructor(private readonly tripRepository: AllTripsRepository) {}

  async getAllTrips(): Promise<Trip[]> {
    return await this.tripRepository.find();
  }

  createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripRepository.createTrip(createTripDto);
  }
}
