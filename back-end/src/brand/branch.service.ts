import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandCreateRequest, BrandResponse } from './branch.dto';
import { Brand } from 'src/database/entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly repository: Repository<Brand>
  ) {}

  getAll(): Promise<any> {
    return this.repository.find();
  }

  add(categoryCreate: BrandCreateRequest): Promise<any> {
    return this.repository.save(categoryCreate);
  }

  async update(id: number, createBrand: BrandCreateRequest): Promise<any> {
    const e = await this.repository.findOne({id});

    const saveEntity = {...e,
      name: createBrand.name,
    };

    return await this.repository.save(saveEntity);
  }

  delete(id: number): Promise<any>{
    return this.repository.delete(
      {id}
    );
  }

}
