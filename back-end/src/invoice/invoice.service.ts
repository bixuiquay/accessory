import { Injectable } from '@nestjs/common';
import { Invoice, StatusPayment, StatusShip } from 'src/database/entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceCreateRequest, InvoicePaginatedRequest } from './invoice.dto';
import { sumBy } from 'lodash';
import { constants } from 'buffer';
import { ContextService } from 'src/core/services';
import { Client } from 'src/database/entities/client.entity';
import { Product } from 'src/database/entities/product.entity';
import { ProductInvoice } from 'src/database/entities/product-invoice.entity';
import { time } from 'console';
import { SortDir } from 'src/core/models/base.dto';
import { Z_FILTERED } from 'zlib';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductInvoice)
    private readonly productInvoiceRepository: Repository<ProductInvoice>,
    private readonly contextService: ContextService,
  ) {}

  async getAllByClient(filter: InvoicePaginatedRequest): Promise<any> {
    const { userId } = this.contextService.user;
    const {
      sortBy, sortDir
    } = filter;
    let {page, limit} = filter
    const queryBuilder = this.repository.createQueryBuilder('invoice');
    queryBuilder.leftJoinAndSelect('invoice.client', 'client');
    queryBuilder.where('invoice.client.id =:clientId', {clientId: userId})
    /* Order and sort by */
    if (sortBy && sortDir) {
      sortDir.toUpperCase() === 'DESC'
        ? queryBuilder.orderBy(`invoice.${sortBy}`, SortDir.DESC)
        : queryBuilder.orderBy(`invoice.${sortBy}`, SortDir.ASC);
    }

    if (!page || !limit) {
      page = 1;
      limit = 10;
    }

    // Paginate if have page and limit params.
    const entities = await paginate<Invoice>(queryBuilder, {
      page,
      limit
    });
    return entities;
  }

  async add(invoiceCreate: InvoiceCreateRequest): Promise<any> {
    const { userId } = this.contextService.user;
    const productBuilder = this.productRepository.createQueryBuilder('product');
    productBuilder.whereInIds(invoiceCreate.products.map( x => x.id));
    const products = await productBuilder.getMany();
    const sum = sumBy(products, (product) => {
      const productInvoice = invoiceCreate.products.find( x => x.id == product.id);
      return Number(product.price) * productInvoice.quantity;
    });

    const entity = {
      address: invoiceCreate.address,
      city: invoiceCreate.city,
      client: new Client({id: userId}),
      email: invoiceCreate.email,
      firstName: invoiceCreate.firstName,
      lastName: invoiceCreate.lastName,
      payment: sum,
      phone: invoiceCreate.phone,
      statusPayment: StatusPayment.New,
      statusShip: StatusShip.New,
      note: invoiceCreate.note
    }
    const invoiceCreated = await this.repository.save(entity);

    for (const item  of invoiceCreate.products) {
      await this.productInvoiceRepository.save({
        product: new Product({id: item.id}),
        quantity: item.quantity,
        invoice: new Invoice({id: invoiceCreated.id})
      });
    }

    return {
      success: true,
      message: 'Dat hang thanh cong'
    };
  }

  async update(id, entity: Partial<Invoice>): Promise<any> {
    // const e = await this.repository.findOne({id});
    // e.shortName = entity.shortName;
    // e.name = entity.name;
    // return this.repository.save(e);

    return null;
  }

  delete(id: number): Promise<any>{
    // return this.repository.delete(
    //   {id}
    // );
    return null;
  }

}
