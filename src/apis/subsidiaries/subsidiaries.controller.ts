import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SubsidiariesService } from './subsidiaries.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { AssignManagersDto, CreateSubsidiaryDto, UpdateSubsidiaryDto } from './dto/subsidiary.dto';

@Controller('subsidiary')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SubsidiariesController {
  constructor(private readonly subsidiariesService: SubsidiariesService) {}

  @Post()
  @RequirePermission('create_subsidiary')
  create(@Body() dto: CreateSubsidiaryDto) {
    return this.subsidiariesService.create(dto);
  }

  @Get()
  @RequirePermission('view_subsidiary')
  findAll(@Req() req) {
    return this.subsidiariesService.findAll(req.user);
  }

  @Get(':id')
  @RequirePermission('view_subsidiary')
  findOne(@Param('id') id: string) {
    return this.subsidiariesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermission('update_subsidiary')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSubsidiaryDto,
  ) {
    return this.subsidiariesService.update(id, dto);
  }

  @Patch(':id/managers')
  @RequirePermission('assign_subsidiary_manager')
  assignManagers(
    @Param('id') id: string,
    @Body() dto: AssignManagersDto,
  ) {
    return this.subsidiariesService.assignManagers(id, dto);
  }

  @Delete(':id')
  @RequirePermission('delete_subsidiary')
  remove(@Param('id') id: string) {
    return this.subsidiariesService.remove(id);
  }
}