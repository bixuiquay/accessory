// tslint:disable-next-line:ordered-imports
import { merge, omitBy, isUndefined, isNull, isEmpty } from "lodash-es";

/**
 * Check input is string
 *
 * @param  {any} arg    The input
 * @return {boolean}
 */
export const isString = (arg: any): boolean => {
  return typeof arg === 'string';
};

/**
 * Check input is object
 *
 * @param  {any} arg    The input
 * @return {boolean}
 */
export const isObject = (arg: any): boolean => {
  return arg && typeof arg === 'object';
};

/**
 * Santinize object
 *
 * @param  {Object} input   The input
 * @return {Object}         The santinized object
 */
export const santinizeObject = (input: object): object => {
  return omitBy(input, (value) => {
    return isUndefined(value) || isNull(value) || value === '' || (Array.isArray(value) && isEmpty(value));
  });
};

/**
 * Convert from source to dest
 *
 * @param  {TSource} source   The source
 * @param  {TDest} dest       The destination
 * @param  {any} override     The override object value
 * @return {TDest}
 */
export const convert = <TSource, TDest>(source: TSource, dest: TDest | {} = {}, override: any = {}): TDest => {
  return merge({}, dest, source, override) as TDest;
}
