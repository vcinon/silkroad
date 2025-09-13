import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { findUserById, updateUser, deleteUser, User } from '@/lib/data';
import { z } from 'zod';

const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  password: z.string().min(6).optional().or(z.literal('')),
  role: z.enum(['user', 'admin']).optional(),
  enabled: z.boolean().optional(),
  expiresAt: z.string().datetime().optional().nullable(),
});

// GET a single user
export async function GET(request: Request, { params }: { params: { user_id: string } }) {
    const auth = await checkAdminAuth(request);
    if (!auth) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const user = findUserById(params.user_id);
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
}


// UPDATE a user
export async function PUT(request: Request, { params }: { params: { user_id: string } }) {
  const auth = await checkAdminAuth(request);
  if (!auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const user = findUserById(params.user_id);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const body = await request.json();
  const validation = updateUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ message: 'Invalid data', errors: validation.error.issues }, { status: 400 });
  }
  
  const updates = validation.data;
  // Don't update password if it's an empty string
  if (updates.password === '') {
    delete updates.password;
  }
  
  const updatedUser = updateUser(params.user_id, updates as Partial<Omit<User, 'id'>>);

  if (!updatedUser) {
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }

  const { password, ...userWithoutPassword } = updatedUser;
  return NextResponse.json({ user: userWithoutPassword });
}

// DELETE a user
export async function DELETE(request: Request, { params }: { params: { user_id: string } }) {
    const auth = await checkAdminAuth(request);
    if (!auth) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const success = deleteUser(params.user_id);
    if (!success) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
}
