export const PORT = process.env.PORT || 3000;

// salt
export const SALT_WORK_FACTOR = 10;


export const JWT_SECRET = '2192xxx_sakiri_xxxx56978_xxx';

export const JWT_OPTIONS = {
  expiresIn: '7 days',
  audience: 'fb.sasa',
  issuer: 'sasa@gmail.com',
};
