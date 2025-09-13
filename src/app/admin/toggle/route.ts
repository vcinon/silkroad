import { NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';
import { getServiceStatus, toggleServiceStatus } from '@/lib/data';

export async function POST() {
  if (!checkAdminAuth()) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }
  
  toggleServiceStatus();
  const newStatus = getServiceStatus() ? 'enabled' : 'disabled';
  return NextResponse.json({ status: 'ok', message: `Service has been ${newStatus}.` });
}
