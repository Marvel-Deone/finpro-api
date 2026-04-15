import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class SubsidiaryCategoriesService {
  constructor(private prisma: PrismaService) { }

  async getBusinessOverviewTotals() {
    const result = await this.prisma.$queryRawUnsafe<any[]>(`
    SELECT
      SUM(CAST(seat_throughput AS INTEGER)) AS seat_throughput,
      SUM(CAST(project_inflow AS DOUBLE PRECISION)) AS project_inflow,
      SUM(CAST(inventory AS DOUBLE PRECISION)) AS inventory,
      SUM(CAST(monthly_dept AS DOUBLE PRECISION)) AS monthly_dept,
      SUM(CAST(net_capital AS DOUBLE PRECISION)) AS net_capital,
      SUM(CAST(compliance_audit AS INTEGER)) AS compliance_audit,
      SUM(asset) AS asset
    FROM "SubsidiaryCategory"
    WHERE type = 'business'
  `);

    const row = result[0];

    return {
      seat_throughput: Number(row?.seat_throughput || 0),
      project_inflow: Number(row?.project_inflow || 0),
      inventory: Number(row?.inventory || 0),
      monthly_dept: Number(row?.monthly_dept || 0),
      net_capital: Number(row?.net_capital || 0),
      compliance_audit: Number(row?.compliance_audit || 0),
      asset: Number(row?.asset || 0),
    };
  }

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