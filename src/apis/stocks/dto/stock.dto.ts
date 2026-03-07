import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsUUID } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({ example: "HP Laptop 840 G7" })
  @IsString()
  asset_identity: string;

  @ApiProperty({ example: "Laptop purchased for training center" })
  @IsString()
  operational_narrative: string;

  @ApiProperty({ example: 20 })
  @IsInt()
  count: number;

  @ApiProperty({ example: 450000 })
  @IsNumber()
  purchase_value: number;

  @ApiProperty({ example: "Electronics" })
  @IsString()
  category: string;

  @ApiProperty({ example: "units" })
  @IsString()
  unit: string;

  @ApiProperty({ example: "https://example.com/receipt.pdf" })
  @IsString()
  asset_proof: string;

  @ApiProperty({ example: "uuid-of-subsidiary-category" })
  @IsUUID()
  subsidiaryCategoryId: string;
}