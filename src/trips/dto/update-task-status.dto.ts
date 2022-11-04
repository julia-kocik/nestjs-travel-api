import { IsEnum } from 'class-validator';
import { TripStatus } from '../trips.model';

export class UpdateTripDto {
  @IsEnum(TripStatus)
  status: TripStatus;
}
