import { IsNumber, IsString } from 'class-validator'

export class ProductDto {
    id: string | null;

    @IsString()
    name: string;

    @IsNumber()
    price: number;
    description?: string;
}