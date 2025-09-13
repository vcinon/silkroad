import { headers } from 'next/headers';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'secret-admin-token';

export const checkAdminAuth = (): boolean => {
  const authHeader = headers().get('Authorization');
  if (!authHeader) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  return token === ADMIN_TOKEN;
};
