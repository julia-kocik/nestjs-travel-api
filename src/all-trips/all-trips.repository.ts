import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripStatus } from './trip-status.enum';
import { Trip } from './all-trips.entity';

@Injectable()
export class AllTripsRepository extends Repository<Trip> {
  constructor(private dataSource: DataSource) {
    super(Trip, dataSource.createEntityManager());
  }
  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    const { name, description, destination, price, places } = createTripDto;

    const trip = this.create({
      name,
      description,
      destination,
      price,
      places,
      status: TripStatus.AVAILABLE,
    });

    await this.save(trip);
    return trip;
  }
}
