import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TripsService } from './trips.service';
import { FavouriteRepository } from './trip.repository';
import { TripStatus } from './trip-status.enum';
import { AllTripsRepository } from '../all-trips/all-trips.repository';
import { Favourite } from './trip.entity';
import { User } from '../auth/user.entity';

const mockFavRepository = {
  getAllTrips: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockTripsRepository = {
  findOne: jest.fn(),
};

const mockUser: User = {
  id: '123',
  username: 'user2',
  password: 'Test1234',
  trips: [],
};

const mockAllTripsResponse = [
  {
    id: '1befbb09-782a-4924-9e51-98f8ec8069ee',
    name: 'New York City Trip',
    description: 'Beautiful memories of city that never sleeps.',
    destination: 'NYC',
    price: 40,
    places: 20,
    status: 'AVAILABLE',
    user: mockUser,
  },
];

describe('TripsService', () => {
  let service: TripsService;
  let repository: FavouriteRepository;
  let allTripsRepo: AllTripsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: getRepositoryToken(FavouriteRepository),
          useValue: mockFavRepository,
        },
        {
          provide: getRepositoryToken(AllTripsRepository),
          useValue: mockTripsRepository,
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
    repository = module.get(getRepositoryToken(FavouriteRepository));
    allTripsRepo = module.get<AllTripsRepository>(
      getRepositoryToken(AllTripsRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(allTripsRepo).toBeDefined();
  });

  describe('getAllTrips method', () => {
    it('return seccessfully allTrips', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() => mockAllTripsResponse as any);

      expect(await service.getAllTrips(mockUser)).toBe(mockAllTripsResponse);
    });
  });

  describe('createTrip', () => {
    it('should create a new trip and return it', async () => {
      const userTrip: Favourite = {
        id: '123',
        name: 'Trip 1',
        description: 'Description 1',
        destination: 'Destination 1',
        price: 100,
        places: 10,
        status: TripStatus.AVAILABLE,
        user: mockUser,
      };

      jest
        .spyOn(allTripsRepo, 'findOne')
        .mockImplementation(() => userTrip as any);
      jest
        .spyOn(repository, 'create')
        .mockImplementation(() => userTrip as any);
      jest.spyOn(repository, 'save').mockImplementation(() => userTrip as any);

      const result = await service.createTrip(userTrip.id, mockUser);
      expect(result).toEqual(userTrip);
    });
  });
});
