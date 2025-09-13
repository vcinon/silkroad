import { NextResponse } from 'next/server';
import { getServiceStatus, findUserById } from '@/lib/data';

export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  if (!getServiceStatus()) {
    return NextResponse.json({ status: 'error', message: 'Service is currently disabled by an administrator.' }, { status: 503 });
  }
  const user = findUserById(params.user_id);
  
  if (!user) {
    return NextResponse.json({ status: 'error', message: 'User not found.' }, { status: 404 });
  }
  
  if (!user.enabled) {
    return NextResponse.json({ status: 'error', message: 'User account is disabled.' }, { status: 403 });
  }
  
  if (user.expiresAt && new Date(user.expiresAt) < new Date()) {
      return NextResponse.json({ status: 'error', message: 'User account has expired.' }, { status: 403 });
  }

  const { password, ...userWithoutPassword } = user;
  return NextResponse.json({ status: 'ok', message: 'User is authorized.', user: userWithoutPassword });
}
