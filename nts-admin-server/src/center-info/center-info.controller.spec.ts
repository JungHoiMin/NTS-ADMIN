import { Test, TestingModule } from '@nestjs/testing';
import { CenterInfoController } from './center-info.controller';
import { CenterInfoService } from './center-info.service';

describe('CenterInfoController', () => {
  let controller: CenterInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CenterInfoController],
      providers: [CenterInfoService],
    }).compile();

    controller = module.get<CenterInfoController>(CenterInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
