import { Module } from '@nestjs/common';
import { SubsidiaryCategoriesService } from './subsidiary-categories.service';
import { SubsidiaryCategoriesController } from './subsidiary-categories.controller';

@Module({
  providers: [SubsidiaryCategoriesService],
  controllers: [SubsidiaryCategoriesController]
})
export class SubsidiaryCategoriesModule {}
