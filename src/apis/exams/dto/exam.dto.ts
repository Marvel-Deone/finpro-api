import { IsString, IsInt, IsUUID } from 'class-validator';

export class CreateExamDto {
  @IsString()
  session_name: string;

  @IsInt()
  total_candidates: number;

  @IsString()
  document_proof: string;

  @IsString()
  category: string;

  @IsUUID()
  subsidiaryCategoryId: string;
}