import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateEventDto } from "./dto/event.dto";

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateEventDto) {
        // Ensure category exists
        const category = await this.prisma.subsidiaryCategory.findUnique({
            where: { id: dto.subsidiaryCategoryId },
        });

        if (!category) {
            throw new NotFoundException('Subsidiary category not found');
        }

        return this.prisma.$transaction(async (prisma) => {
            const event = await this.prisma.event.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    event_datetime: new Date(dto.event_datetime),
                    location_type: dto.location_type,
                    address: dto.address,
                    google_meet_link: dto.google_meet_link,
                    subsidiaryCategoryId: dto.subsidiaryCategoryId,
                },
            });

            // Log history
            await this.prisma.history.create({
                data: {
                    title: 'Event Created',
                    desc: `Event "${event.title}" scheduled`,
                    action: 'CREATE_EVENT',
                    subsidiaryCategoryId: dto.subsidiaryCategoryId,
                },
            });

            return event;
        });

    }

    async findAll(categoryId?: string) {
        const where = categoryId
            ? { subsidiaryCategoryId: categoryId }
            : {};

        return this.prisma.event.findMany({
            where,
            include: {
                subsidiaryCategory: {
                    include: {
                        subsidiary: true,
                    },
                },
            },
            orderBy: {
                event_datetime: 'asc',
            },
        });
    }

    async findOne(id: string) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                subsidiaryCategory: {
                    include: {
                        subsidiary: true,
                    },
                },
            },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        return event;
    }

    async update(id: string, dto: CreateEventDto) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        const updated = await this.prisma.event.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                event_datetime: new Date(dto.event_datetime),
                location_type: dto.location_type,
                address: dto.address,
                google_meet_link: dto.google_meet_link,
            },
        });

        await this.prisma.history.create({
            data: {
                title: 'Event Updated',
                desc: `Event "${updated.title}" updated`,
                action: 'UPDATE_EVENT',
                subsidiaryCategoryId: event.subsidiaryCategoryId,
            },
        });

        return updated;
    }

    async remove(id: string) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });

        if (!event) {
            throw new NotFoundException('Event not found');
        }

        await this.prisma.event.delete({
            where: { id },
        });

        await this.prisma.history.create({
            data: {
                title: 'Event Deleted',
                desc: `Event "${event.title}" deleted`,
                action: 'DELETE_EVENT',
                subsidiaryCategoryId: event.subsidiaryCategoryId,
            },
        });

        return { message: 'Event deleted successfully' };
    }
}