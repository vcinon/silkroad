import { NextResponse } from 'next/server';
import { findUserByUsername, deleteUser } from '@/lib/data';
import { sendTelegramNotification } from '@/lib/telegram';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }
  
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Username and password are required.' }, { status: 400 });
  }

  const { username, password } = parsed.data;

  const user = await findUserByUsername(username);

  if (!user || user.password !== password) {
    return NextResponse.json({ message: 'Invalid username or password.' }, { status: 401 });
  }

  if (!user.enabled) {
    return NextResponse.json({ message: 'User account is disabled.' }, { status: 403 });
  }

  if (user.expiresAt && new Date(user.expiresAt) < new Date()) {
    await deleteUser(user.id);
    return NextResponse.json({ message: 'User account has expired and has been deleted.' }, { status: 403 });
  }

  const { password: _, ...userWithoutPassword } = user;

  
  // Send Telegram notification for successful login
  try {
    const message = `*User Logged In* 🟢\n\n*Username:* \`${user.username}\``;
    await sendTelegramNotification(message);
  } catch (error) {
      console.error("Failed to send Telegram notification for login:", error);
      // We don't want to fail the request if the notification fails, so we just log it.
  }

  return NextResponse.json({ user: userWithoutPassword });
}
