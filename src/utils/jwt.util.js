import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_OPTIONS } from '../config/general.config';

/**
 *
 * @param {Object} payload
 * @return {String} token
 */
export const GenerateToken = payload => jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);

export const VerifyToken = token => jwt.verify(token, JWT_SECRET);
