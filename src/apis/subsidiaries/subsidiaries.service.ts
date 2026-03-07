import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AssignManagersDto, CreateSubsidiaryDto, UpdateSubsidiaryDto } from './dto/subsidiary.dto';
import { CategoryType } from '@prisma/client';

@Injectable()
export class SubsidiariesService {
  constructor(private prisma: PrismaService) { }

  // async create(dto: CreateSubsidiaryDto) {
  //   const existing = await this.prisma.subsidiary.findUnique({
  //     where: { name: dto.name },
  //   });

  //   if (existing) {
  //     throw new ConflictException('Subsidiary already exists');
  //   }

  //   return this.prisma.subsidiary.create({
  //     data: { name: dto.name, description: dto.description, industrial_sector: dto.industrial_sector },
  //   });
  // }

  async create(dto: CreateSubsidiaryDto) {
    const existing = await this.prisma.subsidiary.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Subsidiary already exists');
    }

    return this.prisma.subsidiary.create({
      data: {
        ...dto,

        categories: {
          create: [
            { type: CategoryType.business },
            { type: CategoryType.personal },
          ],
        },
      },
      include: {
        categories: true,
      },
    });
  }

  // async findAll() {
  //   return this.prisma.subsidiary.findMany({
  //     include: {
  //       categories: true,
  //       managers: {
  //         include: {
  //           personnel: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // async findAll(user: any) {
  //   if (user.role === 'Admin' || user.role === 'CEO' || user.role === 'SUPERADMIN') {
  //     const subsidiaries = await this.prisma.subsidiary.findMany({
  //       include: {
  //         categories: true,
  //       },
  //     });
  //     return subsidiaries.map((sub) => {
  //       const business = sub.categories.find(c => c.type === 'business');
  //       const personal = sub.categories.find(c => c.type === 'personal');

  //       return {
  //         ...sub,
  //         categories: {
  //           business,
  //           personal,
  //         },
  //       };
  //     });
  //     // return this.prisma.subsidiary.findMany({
  //     //   include: {
  //     //     managers: {
  //     //       include: {
  //     //         personnel: true,
  //     //       },
  //     //     },
  //     //   },
  //     // });
  //   }

  //   // Managers see only subsidiaries they manage
  //   const subsidiaries = await this.prisma.subsidiary.findMany({
  //     where: {
  //       managers: {
  //         some: {
  //           personnelId: user.personnelId,
  //         },
  //       },
  //     },
  //     include: {
  //       categories: true,
  //       managers: {
  //         include: {
  //           personnel: true,
  //         },
  //       },
  //     },
  //   });
  //   return subsidiaries.map((sub) => {
  //     const business = sub.categories.find(c => c.type === 'business');
  //     const personal = sub.categories.find(c => c.type === 'personal');

  //     return {
  //       ...sub,
  //       categories: {
  //         business,
  //         personal,
  //       },
  //     };
  //   });
  // }

  async findAll(user: any) {

  const whereCondition =
    user.role === 'Admin' || user.role === 'CEO' || user.role === 'SUPERADMIN'
      ? {}
      : {
          managers: {
            some: {
              personnelId: user.personnelId,
            },
          },
        };

  const subsidiaries = await this.prisma.subsidiary.findMany({
    where: whereCondition,
    include: {
      categories: true,
      managers: {
        include: {
          personnel: true,
        },
      },
    },
  });

  return subsidiaries.map((sub) => {

    const categoryMap = sub.categories.reduce((acc, c) => {
      acc[c.type.toLowerCase()] = c;
      return acc;
    }, {} as any);

    return {
      ...sub,
      categories: {
        business: categoryMap.business || null,
        personal: categoryMap.personal || null,
      },
    };
  });
}

  async findOne(id: string) {
    const subsidiary = await this.prisma.subsidiary.findUnique({
      where: { id },
      include: {
        categories: true,
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

  //   async findOne(id: string, user: any) {

  //   const subsidiary = await this.prisma.subsidiary.findUnique({
  //     where: { id },
  //     include: {
  //       managers: {
  //         include: { personnel: true },
  //       },
  //     },
  //   });

  //   if (!subsidiary) {
  //     throw new NotFoundException('Subsidiary not found');
  //   }

  //   if (user.role !== 'Admin') {
  //     const isManager = subsidiary.managers.some(
  //       (m) => m.personnelId === user.personnelId,
  //     );

  //     if (!isManager) {
  //       throw new NotFoundException('Subsidiary not found');
  //     }
  //   }

  //   return subsidiary;
  // }

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