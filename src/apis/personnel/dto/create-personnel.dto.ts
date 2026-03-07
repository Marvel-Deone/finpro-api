import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreatePersonnelDto {
  @IsString()
  identity: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsUUID()
  roleId: string;
}