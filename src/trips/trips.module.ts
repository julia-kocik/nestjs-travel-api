import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Trip } from './trip.entity';
import { TripRepository } from './trip.repository';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), AuthModule],
  controllers: [TripsController],
  providers: [TripsService, TripRepository],
})
export class TripsModule {}
