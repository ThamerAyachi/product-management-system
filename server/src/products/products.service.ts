import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products as ProductEntity } from 'src/typeorm/Products';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productsRepository.create(createProductDto);

    return await this.productsRepository.save(newProduct);
  }

  async getAllProducts() {
    return await this.productsRepository.find();
  }

  async findOne(condition: any) {
    const product = this.productsRepository.findOneBy(condition);

    return product;
  }

  async deleteOne(condition: any) {
    return this.productsRepository.delete(condition);
  }
}
