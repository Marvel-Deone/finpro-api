import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PersonnelService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreatePersonnelDto) {
        if (!dto.identity) {
            throw new BadRequestException('Identity is required')
        }

        const existing = await this.prisma.personnel.findUnique({
            where: { identity: dto.identity },
        })

        if (existing) {
            throw new ConflictException('Personnel already exists')
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.prisma.personnel.create({
            data: {
                identity: dto.identity,
                password: hashedPassword,
                roleId: dto.roleId,
            },
            include: {
                role: true,
            },
        });
    }

    async findAll() {
        return this.prisma.personnel.findMany({
            include: {
                role: true,
            },
        });
    }

    async findOne(id: string) {
        const personnel = await this.prisma.personnel.findUnique({
            where: { id },
            include: { role: true },
        });

        if (!personnel) {
            throw new NotFoundException('Personnel not found');
        }

        return personnel;
    }

    async update(id: string, dto: UpdatePersonnelDto) {
        await this.findOne(id);

        let data: any = { ...dto };

        if (dto.password) {
            data.password = await bcrypt.hash(dto.password, 10);
        }

        return this.prisma.personnel.update({
            where: { id },
            data,
            include: { role: true },
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.personnel.delete({
            where: { id },
        });
    }
}