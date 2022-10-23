import { Injectable } from '@nestjs/common';
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
    return this.trips.find((item) => item.id === id);
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
}
