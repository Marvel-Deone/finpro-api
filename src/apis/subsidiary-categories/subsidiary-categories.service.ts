import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class SubsidiaryCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.subsidiaryCategory.findFirst({
      where: {
        subsidiaryId: dto.subsidiaryId,
        type: dto.type,
      },
    });

    if (existing) {
      throw new ConflictException(
        'This subsidiary already has this category type',
      );
    }

    return this.prisma.subsidiaryCategory.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.subsidiaryCategory.findMany({
      include: {
        subsidiary: true,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.subsidiaryCategory.findUnique({
      where: { id },
      include: {
        subsidiary: true,
        stocks: true,
        loans: true,
        exams: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findBySubsidiary(subsidiaryId: string) {
    return this.prisma.subsidiaryCategory.findMany({
      where: { subsidiaryId },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);

    return this.prisma.subsidiaryCategory.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.subsidiaryCategory.delete({
      where: { id },
    });
  }
}