import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Power, FileJson } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Secure & Manage Your GameGuardian Scripts
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            ScriptGuardian provides a robust backend to control access, validate, and manage your scripts with ease. Focus on creating, we'll handle the security.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/status">Check Server Status</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Core Features</CardTitle>
                    <CardDescription>A suite of tools for total script control.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-chart-2" />
                        <p>Service Availability Checks</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-accent" />
                        <p>User-specific Authorization</p>
                    </div>
                     <div className="flex items-center gap-3">
                        <FileJson className="h-5 w-5 text-chart-5" />
                        <p>AI-Powered Script Validation</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Power className="h-5 w-5 text-destructive" />
                        <p>Admin Service & User Controls</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
