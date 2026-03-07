import { IsEnum, IsUUID, IsOptional, IsString, IsInt } from 'class-validator';
import { CategoryType } from '@prisma/client';

export class CreateCategoryDto {
  @IsEnum(CategoryType)
  type: CategoryType;

  @IsUUID()
  subsidiaryId: string;

  @IsOptional()
  @IsString()
  seat_throughput?: string;

  @IsOptional()
  @IsString()
  project_inflow?: string;

  @IsOptional()
  @IsString()
  inventory?: string;

  @IsOptional()
  @IsString()
  monthly_dept?: string;

  @IsOptional()
  @IsString()
  net_capital?: string;

  @IsOptional()
  @IsString()
  compliance_audit?: string;

  @IsOptional()
  @IsInt()
  asset?: number;
}


export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  seat_throughput?: string;

  @IsOptional()
  @IsString()
  project_inflow?: string;

  @IsOptional()
  @IsString()
  inventory?: string;

  @IsOptional()
  @IsString()
  monthly_dept?: string;

  @IsOptional()
  @IsString()
  net_capital?: string;

  @IsOptional()
  @IsString()
  compliance_audit?: string;

  @IsOptional()
  @IsInt()
  asset?: number;
}