import { Injectable } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ){}

  public getAll() {
    return this.productRepository.find();
  }
}
