/**
 * Get current timestamp
 *
 * @return {Date}
 */
export const getCurrentTimestamp = (): Date => {
  return new Date();
}

/**
 * Get current date
 *
 * @return {Date}
 */
export const getCurrentDate = (): Date => {
  const now = getCurrentTimestamp();

  now.setHours(0, 0, 0, 0);

  return now;
}

/**
 * Format date
 *
 * @param  {string | number} value  The time value
 * @param  {string} delimiter       The delimiter
 * @return {string}
 */
export const formatDate = (
  { value, delimiter, compose }:
  { value: string | number, delimiter?: string, compose: Function }
): any => {
  const intValue = parseInt(value.toString(), 10);
  const isNumber = !isNaN(intValue);
  const time = new Date(isNumber ? intValue : value);
  const date = time.getDate(); //Be careful! January is 0 not 1
  const month = time.getMonth(); //Be careful! January is 0 not 1
  const year = time.getFullYear();
  const object = { date, month, year };

  if (delimiter) {
    return [year, month + 1, date].join(delimiter);
  }

  if (compose && typeof compose === 'function') {
    return compose(object);
  }

  return object;
}

/**
 * Check date is equal to today
 *
 * @param  {Date} date
 * @return {Boolean}
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();

  return date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
};

/**
 * Add days
 *
 * @param  {Date} value     The current value
 * @param  {number} days    The days to be added
 * @return {Date}
 */
export const addDays = (value: Date, days: number = 0): Date => {
  const date = new Date(value);
  const calculatedDate = date.setDate(date.getDate() + days);

  return new Date(calculatedDate);
};

/**
 * Subtract days
 *
 * @param  {Date} value     The current value
 * @param  {number} days    The days to be added
 * @return {Date}
 */
export const subtractDays = (value: Date, days: number = 0): Date => {
  const date = new Date(value);
  const calculatedDate = date.setDate(date.getDate() - days);

  return new Date(calculatedDate);
};

/**
 * Start of date
 *
 * @param  {Date} date     The current date
 * @return {Date}
 */
export const startOfDate = (date: Date): Date => {
  return new Date(new Date(date).setHours(0, 0, 0, 0));
};

/**
 * End of date
 *
 * @param  {Date} date     The current date
 * @return {Date}
 */
export const endOfDate = (date: Date): Date => {
  return new Date(new Date(date).setHours(23, 59, 59, 999));
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
 * Check date is in range [from, to]
 *
 * @param  {Date} date
 * @param  {Date} from
 * @param  {Date} to
 * @param  {boolean} andEqual
 * @return {boolean}
 */
export const isInRange = (date: Date, from: Date, to: Date, andEqual = false): boolean => {
  return andEqual
    ? new Date(date) >= new Date(from) && new Date(date) <= new Date(to)
    : new Date(date) > new Date(from) && new Date(date) < new Date(to)
};

/**
 * Get days in month.
 *
 * @param  {Number} year
 * @param  {Number} month
 * @return {number}
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get first date in month.
 *
 * @param  {Number} year
 * @param  {Number} month
 * @return {Date}
 */
export const getFirstDateInMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};

/**
 * Merge date and time.
 *
 * @param  {Date} date     date: Tue Jan 21 2020 15:04:29
 * @param  {String} time   time: '15:30'
 * @return {Date}          output: Tue Jan 21 2020 15:30:00
 */
export const mergeDateAndTime = (date: Date, time: string): Date => {
  if (!date || !time) {
    throw new Error('mergeDateAndTime: Please provide valid data and time');
  }

  const [hour, min] = time.split(':');

  // tslint:disable-next-line:radix
  return new Date(new Date(date).setHours(parseInt(hour), parseInt(min), 0, 0));
};

/**
 * Split date and time.
 *
 * @param  {Date} date     date: Tue Jan 21 2020 15:30:00
 */
export const splitDateAndTime = (date: Date) => {
  if (!date) {
    return;
  }

  const hour = date.getHours();
  const min = date.getMinutes();

  return {
    date: this.startOfDate(date) as string,
    time: `${hour}:${min}`
  }
};
