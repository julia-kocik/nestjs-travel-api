import { Test, TestingModule } from '@nestjs/testing';
import { AllTripsController } from './all-trips.controller';
import { AllTripsService } from './all-trips.service';

const mockAllTripsService = {};

describe('All Trips Controller', () => {
  let controller: AllTripsController;
  let service: AllTripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllTripsController],
      providers: [
        {
          provide: AllTripsService,
          useValue: mockAllTripsService,
        },
      ],
    }).compile();

    controller = module.get<AllTripsController>(AllTripsController);
    service = module.get<AllTripsService>(AllTripsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
