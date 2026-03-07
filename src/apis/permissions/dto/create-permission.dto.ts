import { IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;
}


export class UpdatePermissionDto {
  @IsOptional()
  @IsString()
  name?: string;
}