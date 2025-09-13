
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/data';
import { UserManagementClient } from '../admin/dashboard/_components/user-management-client';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            router.replace('/');
        }
        setLoading(false);
    }, [router]);

    if (loading || !isAuthenticated) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and system settings.
        </p>
      </div>
      
      <UserManagementClient initialUsers={[]} />
    </div>
  );
}
