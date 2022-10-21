import { Injectable } from '@nestjs/common';
import { Trip } from './trips.model';

@Injectable()
export class TripsService {
  private trips: Trip[] = [];

  getAllTrips(): Trip[] {
    return this.trips;
  }
}
