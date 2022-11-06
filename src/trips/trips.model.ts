export interface Trip {
  id: string;
  name: string;
  description: string;
  destination: string;
  price: number;
  places: number;
  status: TripStatus;
}

export enum TripStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
}
