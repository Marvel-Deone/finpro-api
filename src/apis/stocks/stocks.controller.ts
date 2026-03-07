import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Query,
} from '@nestjs/common';
import { StocksService } from './stocks.service';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStockDto } from './dto/stock.dto';

@ApiTags('Stocks')
@ApiBearerAuth()
@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StocksController {
    constructor(private readonly stocksService: StocksService) { }

    @Post()
    @ApiOperation({ summary: 'Create a stock record' })
    @ApiResponse({ status: 201, description: 'Stock created successfully' })
    create(@Body() dto: CreateStockDto) {
        return this.stocksService.create(dto);
    }

    //   @Get()
    //   @ApiOperation({ summary: 'Get all stock records' })
    //   findAll() {
    //     return this.stocksService.findAll();
    //   }
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