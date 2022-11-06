import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripStatus } from './trip-status.enum';
import { Trip } from './trip.entity';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripsService {
  constructor(private readonly tripRepository: TripRepository) {}

  // getAllTrips(): Trip[] {
  //   return this.trips;
  // }

  async getTripById(id: string): Promise<Trip> {
    const found = await this.tripRepository.findOne({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Trip with id: ${id} not found`);
    }
    return found;
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.tripRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Trip with id: ${id} not found`);
    }
  }

  createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripRepository.createTrip(createTripDto);
  }

  // updateTrip(id: string, status: TripStatus): Trip {
  //   const trip = this.getTripById(id);
  //   trip.status = status;
  //   return trip;
  // }
}
