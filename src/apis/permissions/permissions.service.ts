import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/create-permission.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePermissionDto) {
    const existing = await this.prisma.permission.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Permission already exists');
    }

    return this.prisma.permission.create({
      data: { name: dto.name },
    });
  }

  async findAll() {
    return this.prisma.permission.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async update(id: string, dto: UpdatePermissionDto) {
    await this.findOne(id);

    return this.prisma.permission.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    // Prevent deleting permission if attached to roles
    const attached = await this.prisma.rolePermission.findFirst({
      where: { permissionId: id },
    });

    if (attached) {
      throw new BadRequestException(
        'Cannot delete permission assigned to roles',
      );
    }

    return this.prisma.permission.delete({
      where: { id },
    });
  }
}