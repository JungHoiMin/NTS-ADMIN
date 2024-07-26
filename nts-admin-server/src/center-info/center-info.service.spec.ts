import { Test, TestingModule } from '@nestjs/testing';
import { CenterInfoService } from './center-info.service';

describe('CenterInfoService', () => {
  let service: CenterInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CenterInfoService],
    }).compile();

    service = module.get<CenterInfoService>(CenterInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
