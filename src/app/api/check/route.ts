import { NextResponse } from 'next/server';
import { getServiceStatus } from '@/lib/data';

export async function GET() {
  if (!getServiceStatus()) {
    return NextResponse.json({ status: 'error', message: 'Service is currently disabled by an administrator.' }, { status: 503 });
  }
  return NextResponse.json({ status: 'ok', message: 'Server is operational.' });
}
