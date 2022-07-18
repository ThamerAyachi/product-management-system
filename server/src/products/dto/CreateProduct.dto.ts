import { IsNotEmpty, IsNumberString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  description: string;

  @IsNotEmpty()
  @IsNumberString()
  price: string;
}
