import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getUsers, addUser, User, updateUser } from '@/lib/data';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6).optional(),
  role: z.enum(['user', 'admin']),
  enabled: z.boolean(),
  expiresAt: z.string().datetime().optional().nullable(),
});


// GET all users
export async function GET(request: Request) {
  const auth = await checkAdminAuth(request);
  if (!auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const users = await getUsers();
  const usersWithoutPassword = users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
  });
  return NextResponse.json({ users: usersWithoutPassword });
}

// CREATE a new user
export async function POST(request: Request) {
  const auth = await checkAdminAuth(request);
  if (!auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ message: 'Invalid data', errors: validation.error.issues }, { status: 400 });
  }
  
  if (!validation.data.password) {
    return NextResponse.json({ message: 'Password is required for new users' }, { status: 400 });
  }

  const newUser = await addUser(validation.data as Omit<User, 'id'>);
  if (!newUser) {
    return NextResponse.json({ message: 'Failed to create user. The username might already exist.' }, { status: 500 });
  }
  
  const { password, ...userWithoutPassword } = newUser;

  return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
}
