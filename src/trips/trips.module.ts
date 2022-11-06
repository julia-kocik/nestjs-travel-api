import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripRepository } from './trip.repository';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([TripRepository])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
