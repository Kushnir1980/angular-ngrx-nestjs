import { IsNumber, IsString, IsOptional } from 'class-validator'

export class ProductDto {
    @IsOptional()
    id: string | null;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;
}