
import { ChevronUpIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EngagementCardProps {
  title: string;
  metric: string | number;
  description: string;
  progress: number;
  change?: number;
  icon: React.ReactNode;
}

export function EngagementCard({ title, metric, description, progress, change, icon }: EngagementCardProps) {
  return (
    <Card className="flow-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric}</div>
        <CardDescription>{description}</CardDescription>
        <Progress value={progress} className="h-1 mt-4" />
        {change !== undefined && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground pt-2">
            <ChevronUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500">{change}%</span>
            <span>from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
