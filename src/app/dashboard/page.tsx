import { getUsers } from '@/lib/data';
import { UserManagementClient } from '../admin/dashboard/_components/user-management-client';

export const revalidate = 0; // Ensure data is fresh

export default async function DashboardPage() {
  // We fetch initial data on the server.
  // The client component will handle subsequent fetches and mutations.
  const users = getUsers();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and system settings.
        </p>
      </div>
      
      <UserManagementClient initialUsers={users} />
    </div>
  );
}
