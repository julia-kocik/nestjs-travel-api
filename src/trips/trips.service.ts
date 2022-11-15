import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripStatus } from './trip-status.enum';
import { Favourite } from './trip.entity';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripsService {
  constructor(private readonly tripRepository: TripRepository) {}

  async getAllTrips(user: User): Promise<Favourite[]> {
    return await this.tripRepository.find({ where: { user } });
  }

  async getTripById(id: string, user: User): Promise<Favourite> {
    const found = await this.tripRepository.findOne({
      where: {
        id,
        user,
      },
    });
    if (!found) {
      throw new NotFoundException(`Trip with id: ${id} not found`);
    }
    return found;
  }

  async deleteById(id: string, user: User): Promise<void> {
    const result = await this.tripRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Trip with id: ${id} not found`);
    }
  }

  createTrip(id: string, user: User): Promise<Favourite> {
    return this.tripRepository.createTrip(id, user);
  }

  async updateTrip(
    id: string,
    status: TripStatus,
    user: User,
  ): Promise<Favourite> {
    const trip = await this.getTripById(id, user);
    trip.status = status;
    await this.tripRepository.save(trip);
    return trip;
  }
}
