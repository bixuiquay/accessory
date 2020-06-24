import { Injectable } from '@nestjs/common';
import { Cart } from 'src/database/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartCreateRequest } from './cart.dto';
import { constants } from 'buffer';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly repository: Repository<Cart>
  ) {}

  getAll(): Promise<any> {
    return this.repository.createQueryBuilder('cart')
    .getMany();
  }

  // add(cartCreate: CartCreateRequest): Promise<any> {
  //   return this.repository.save(cartCreate);
  // }

  async update(id, entity: Partial<Cart>): Promise<any> {
    const e = await this.repository.findOne({id});
    e.client = entity.client;
    return this.repository.save(e);
  }

  delete(id: number): Promise<any>{
    return this.repository.delete(
      {id}
    );
  }

}
