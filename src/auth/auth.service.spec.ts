import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './Auth.service';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let repository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: 3600,
            },
          }),
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get(getRepositoryToken(UserRepository));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('signup', () => {
    it('should register a new user', async () => {
      const mockCredentialsDto = { username: 'user123', password: 'password' };
      const mockSalt = 'mockSalt';
      const mockHashedPassword = 'mockHashedPassword';
      const hashedUser = {
        username: mockCredentialsDto.username,
        password: mockHashedPassword,
      };
      const mockToken = '1234567';

      const saltSpy = jest
        .spyOn(bcrypt, 'genSalt')
        .mockImplementation(() => mockSalt);
      const hashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => mockHashedPassword);
      const createSpy = jest
        .spyOn(repository, 'create')
        .mockImplementation(() => hashedUser as any);
      const saveSpy = jest
        .spyOn(repository, 'save')
        .mockImplementation(() => hashedUser as any);
      const jwtSpy = jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => mockToken as any);

      const result = await service.signUp(mockCredentialsDto);

      expect(saltSpy).toHaveBeenCalled();
      expect(hashSpy).toHaveBeenCalledWith(
        mockCredentialsDto.password,
        mockSalt,
      );
      expect(createSpy).toHaveBeenCalledWith(hashedUser);
      expect(saveSpy).toHaveBeenCalledWith(hashedUser);
      expect(jwtSpy).toHaveBeenCalledWith({
        username: mockCredentialsDto.username,
      });

      expect(result).toEqual({
        accessToken: mockToken,
      });
    });
  });
});
