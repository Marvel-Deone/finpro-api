import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Query,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExamDto } from './dto/exam.dto';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('exams')
@UseGuards(JwtAuthGuard)
export class ExamsController {
    constructor(private readonly examsService: ExamsService) { }

    // @Post()
    // @RequirePermission('update_personnel')
    // create(@Body() dto: CreateExamDto) {
    //     return this.examsService.create(dto);
    // }
    @Post()
    @RequirePermission('update_personnel')
    @UseInterceptors(FileInterceptor('file', { dest: './uploads', }))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {
        return this.examsService.create({
            ...body,
            document_proof: file?.filename,
        });
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