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

import { LoansService } from './loans.service';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLoanDto } from './dto/loan.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Loans')
@ApiBearerAuth()
@Controller('loans')
@UseGuards(JwtAuthGuard)
export class LoansController {
    constructor(private readonly loansService: LoansService) { }

    @Post()
    @ApiOperation({ summary: 'Create a loan record' })
    @ApiResponse({ status: 201, description: 'Loan created successfully' })
    @UseInterceptors(FileInterceptor('file', { dest: './uploads', }))
    create(
         @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {
        return this.loansService.create({
            ...body,
            liability_proof: file?.filename,
        });
    }

    @Get()
    @ApiOperation({ summary: 'Get all loan records' })
    findAll(@Query('categoryId') categoryId?: string) {
        return this.loansService.findAll(categoryId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single loan record' })
    findOne(@Param('id') id: string) {
        return this.loansService.findOne(id);
    }
}