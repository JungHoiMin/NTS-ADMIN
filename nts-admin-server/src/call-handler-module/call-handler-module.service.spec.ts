import { Test, TestingModule } from '@nestjs/testing';
import { CallHandlerModuleService } from './call-handler-module.service';

describe('CallHandlerModuleService', () => {
  let service: CallHandlerModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallHandlerModuleService],
    }).compile();

    service = module.get<CallHandlerModuleService>(CallHandlerModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
