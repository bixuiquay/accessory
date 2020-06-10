import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { patch } from '../utils';

export interface PatchOption<T> {
  originalItem?: T;
  compose: Function;
}

@Injectable()
export class BaseService<T> {
  constructor(
    private readonly repository: Repository<T>
  ) { }

  /**
   * Patch object
   *
   * @param  {Partial<T>} item:            The update item
   * @param  {T} originalItem     The original item
   * @return {Promise<any>}
   */
  async patch(item: Partial<T>, { originalItem, compose }: PatchOption<T> = {} as PatchOption<T>): Promise<any> {
    let entity: T;

    if (item) {
      const id: string = item['id'];

      entity = originalItem || await this.repository.findOne(id);

      return patch(item, entity, { compose });
    }

    return entity;
  }
}