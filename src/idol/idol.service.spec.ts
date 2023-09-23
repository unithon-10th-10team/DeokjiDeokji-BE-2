import { Test, TestingModule } from '@nestjs/testing';
import { IdolService } from './idol.service';

describe('IdolService', () => {
  let service: IdolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdolService],
    }).compile();

    service = module.get<IdolService>(IdolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
