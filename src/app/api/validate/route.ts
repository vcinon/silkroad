import { NextResponse } from 'next/server';
import { getServiceStatus, findUserById } from '@/lib/data';
import { validateGameGuardianScript, ValidateGameGuardianScriptInput } from '@/ai/flows/validate-game-guardian-script';
import { z } from 'zod';

const validationSchema = z.object({
  scriptContent: z.string(),
  version: z.string().optional(),
  userId: z.string().optional(),
});

export async function POST(request: Request) {
  if (!getServiceStatus()) {
    return NextResponse.json({ status: 'error', message: 'Service is currently disabled by an administrator.' }, { status: 503 });
  }
  
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ status: 'error', message: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = validationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ status: 'error', message: 'Invalid request body.', issues: parsed.error.issues }, { status: 400 });
  }

  if (parsed.data.userId) {
    const user = await findUserById(parsed.data.userId);
    if (!user || !user.enabled) {
      return NextResponse.json({ status: 'error', message: 'User is not authorized or disabled.' }, { status: 403 });
    }
  }

  const aiInput: ValidateGameGuardianScriptInput = {
    ...parsed.data,
    timestamp: Date.now(),
  };

  try {
    const result = await validateGameGuardianScript(aiInput);
    if (!result.isValid) {
      return NextResponse.json({ status: 'error', ...result }, { status: 400 });
    }
    return NextResponse.json({ status: 'ok', ...result });
  } catch (error) {
    console.error('AI validation error:', error);
    return NextResponse.json({ status: 'error', message: 'An internal error occurred during validation.' }, { status: 500 });
  }
}
