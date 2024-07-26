import { Test, TestingModule } from '@nestjs/testing';
import { CallHandlerModuleController } from './call-handler-module.controller';
import { CallHandlerModuleService } from './call-handler-module.service';

describe('CallHandlerModuleController', () => {
  let controller: CallHandlerModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallHandlerModuleController],
      providers: [CallHandlerModuleService],
    }).compile();

    controller = module.get<CallHandlerModuleController>(CallHandlerModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
