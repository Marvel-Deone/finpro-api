import { Test, TestingModule } from '@nestjs/testing';
import { SubsidiaryCategoriesController } from './subsidiary-categories.controller';

describe('SubsidiaryCategoriesController', () => {
  let controller: SubsidiaryCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsidiaryCategoriesController],
    }).compile();

    controller = module.get<SubsidiaryCategoriesController>(SubsidiaryCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
