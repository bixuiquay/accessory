import { Injectable } from '@nestjs/common';
import { Product } from 'src/database/entities/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateRequest, ProductResponse, ProductPaginatedRequest } from './product.dto';
import { ChildCategory } from 'src/database/entities/child-category.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Brand } from 'src/database/entities/brand.entity';
import { ProductConverter } from './product.converter';
import { SortDir } from 'src/core/models';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly convert: ProductConverter
  ){}

  async getAll(filter: ProductPaginatedRequest): Promise<any> {
    const data = await this.paginateAndFilter(filter);
    const imageHost = process.env.IMAGE_HOST;
    data['items'] = data.items.map(x => {
      return {...x, image: `${imageHost}/${x.image}`, listImage: x.listImage.map(x => `${imageHost}/${x}`)};
    });
    return data;
  }

  private async paginateAndFilter(filter: ProductPaginatedRequest): Promise<any> {
    const {
      childCategoryId,
      brandId,
      sortBy,
      sortDir,
      searchKeyword
    } = filter;
    let { page, limit } = filter;

    const queryBuilder = this.productRepository.createQueryBuilder(
      'product'
    ).leftJoinAndSelect("product.brand", "brand")
    .leftJoinAndSelect("product.category", "category")
    .where('product.id is not null');

    if (childCategoryId) {
      queryBuilder.andWhere('product.category.id = :categoryId', {categoryId: childCategoryId});
    }

    if (brandId) {
      queryBuilder.andWhere('product.brand.id = :brandId', {brandId});
    }

    if (searchKeyword) {
      queryBuilder.andWhere('LOWER(product.name) like :search or LOWER(product.description) like :search', {search: `%${searchKeyword.trim().toLowerCase()}%`})
    }

    /* Order and sort by */
    if (sortBy && sortDir) {
      sortDir.toUpperCase() === 'DESC'
        ? queryBuilder.orderBy(`product.${sortBy}`, SortDir.DESC)
        : queryBuilder.orderBy(`product.${sortBy}`, SortDir.ASC);
    }

    if (!page || !limit) {
      page = 1;
      limit = 10;
    }

    // Paginate if have page and limit params.
    const entities = await paginate<Product>(queryBuilder, {
      page,
      limit
    });

    return entities
  }

  async addProduct(createProduct: ProductCreateRequest): Promise<ProductResponse> {
    const saveEntity = {
      name: createProduct.name,
      description: createProduct.description,
      image: createProduct.image,
      price: createProduct.price,
      listImage: createProduct.listImage,
      quantity: createProduct.quantity,
      category: new ChildCategory({id: createProduct.categoryId}),
      brand: new Brand({id: createProduct.brandId})
    };

    const save = await this.productRepository.save(saveEntity);
    return this.convert.toDTO(save)
  }
}
