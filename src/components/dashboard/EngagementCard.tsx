import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EngagementMetric {
  label: string;
  value: number;
  total: number;
  change?: number;
  icon: React.ReactNode;
}

interface EngagementCardProps {
  metrics: EngagementMetric[];
  title?: string;
  description?: string;
}

export function EngagementCard({ 
  metrics, 
  title = "Your Engagement", 
  description = "Track your activity and engagement with the community"
}: EngagementCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {metric.value} of {metric.total}
                      {metric.change !== undefined && (
                        <span className={`ml-2 ${metric.change > 0 ? 'text-green-500' : metric.change < 0 ? 'text-red-500' : ''}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  {Math.round((metric.value / metric.total) * 100)}%
                </p>
              </div>
              <Progress value={(metric.value / metric.total) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}