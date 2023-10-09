import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';
import { AllTripsModule } from './all-trips/all-trips.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TripsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: false,
          extra: {
            ssl: null,
          },
          type: 'postgres',
          url: !isProduction && configService.get('DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: true,
          host: isProduction && configService.get('DATABASE_URL'),
          username: isProduction && configService.get('POSTGRES_USER'),
          password: isProduction && configService.get('POSTGRES_PASSWORD'),
          database: isProduction && configService.get('POSTGRES_DB'),
        };
      },
    }),
    AllTripsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
