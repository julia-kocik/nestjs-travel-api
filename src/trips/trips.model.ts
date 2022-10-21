export interface Trip {
  id: string;
  name: string;
  description: string;
  destination: string;
  price: string;
  availability: number;
  status: TripStatus;
}

enum TripStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
}
