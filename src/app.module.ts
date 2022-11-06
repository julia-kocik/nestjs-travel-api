import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';

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
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
