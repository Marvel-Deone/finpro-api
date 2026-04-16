import { Module } from '@nestjs/common';
import { ModuleTabsController } from './module-tabs.controller';
import { ModuleTabsService } from './module-tabs.service';

@Module({
  controllers: [ModuleTabsController],
  providers: [ModuleTabsService]
})
export class ModuleTabsModule {}
