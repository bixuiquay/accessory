/**
 * Get start of day
 *
 * @param  {string | Date} value    The value to be parsed
 * @return {Date}
 */
export const startOfDay = (value: string | Date): Date => {
  return new Date(new Date(value).setHours(0, 0, 0, 0));
};

/**
 * Get end of day
 *
 * @param  {string | Date} value    The value to be parsed
 * @return {Date}
 */
export const endOfDay = (value: string | Date): Date => {
  return new Date(new Date(value).setHours(23, 59, 59, 999));
};

/**
 * Check date is before another date
 *
 * @param  {Date} date
 * @param  {Date} anotherDate
 * @return {boolean}
 */
export const isBefore = (date: Date, another: Date, andEqual = false): boolean => {
  return andEqual
    ? new Date(date) <= new Date(another)
    : new Date(date) < new Date(another);
};

/**
 * Check date is after another date
 *
 * @param  {Date} date
 * @param  {Date} anotherDate
 * @return {boolean}
 */
export const isAfter = (date: Date, another: Date, andEqual = false): boolean => {
  return andEqual
    ? new Date(date) >= new Date(another)
    : new Date(date) > new Date(another);
};

/**
 * Add number days to date
 * @function addDays
 * @param  {type} date: Date   {description}
 * @param  {type} days: number {description}
 * @return {type} {description}
 */
export const addDays = (date: Date, days: number): Date =>{
  return new Date (date.getTime() + (days*60*60*24*1000));
}

/**
 * Get current date string
 * @param  {string} delimiter     The delimiter
 * @return {string}
 */
export const getCurrentDate = (delimiter = '/'): string => {
  return new Date().toJSON().slice(0, 10).replace(/-/g, delimiter);
};

/**
 * Get date string format dd/mm/yyyy
 * @param  {string} delimiter     The delimiter
 * @return {string}
 */
export const convertDateToString = (date: Date, delimiter = '/'): string => {
  const parseDate = new Date(date);

  const dd = parseDate.getDate();
  const mm = parseDate.getMonth() + 1;
  const yyyy = parseDate.getFullYear();

  return `${dd < 10 ? `0${dd}` : dd}${delimiter}${mm < 10 ? '0' + mm : mm}${delimiter}${yyyy}`;
};
