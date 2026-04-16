import { Module } from '@nestjs/common';
import { ExpenseIncomeService } from './expense-income.service';
import { ExpenseIncomeController } from './expense-income.controller';

@Module({
  providers: [ExpenseIncomeService],
  controllers: [ExpenseIncomeController]
})
export class ExpenseIncomeModule {}
