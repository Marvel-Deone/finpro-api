import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Query,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExamDto } from './dto/exam.dto';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';

@Controller('exams')
@UseGuards(JwtAuthGuard)
export class ExamsController {
    constructor(private readonly examsService: ExamsService) { }


    @Post()
    @RequirePermission('update_personnel')
    create(@Body() dto: CreateExamDto) {
        return this.examsService.create(dto);
    }

    @Get()
    findAll(@Query('categoryId') categoryId?: string) {
        return this.examsService.findAll(categoryId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.examsService.findOne(id);
    }
}