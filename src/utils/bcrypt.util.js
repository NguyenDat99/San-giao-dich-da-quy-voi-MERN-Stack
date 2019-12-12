import bcrypt from 'bcrypt'

import { SALT_WORK_FACTOR } from '../config/general.config';

/**
 *
 * @param {String} text
 * @return {String} hash
 */
export const HashText = async (text) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(text, salt);
  return hash;
};

/**
 *
 * @param {String} text
 * @param {String} hash
 * @return {Boolean} true or false
 */
export const CompareTextAndHash = async (text, hash) => {
  const isMatch = await bcrypt.compare(text, hash);
  return isMatch;
};
