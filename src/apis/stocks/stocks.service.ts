import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateStockDto } from './dto/stock.dto';

@Injectable()
export class StocksService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateStockDto) {
        const category = await this.prisma.subsidiaryCategory.findUnique({
            where: { id: dto.subsidiaryCategoryId },
        });

        if (!category) {
            throw new NotFoundException('Subsidiary category not found');
        }

        const stock = await this.prisma.stock.create({
            data: {
                asset_identity: dto.asset_identity,
                operational_narrative: dto.operational_narrative,
                count: Number(dto.count),
                purchase_value: Number(dto.purchase_value),
                category: dto.category ?? '',
                unit: dto.unit ?? '',
                asset_proof: dto.asset_proof ?? "",
                subsidiaryCategoryId: dto.subsidiaryCategoryId,
            },
        });

        // log history
        await this.prisma.history.create({
            data: {
                title: 'Stock Created',
                desc: `Asset ${stock.asset_identity} recorded`,
                action: 'CREATE_STOCK',
                subsidiaryCategoryId: dto.subsidiaryCategoryId,
            },
        });

        return stock;
    }

    //   async findAll() {
    //     return this.prisma.stock.findMany({
    //       include: {
    //         subsidiaryCategory: {
    //           include: {
    //             subsidiary: true,
    //           },
    //         },
    //       },
    //       orderBy: {
    //         createdAt: 'desc',
    //       },
    //     });
    //   }

    async findAll(categoryId?: string) {
        const where = categoryId
            ? { subsidiaryCategoryId: categoryId }
            : {};

        return this.prisma.stock.findMany({
            where,
            include: {
                subsidiaryCategory: {
                    include: {
                        subsidiary: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        const stock = await this.prisma.stock.findUnique({
            where: { id },
            include: {
                subsidiaryCategory: {
                    include: {
                        subsidiary: true,
                    },
                },
            },
        });

        if (!stock) {
            throw new NotFoundException('Stock record not found');
        }

        return stock;
    }
}