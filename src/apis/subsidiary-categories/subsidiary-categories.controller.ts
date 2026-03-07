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
  constructor(private readonly service: SubsidiaryCategoriesService) {}

  @Post()
  @RequirePermission('create_category')
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  @RequirePermission('view_category')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @RequirePermission('view_category')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('subsidiary/:subsidiaryId')
  @RequirePermission('view_category')
  findBySubsidiary(@Param('subsidiaryId') subsidiaryId: string) {
    return this.service.findBySubsidiary(subsidiaryId);
  }

  @Patch(':id')
  @RequirePermission('update_category')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('delete_category')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}