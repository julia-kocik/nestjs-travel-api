import { IsEnum } from 'class-validator';
import { TripStatus } from '../trip-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTripDto {
  @IsEnum(TripStatus)
  @ApiProperty()
  status: TripStatus;
}
