import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateExamDto } from './dto/exam.dto';

@Injectable()
export class ExamsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateExamDto) {
        // Ensure category exists
        const category = await this.prisma.subsidiaryCategory.findUnique({
            where: { id: dto.subsidiaryCategoryId },
        });

        if (!category) {
            throw new NotFoundException('Subsidiary category not found');
        }

        const exam = await this.prisma.exam.create({
            data: {
                session_name: dto.session_name,
                total_candidates: dto.total_candidates,
                document_proof: dto.document_proof,
                category: dto.category ?? 'JAMB',
                subsidiaryCategoryId: dto.subsidiaryCategoryId,
            },
        });

        // Log history
        await this.prisma.history.create({
            data: {
                title: 'Exam Created',
                desc: `Exam session ${exam.session_name} created`,
                action: 'CREATE_EXAM',
                subsidiaryCategoryId: dto.subsidiaryCategoryId,
            },
        });

        return exam;
    }

    async findAll(categoryId?: string) {
        const where = categoryId
            ? { subsidiaryCategoryId: categoryId }
            : {};

        return this.prisma.exam.findMany({
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
        const exam = await this.prisma.exam.findUnique({
            where: { id },
            include: {
                subsidiaryCategory: {
                    include: {
                        subsidiary: true,
                    },
                },
            },
        });

        if (!exam) {
            throw new NotFoundException('Exam not found');
        }

        return exam;
    }
}