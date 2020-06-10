import { Injectable } from '@nestjs/common';
import { ProductResponse } from './product.dto';
import { BaseConverter } from 'src/core/services';
import { Product } from 'src/database/entities/product.entity';

@Injectable()
export class ProductConverter extends BaseConverter<ProductResponse, Product> { }