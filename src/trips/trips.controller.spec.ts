import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';

const mockTripsService = {
  getAllTrips: jest.fn(),
};

const mockTrip = {
  id: '1befbb09-782a-4924-9e51-98f8ec8069ee',
  name: 'New York City Trip',
  description: 'Beautiful memories of city that never sleeps.',
  destination: 'NYC',
  price: 40,
  places: 20,
  status: 'AVAILABLE',
};

const mockUser: User = {
  id: '123',
  username: 'user2',
  password: 'Test1234',
  trips: [],
};

describe('Trips Controller', () => {
  let controller: TripsController;
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [TripsController],
      providers: [
        {
          provide: TripsService,
          useValue: mockTripsService,
        },
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAllTrips', () => {
    it('should successfully return allTrips', async () => {
      jest
        .spyOn(service, 'getAllTrips')
        .mockImplementation(() => [mockTrip] as any);
      const result = await controller.getAllTrips(mockUser);
      expect(service.getAllTrips).toHaveBeenCalled();
      expect(result).toEqual([mockTrip]);
    });
  });
});
