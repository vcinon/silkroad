import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { findUserById, updateUser } from '@/lib/data';

type Action = 'enable' | 'disable' | 'promote' | 'demote';

export async function POST(request: Request, { params }: { params: { user_id: string; action: Action } }) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  const user = findUserById(params.user_id);
  if (!user) {
    return NextResponse.json({ status: 'error', message: 'User not found.' }, { status: 404 });
  }

  let updatedUser;
  switch (params.action) {
    case 'enable':
      updatedUser = updateUser(params.user_id, { enabled: true });
      break;
    case 'disable':
      updatedUser = updateUser(params.user_id, { enabled: false });
      break;
    case 'promote':
      updatedUser = updateUser(params.user_id, { role: 'admin' });
      break;
    case 'demote':
      updatedUser = updateUser(params.user_id, { role: 'user' });
      break;
    default:
      return NextResponse.json({ status: 'error', message: 'Invalid action.' }, { status: 400 });
  }

  if (!updatedUser) {
    return NextResponse.json({ status: 'error', message: 'Failed to update user.' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok', message: `User ${params.user_id} has been updated.`, user: updatedUser });
}
