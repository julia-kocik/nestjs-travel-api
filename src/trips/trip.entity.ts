import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TripStatus } from './trips.model';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  desctiption: string;

  @Column()
  destination: string;

  @Column()
  price: number;

  @Column()
  places: number;

  @Column()
  status: TripStatus;
}
