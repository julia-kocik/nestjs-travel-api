export interface Trip {
  id: string;
  name: string;
  description: string;
  destination: string;
  price: string;
  places: number;
  status: TripStatus;
}

export enum TripStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
}
