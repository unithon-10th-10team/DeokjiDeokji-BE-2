import { Test, TestingModule } from '@nestjs/testing';
import { IdolController } from './idol.controller';

describe('IdolController', () => {
  let controller: IdolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdolController],
    }).compile();

    controller = module.get<IdolController>(IdolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
