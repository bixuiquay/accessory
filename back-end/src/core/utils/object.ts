/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-types */
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

/**
 * Convert value to object class
 *
 * @param  {ClassType<T>} classType     The class type
 * @param  {any} value                  The value
 * @return {T}
 */
export const convert = <T, V>(classType: ClassType<T>, value: any): T => {
  return plainToClass<T, V>(classType, { ...value, id: value['id'] || undefined }) as unknown as T;
};

/**
 * Converts plain (literal) object to class (constructor) object. Also works with arrays.
 *
 * @param  {ClassType<T>} classType     The class type
 * @param  {any} value                  The value
 * @return {T}
 */
export const convertArray = <T, V extends Array<any>>(classType: ClassType<T>, value: any): T[] => {
  return plainToClass<T, V>(classType, value);
};

/**
 * Check string is UUID
 *
 * @param  {string} value     The input
 * @return {boolean}          True if UUID
 */
export const isUUID = (value: string): boolean => {
  return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value);
};

interface PatchOption<T> {
  compose?: Function;
}

/**
 * Patch object
 *
 * @param  {Partial<T>} item:   The update item
 * @param  {T} originalItem     The original item
 * @return {T}
 */
export const patch = <T extends Object>(item: Partial<T>, originalItem: T, { compose }: PatchOption<T> = {} as PatchOption<T>): T => {
  if (item && originalItem) {
    if (compose) {
      return compose(originalItem);
    }
    else {
      Object.keys(item).forEach(key => {
        if (originalItem.hasOwnProperty(key)) {
          originalItem[key] = item[key];
        }
      });
    }
  }

  return originalItem;
};

/**
 * Check is object
 *
 * @param  {any} obj:   The object
 * @return {boolean} true if is object
 */
export const isObject = (obj: any): boolean => {
  return typeof obj === 'object';
};
