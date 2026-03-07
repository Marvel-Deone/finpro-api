import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({ example: "LN-2026-0001" })
  @IsString()
  ledger_identity: string;

  @ApiProperty({ example: "Loan issued to SME client for equipment purchase" })
  @IsString()
  operational_narrative: string;

  @ApiProperty({ example: 1500000 })
  @IsNumber()
  principal: number;

  @ApiProperty({ example: "SME Loan" })
  @IsString()
  category: string;

  @ApiProperty({ example: "12 months" })
  @IsString()
  term: string;

  @ApiProperty({ example: "https://example.com/loan-agreement.pdf" })
  @IsString()
  liability_proof: string;

  @ApiProperty({ example: "uuid-of-subsidiary-category" })
  @IsUUID()
  subsidiaryCategoryId: string;
}