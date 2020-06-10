import { randomBytes } from 'crypto';

import { genSalt, hash } from 'bcryptjs';

/**
 * Encrypt password
 *
 * @param  {string} value    The value to hash
 * @return {Promise<{ salt: string, hashedValue: string }>}
 */
export const encrypt = async (value: string): Promise<{ salt: string, hashedValue: string }> => {
  const salt = await genSalt(10);
  const hashedValue = await hash(value, salt);

  return { salt, hashedValue };
};

/**
 * Generate a random string with crypto.
 *
 * @param  {number} length    The random string length
 * @return {string}
 */
export const createRandomString = (length = 8) => {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  // return Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
};