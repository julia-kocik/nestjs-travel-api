import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/all-trips/all-trips.entity';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Favourite } from './trip.entity';

@Injectable()
export class TripRepository extends Repository<Favourite> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Trip) private allTripsRepository: Repository<Trip>,
  ) {
    super(Favourite, dataSource.createEntityManager());
  }
  async createTrip(id: string, user: User): Promise<Favourite> {
    const found = await this.allTripsRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Trip with id ${id} does not exist`);
    }
    const { name, description, destination, price, places, status } = found;

    const trip = this.create({
      name,
      description,
      destination,
      price,
      places,
      status,
      user,
    });

    await this.save(trip);
    return trip;
  }
}
