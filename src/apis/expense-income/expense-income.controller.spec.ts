import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseIncomeController } from './expense-income.controller';

describe('ExpenseIncomeController', () => {
  let controller: ExpenseIncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseIncomeController],
    }).compile();

    controller = module.get<ExpenseIncomeController>(ExpenseIncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
