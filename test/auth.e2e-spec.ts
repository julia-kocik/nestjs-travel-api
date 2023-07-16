import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppModule } from '../src/app.module';

describe('AuthController', () => {
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [path.resolve(__dirname, 'your', 'entity', 'path')],
            synchronize: true,
            logging: false,
          }),
        }),
        AppModule,
      ],
    }).compile();
  });

  afterAll(async () => {
    await moduleFixture.close();
  });

  it('should', async () => {
    //
  });
});
