import { Test, TestingModule } from '@nestjs/testing';
import { ModuleTabsService } from './module-tabs.service';

describe('ModuleTabsService', () => {
  let service: ModuleTabsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuleTabsService],
    }).compile();

    service = module.get<ModuleTabsService>(ModuleTabsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
