import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AssignManagersDto, CreateSubsidiaryDto, UpdateSubsidiaryDto } from './dto/subsidiary.dto';

@Injectable()
export class SubsidiariesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubsidiaryDto) {
    const existing = await this.prisma.subsidiary.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Subsidiary already exists');
    }

    return this.prisma.subsidiary.create({
      data: { name: dto.name, description: dto.description, industrial_sector: dto.industrial_sector },
    });
  }

  async findAll() {
    return this.prisma.subsidiary.findMany({
      include: {
        managers: {
          include: {
            personnel: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const subsidiary = await this.prisma.subsidiary.findUnique({
      where: { id },
      include: {
        managers: {
          include: { personnel: true },
        },
      },
    });

    if (!subsidiary) {
      throw new NotFoundException('Subsidiary not found');
    }

    return subsidiary;
  }

  async update(id: string, dto: UpdateSubsidiaryDto) {
    await this.findOne(id);

    return this.prisma.subsidiary.update({
      where: { id },
      data: dto,
    });
  }

  async assignManagers(id: string, dto: AssignManagersDto) {
    await this.findOne(id);

    // Remove existing assignments
    await this.prisma.personnelSubsidiary.deleteMany({
      where: { subsidiaryId: id },
    });

    return this.prisma.subsidiary.update({
      where: { id },
      data: {
        managers: {
          create: dto.personnelIds.map((personnelId) => ({
            personnel: {
              connect: { id: personnelId },
            },
          })),
        },
      },
      include: {
        managers: {
          include: { personnel: true },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.subsidiary.delete({
      where: { id },
    });
  }
}