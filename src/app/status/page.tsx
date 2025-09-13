'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Server, ShieldCheck, Users, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';

type Status = 'operational' | 'degraded' | 'offline' | 'active' | 'inactive';

interface StatusData {
  service: { status: Status; description: string };
  api: { status: Status; description: string };
  users: { total: number; enabled: number; status: Status; description: string };
  lastChecked: string;
}

const StatusIndicator = ({ status }: { status: Status }) => {
  const statusConfig: Record<Status, { label: string; color: string; icon: React.ElementType }> = {
    operational: { label: 'Operational', color: 'bg-chart-2', icon: CheckCircle },
    active: { label: 'Active', color: 'bg-chart-2', icon: CheckCircle },
    degraded: { label: 'Degraded', color: 'bg-chart-4', icon: AlertTriangle },
    offline: { label: 'Offline', color: 'bg-destructive', icon: XCircle },
    inactive: { label: 'Inactive', color: 'bg-destructive', icon: XCircle },
  };

  const { label, color } = statusConfig[status] || statusConfig.degraded;

  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      <div className={cn('h-2.5 w-2.5 rounded-full', color)} />
      <span>{label}</span>
    </div>
  );
};

const StatusItem = ({ icon: Icon, title, status, description }: { icon: React.ElementType; title: string; status: Status; description: string }) => (
  <div className="flex items-start justify-between p-4 transition-colors duration-300 rounded-lg hover:bg-muted/50">
    <div className="flex items-center gap-4">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <StatusIndicator status={status} />
  </div>
);

export default function StatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/status');
      if (!res.ok) {
        throw new Error('Failed to fetch server status.');
      }
      const data = await res.json();
      setStatusData(data);
    } catch (e: any) {
      setError(e.message);
      setStatusData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const overallStatus: Status = statusData ? (statusData.service.status === 'active' && statusData.api.status === 'operational' && statusData.users.status === 'operational' ? 'operational' : statusData.service.status === 'inactive' ? 'offline' : 'degraded') : 'offline';
  
  const overallTitle = {
    operational: 'All Systems Operational',
    degraded: 'Some Systems Experiencing Issues',
    offline: 'Service is Offline',
  }[overallStatus];

  const overallIcon = {
    operational: <CheckCircle className="h-6 w-6 text-chart-2" />,
    degraded: <AlertTriangle className="h-6 w-6 text-chart-4" />,
    offline: <XCircle className="h-6 w-6 text-destructive" />,
  }[overallStatus];

  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Server Status</h1>
            <p className="text-muted-foreground">
                Live status updates for ScriptGuardian services.
            </p>
        </div>
        <Button onClick={fetchStatus} disabled={loading} variant="outline">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Refresh
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
            {loading ? (
                <Skeleton className="h-7 w-48" />
            ) : statusData ? (
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        {overallIcon}
                        {overallTitle}
                    </CardTitle>
                </div>
            ) : null}
        </CardHeader>
        {statusData && <CardContent className="text-sm text-muted-foreground">
            Last checked: {format(parseISO(statusData.lastChecked), "MMMM d, yyyy 'at' hh:mm:ss a")}
        </CardContent>}
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                        <Skeleton className="h-5 w-24" />
                    </div>
                    {i < 2 && <Separator />}
                  </div>
                ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center text-destructive">
                <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
                <p>{error}</p>
            </div>
          ) : statusData ? (
            <div>
              <StatusItem icon={ShieldCheck} title="Main Service" status={statusData.service.status} description={statusData.service.description} />
              <Separator />
              <StatusItem icon={Server} title="API Endpoints" status={statusData.api.status} description={statusData.api.description} />
              <Separator />
              <StatusItem icon={Users} title="User Accounts" status={statusData.users.status} description={statusData.users.description} />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
