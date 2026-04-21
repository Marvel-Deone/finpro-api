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
import { StocksService } from './stocks.service';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Stocks')
@ApiBearerAuth()
@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StocksController {
    constructor(private readonly stocksService: StocksService) { }

    @Post()
    @ApiOperation({ summary: 'Create a stock record' })
    @ApiResponse({ status: 201, description: 'Stock created successfully' })
    @UseInterceptors(FileInterceptor('file', { dest: './uploads', }))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {
        return this.stocksService.create({
            ...body,
            asset_proof: file?.fieldname,
        });
    }

    @Get()
    @ApiOperation({ summary: 'Get all stock records' })
    findAll(@Query('categoryId') categoryId?: string) {
        return this.stocksService.findAll(categoryId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single stock record' })
    findOne(@Param('id') id: string) {
        return this.stocksService.findOne(id);
    }
}