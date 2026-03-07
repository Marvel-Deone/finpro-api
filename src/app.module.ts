import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { PersonnelModule } from './apis/personnel/personnel.module';
import { RolesModule } from './apis/roles/roles.module';
import { PermissionsModule } from './apis/permissions/permissions.module';
import { SubsidiariesController } from './apis/subsidiaries/subsidiaries.controller';
import { SubsidiariesModule } from './apis/subsidiaries/subsidiaries.module';
import { SubsidiaryCategoriesModule } from './apis/subsidiary-categories/subsidiary-categories.module';
import { ExamsModule } from './apis/exams/exams.module';
import { StocksModule } from './apis/stocks/stocks.module';
import { LoansModule } from './apis/loans/loans.module';
import { HistoryModule } from './apis/history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    PersonnelModule,
    RolesModule,
    PermissionsModule,
    SubsidiariesModule,
    SubsidiaryCategoriesModule,
    ExamsModule,
    StocksModule,
    LoansModule,
    HistoryModule,
  ],
  // controllers: [SubsidiariesController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
