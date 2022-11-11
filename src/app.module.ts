import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trips/trip.entity';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TripsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'travel-nest',
      entities: [Trip, User],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
