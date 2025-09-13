import { NextResponse } from 'next/server';
import { getServiceStatus, getUsers } from '@/lib/data';

export const revalidate = 0; // Don't cache this route

export async function GET() {
  let apiCheckStatus: 'operational' | 'degraded' | 'offline' = 'operational';
  let apiCheckMessage = 'All systems normal.';

  const serviceEnabled = getServiceStatus();
  if (!serviceEnabled) {
    apiCheckStatus = 'offline';
    apiCheckMessage = 'Service is disabled by admin.';
  }
  
  const users = getUsers();
  const enabledUsers = users.filter(u => u.enabled).length;

  return NextResponse.json({
    service: {
      status: getServiceStatus() ? 'active' : 'inactive',
      description: getServiceStatus() ? 'The service is online and accepting requests.' : 'The service is currently offline for maintenance.',
    },
    api: {
      status: apiCheckStatus,
      description: apiCheckMessage,
    },
    users: {
      total: users.length,
      enabled: enabledUsers,
      status: users.length > 0 ? 'operational' : 'degraded',
      description: `${enabledUsers} of ${users.length} users are active.`,
    },
    lastChecked: new Date().toISOString(),
  });
}
