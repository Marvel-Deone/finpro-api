import { Test, TestingModule } from '@nestjs/testing';
import { SubsidiaryCategoriesService } from './subsidiary-categories.service';

describe('SubsidiaryCategoriesService', () => {
  let service: SubsidiaryCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsidiaryCategoriesService],
    }).compile();

    service = module.get<SubsidiaryCategoriesService>(SubsidiaryCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
