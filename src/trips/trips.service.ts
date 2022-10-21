import { Injectable } from '@nestjs/common';

@Injectable()
export class TripsService {
  private trips = [];

  getAllTrips() {
    return this.trips;
  }
}
