import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuth.guard';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':name')
  @UseGuards(JwtAuthGuard)
  async getProductByName(@Param('name') name: string) {
    const product = await this.productsService.findOne({ name });

    if (product) return product;
    else
      throw new BadRequestException(
        `Product with name: "${name}" is not found!`,
      );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProductByName(@Param('id') id: string) {
    const product = await this.productsService.findOne({ id });

    if (!product) {
      throw new BadRequestException(`Product with id: "${id}" is not found!`);
    }

    this.productsService.deleteOne(id);

    return { message: 'Delete success', status: HttpStatus.OK };
  }
}
