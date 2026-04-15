import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseIncomeService } from './expense-income.service';

describe('ExpenseIncomeService', () => {
  let service: ExpenseIncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseIncomeService],
    }).compile();

    service = module.get<ExpenseIncomeService>(ExpenseIncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
