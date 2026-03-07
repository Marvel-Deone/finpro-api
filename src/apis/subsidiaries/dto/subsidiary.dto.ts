import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubsidiaryDto {
  @IsString()
  name: string;
  description: string;
  industrial_sector: string;
}


export class UpdateSubsidiaryDto {
  @IsOptional()
  @IsString()
  name?: string;
  description: string;
  industrial_sector: string;
}


export class AssignManagersDto {
  @IsArray()
  @IsUUID('all', { each: true })
  personnelIds: string[];
}