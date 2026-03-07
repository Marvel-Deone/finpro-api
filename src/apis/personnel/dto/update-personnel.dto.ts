import { IsOptional, IsString, MinLength, IsUUID } from 'class-validator';

export class UpdatePersonnelDto {
  @IsOptional()
  @IsString()
  identity?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsUUID()
  roleId?: string;
}