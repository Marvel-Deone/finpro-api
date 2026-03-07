import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateLoanDto } from './dto/loan.dto';

@Injectable()
export class LoansService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateLoanDto) {
        const category = await this.prisma.subsidiaryCategory.findUnique({
            where: { id: dto.subsidiaryCategoryId },
        });

        if (!category) {
            throw new NotFoundException('Subsidiary category not found');
        }

        const loan = await this.prisma.loan.create({
            data: dto,
        });

        // Log history
        await this.prisma.history.create({
            data: {
                title: 'Loan Created',
                desc: `Loan ${loan.ledger_identity} recorded`,
                action: 'CREATE_LOAN',
                subsidiaryCategoryId: dto.subsidiaryCategoryId,
            },
        });

        return loan;
    }

    async findAll(categoryId?: string) {
        const where = categoryId ? { subsidiaryCategoryId: categoryId } : {};

        return this.prisma.loan.findMany({
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
        const loan = await this.prisma.loan.findUnique({
            where: { id },
            include: {
                subsidiaryCategory: {
                    include: {
                        subsidiary: true,
                    },
                },
            },
        });

        if (!loan) {
            throw new NotFoundException('Loan record not found');
        }

        return loan;
    }
}