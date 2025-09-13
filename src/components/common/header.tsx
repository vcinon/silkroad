
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        if (token) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('admin-token');
        setIsAdmin(false);
        router.push('/');
    };

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-headline">ScriptGuardian</span>
        </Link>
        <nav className="flex items-center gap-2">
            {isAdmin ? (
                 <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2" /> Logout
                 </Button>
            ) : (
                <Button asChild>
                    <Link href="/">Login</Link>
                </Button>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
