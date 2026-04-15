import { Test, TestingModule } from '@nestjs/testing';
import { ModuleTabsController } from './module-tabs.controller';

describe('ModuleTabsController', () => {
  let controller: ModuleTabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleTabsController],
    }).compile();

    controller = module.get<ModuleTabsController>(ModuleTabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
