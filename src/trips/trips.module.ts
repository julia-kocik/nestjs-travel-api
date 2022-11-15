import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/all-trips/all-trips.entity';
import { AllTripsModule } from 'src/all-trips/all-trips.module';
import { AuthModule } from 'src/auth/auth.module';
import { Favourite } from './trip.entity';
import { TripRepository } from './trip.repository';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favourite]),
    AuthModule,
    TypeOrmModule.forFeature([Trip]),
    AllTripsModule,
  ],
  controllers: [TripsController],
  providers: [TripsService, TripRepository],
})
export class TripsModule {}
