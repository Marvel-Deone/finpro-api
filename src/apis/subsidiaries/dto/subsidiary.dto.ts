import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubsidiaryDto {
  @IsString()
  name: string;
  description: string;
  industrial_sector: string;
}


export class UpdateSubsidiaryDto {
  name?: string
  description?: string
  industrial_sector?: string

  categories?: {
    business?: {
      seat_throughput?: string
      project_inflow?: string
      inventory?: string
      monthly_dept?: string
      net_capital?: string
    }
  }
}

// export class UpdateSubsidiaryDto {
//   @IsOptional()
//   @IsString()
//   name?: string;
//   description: string;
//   industrial_sector: string;
// }


export class AssignManagersDto {
  @IsArray()
  @IsUUID('all', { each: true })
  personnelIds: string[];
}