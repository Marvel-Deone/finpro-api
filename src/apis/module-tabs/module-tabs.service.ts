import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateModuleTabDto } from './dto/module-tab.dto';

@Injectable()
export class ModuleTabsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateModuleTabDto) {
        // Ensure moduleTab exists
        const subsidiary = await this.prisma.subsidiary.findUnique({
            where: { id: dto.subsidiaryId },
        });

        if (!subsidiary) {
            throw new NotFoundException('Subsidiary not found');
        }

        return this.prisma.$transaction(async (prisma) => {
            const module_tab = await prisma.moduleTab.create({
                data: {
                    content_type: dto.content_type,
                    module_name: dto.module_name,
                    module_desc: dto.module_desc,
                    no_input: dto.no_input,
                    input_fields: dto.input_fields ?? [],
                    records: dto.records ?? [],
                    btn_text: dto.btn_text,
                    subsidiaryId: dto.subsidiaryId,
                },
            });

            await prisma.history.create({
                data: {
                    title: 'Module Created',
                    desc: `Module ${module_tab.module_name} created`,
                    action: 'CREATE_MODULE',
                    subsidiaryId: dto.subsidiaryId,
                },
            });

            return module_tab;
        });
    }

    async addRecord(moduleId: string, record: any) {
    const module = await this.prisma.moduleTab.findUnique({
        where: { id: moduleId },
    });

    if (!module) {
        throw new NotFoundException('Module not found');
    }

    const input_fields = module.input_fields as any[];

    // Validate against schema
    this.validateRecord(input_fields, record);

    // Add to existing records
    const existingRecords = (module.records as any[]) || [];

    const updatedRecords = [...existingRecords, record];

    return this.prisma.moduleTab.update({
        where: { id: moduleId },
        data: {
            records: updatedRecords,
        },
    });
}

    async findAll(subsidiaryId?: string) {
        const where = subsidiaryId
            ? { subsidiaryId: subsidiaryId }
            : {};

        return this.prisma.moduleTab.findMany({
            where,
            include: {
                subsidiary: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        const module_tab = await this.prisma.moduleTab.findUnique({
            where: { id },
            include: {
                subsidiary: true,
            },
        });

        if (!module_tab) {
            throw new NotFoundException('Module Tab not found');
        }

        return module_tab;
    }

    validateRecord(input_fields, record) {
        for (const field of input_fields) {
            const value = record[field.key];

            if (value === undefined) continue;

            switch (field.type) {
                case "string":
                    if (typeof value !== "string") throw new Error(`${field.key} must be string`);
                    break;
                case "number":
                    if (typeof value !== "number") throw new Error(`${field.key} must be number`);
                    break;
                case "boolean":
                    if (typeof value !== "boolean") throw new Error(`${field.key} must be boolean`);
                    break;
                case "select":
                    if (!field.options.includes(value)) throw new Error(`${field.key} invalid option`);
                    break;
            }
        }
    }
}
