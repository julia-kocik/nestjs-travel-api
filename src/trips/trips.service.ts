import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip, TripStatus } from './trips.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TripsService {
  private trips: Trip[] = [];

  getAllTrips(): Trip[] {
    return this.trips;
  }

  getTripById(id: string): Trip {
    const found = this.trips.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException(`Trip with id: ${id} not found`);
    }

    return found;
  }

  deleteById(id: string): Trip[] {
    const trip = this.getTripById(id);
    this.trips = this.trips.filter((item) => item.id !== trip.id);
    return this.trips;
  }

  createTrip(createTripDto: CreateTripDto): Trip {
    const { name, description, destination, price, places } = createTripDto;

    const trip: Trip = {
      id: uuid(),
      name,
      description,
      destination,
      price,
      places,
      status: TripStatus.AVAILABLE,
    };

    this.trips.push(trip);
    return trip;
  }

  updateTrip(id: string, status: TripStatus): Trip {
    const trip = this.getTripById(id);
    trip.status = status;
    return trip;
  }
}
