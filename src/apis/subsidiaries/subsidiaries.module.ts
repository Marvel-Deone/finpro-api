import { Module } from '@nestjs/common';
import { SubsidiariesService } from './subsidiaries.service';
import { SubsidiariesController } from './subsidiaries.controller';
// import { PrismaModule } from '../prisma/prisma.module';

@Module({
//   imports: [PrismaModule],
  controllers: [SubsidiariesController],
  providers: [SubsidiariesService],
})
export class SubsidiariesModule {}