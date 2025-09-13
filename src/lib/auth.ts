
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'secret-admin-token';

export const checkAdminAuth = async (request: Request): Promise<boolean> => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  return token === ADMIN_TOKEN;
};
