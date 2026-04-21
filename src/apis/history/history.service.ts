import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class HistoryService {
    constructor(private prisma: PrismaService) { }

    async findAll(categoryId?: string) {
        const where = categoryId
            ? { subsidiaryCategoryId: categoryId }
            : {};

        return this.prisma.history.findMany({
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
}
