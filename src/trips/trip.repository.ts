import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripStatus } from './trip-status.enum';
import { Trip } from './trip.entity';

@Injectable()
export class TripRepository extends Repository<Trip> {
  constructor(private dataSource: DataSource) {
    super(Trip, dataSource.createEntityManager());
  }
  async createTrip(createTripDto: CreateTripDto, user: User): Promise<Trip> {
    const { name, description, destination, price, places } = createTripDto;

    const trip = this.create({
      name,
      description,
      destination,
      price,
      places,
      status: TripStatus.AVAILABLE,
      user,
    });

    await this.save(trip);
    return trip;
  }
}
