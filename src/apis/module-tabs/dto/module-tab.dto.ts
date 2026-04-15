import { IsString, IsInt, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateModuleTabDto {
    @IsString()
    content_type: string;

    @IsString()
    module_name: string;

    @IsString()
    module_desc: string;

    @IsInt()
    no_input: number;

    @IsOptional()
    @IsArray()
    input_fields?: [];

    @IsOptional()
    @IsArray()
    records?: [];

    @IsString()
    btn_text: string;

    @IsUUID()
    subsidiaryId: string;
}