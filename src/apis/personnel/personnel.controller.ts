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
import { PersonnelService } from './personnel.service';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { PermissionsGuard } from '../common/guards/permissions.guard';
// import { RequirePermission } from '../common/decorators/require-permission.decorator';

@Controller('personnel')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Post()
  @RequirePermission('create_personnel')
  create(@Body() dto: CreatePersonnelDto) {
    return this.personnelService.create(dto);
  }

  @Get()
  @RequirePermission('view_personnel')
  findAll() {
    return this.personnelService.findAll();
  }

  @Get(':id')
  @RequirePermission('view_personnel')
  findOne(@Param('id') id: string) {
    return this.personnelService.findOne(id);
  }

  @Patch(':id')
  @RequirePermission('update_personnel')
  update(@Param('id') id: string, @Body() dto: UpdatePersonnelDto) {
    return this.personnelService.update(id, dto);
  }

  @Delete(':id')
  @RequirePermission('delete_personnel')
  remove(@Param('id') id: string) {
    return this.personnelService.remove(id);
  }
}