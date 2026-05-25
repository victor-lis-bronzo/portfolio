import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return default greeting when no name is provided', () => {
      expect(appController.getHello()).toEqual({ message: 'Hello, World!' });
    });

    it('should return personalized greeting when name is provided', () => {
      expect(appController.getHello('Victor')).toEqual({ message: 'Hello, Victor!' });
    });
  });
});
