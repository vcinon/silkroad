import Link from 'next/link';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-headline">ScriptGuardian</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/status" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Status
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
