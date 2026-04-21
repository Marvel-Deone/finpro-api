import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HistoryService } from './history.service';

@ApiTags('History')
@ApiBearerAuth()
@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
        constructor(private readonly historyService: HistoryService) { }
        
        @Get()
        @ApiOperation({ summary: 'Get all history records' })
        findAll(@Query('categoryId') categoryId?: string) {
            return this.historyService.findAll(categoryId);
        }
}
