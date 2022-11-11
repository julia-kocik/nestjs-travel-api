import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trips/trip.entity';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TripsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'travel-nest',
      entities: [Trip],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
