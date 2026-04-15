import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { CreateEventDto } from './dto/event.dto';
import { EventsService } from './events.service';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post()
    @RequirePermission('update_personnel')
    create(@Body() dto: CreateEventDto) {
        return this.eventsService.create(dto);
    }

    @Get()
    findAll(@Query('categoryId') categoryId?: string) {
        return this.eventsService.findAll(categoryId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: CreateEventDto) {
        return this.eventsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.eventsService.remove(id);
    }
}
