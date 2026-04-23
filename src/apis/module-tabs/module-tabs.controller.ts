import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ModuleTabsService } from './module-tabs.service';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { CreateModuleTabDto } from './dto/module-tab.dto';

@Controller('module-tabs')
@UseGuards(JwtAuthGuard)
export class ModuleTabsController {
    constructor(private readonly moduleTabsService: ModuleTabsService) { }


    @Post()
    @RequirePermission('update_personnel')
    create(@Body() dto: CreateModuleTabDto) {
        return this.moduleTabsService.create(dto);
    }

    @Get()
    findAll(@Query('categoryId') categoryId?: string) {
        return this.moduleTabsService.findAll(categoryId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moduleTabsService.findOne(id);
    }

    @Post(':id/records')
    addRecord(
        @Param('id') id: string,
        @Body() record: any
    ) {
        return this.moduleTabsService.addRecord(id, record);
    }

    @Delete(':id')
    @RequirePermission('delete_personnel')
    remove(@Param('id') id: string) {
        return this.moduleTabsService.remove(id);
    }
}
