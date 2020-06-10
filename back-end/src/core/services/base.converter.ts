import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { patch } from '../utils';

@Injectable()
export class BaseConverter<TDto, TEntity> {
  dtoType: (new () => TDto);
  entityType: (new () => TEntity);

  /**
   * Convert from DTO to Entity
   *
   * @param  {TDto} dto             The TDto info
   * @param  {Function} composer    The composer
   * @return {TEntity}              The TEntity info
   */
  fromDTO(dto: Partial<TDto>, composer?: Function): TEntity {
    const composedValue = composer ? composer(dto) : {};

    return plainToClass(this.entityType, { ...dto, id: dto['id'] || undefined, ...composedValue });
  }

  /**
   * Convert from DTO to Entity
   *
   * @param  {TDto} dtos            The TDto info
   * @param  {Function} composer    The composer
   * @return {TEntity}              The TEntity info
   */
  fromDTOs(dtos: Partial<TDto>[], composer?: Function): TEntity[] {
    return dtos.map(dto => this.fromDTO(dto, composer));
  }

  /**
   * Convert from Entity to DTO
   *
   * @param  {TEntity} entity       The TEntity info
   * @param  {Function} composer    The composer
   * @return {TDto}                 The TDto info
   */
  toDTO(entity: TEntity, composer?: (entity: TEntity) => Partial<TDto>): TDto {
    const composedValue = composer ? composer(entity) : {};

    patch(composedValue, entity);

    return plainToClass(this.dtoType, entity);
  }

  /**
   * Convert from Entities to DTOs
   *
   * @param  {TEntity} entities     The TEntity info
   * @param  {Function} composer    The composer
   * @return {TDto}                 The TDto info
   */
  toDTOs(entities: TEntity[], composer?: (entity: TEntity) => Partial<TDto>): TDto[] {
    return entities.map(entity => this.toDTO(entity, composer));
  }
}