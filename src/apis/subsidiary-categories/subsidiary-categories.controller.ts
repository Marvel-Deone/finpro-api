import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SubsidiaryCategoriesService } from './subsidiary-categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';

@Controller('subsidiary-categories')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SubsidiaryCategoriesController {
  constructor(private readonly subsidiaryCategory: SubsidiaryCategoriesService) { }

  @Post()
  @RequirePermission('create_category')
  create(@Body() dto: CreateCategoryDto) {
    return this.subsidiaryCategory.create(dto);
  }

  @Get('overview')
  getOverview() {
    return this.subsidiaryCategory.getBusinessOverviewTotals();
  }

  @Get()
  @RequirePermission('view_category')
  findAll() {
    return this.subsidiaryCategory.findAll();
  }

  @Get(':id')
  @RequirePermission('view_category')
  findOne(@Param('id') id: string) {
    return this.subsidiaryCategory.findOne(id);
  }

  @Get('subsidiary/:subsidiaryId')
  @RequirePermission('view_category')
  findBySubsidiary(@Param('subsidiaryId') subsidiaryId: string) {
    return this.subsidiaryCategory.findBySubsidiary(subsidiaryId);
  }

  @Patch(':id')
  @RequirePermission('update_category')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.subsidiaryCategory.update(id, dto);
  }

  // Delete subsidiary-category
  @Delete(':id')
  @RequirePermission('delete_category')
  remove(@Param('id') id: string) {
    return this.subsidiaryCategory.remove(id);
  }
}