import { FunnelChart } from 'react-funnel-pipeline';
import 'react-funnel-pipeline/dist/index.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface UserFunnelData {
  stage: string;
  users: number;
  conversionRate: number;
}

interface UserFunnelChartProps {
  data: UserFunnelData[];
}

export function UserFunnelChart({ data }: UserFunnelChartProps) {
  // Transform data for react-funnel-pipeline
  const chartData = data.map((item) => ({
    name: item.stage,
    value: item.users,
  }));

  // Calculate overall conversion rate
  const totalUsers = data[0]?.users || 0;
  const convertedUsers = data[data.length - 1]?.users || 0;
  const overallConversionRate = totalUsers > 0 ? (convertedUsers / totalUsers) * 100 : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          User Conversion Funnel
          <Badge variant="outline" className="ml-2">
            {overallConversionRate.toFixed(1)}% Overall
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-80 flex justify-center">
            <FunnelChart
              data={chartData}
              showValues={true}
              showNames={false}
              chartWidth={800}
              chartHeight={300}
              heightRelativeToValue={true}
              pallette={['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {data.map((stage, index) => {
              const isLast = index === data.length - 1;
              const nextStage = data[index + 1];
              const dropOffRate = !isLast && nextStage 
                ? ((stage.users - nextStage.users) / stage.users) * 100 
                : 0;
              
              return (
                <div key={stage.stage} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <p className="text-sm font-medium">{stage.stage}</p>
                    <p className="text-xs text-muted-foreground">{stage.users.toLocaleString()} users</p>
                  </div>
                  {!isLast && (
                    <div className="flex items-center text-xs">
                      {dropOffRate > 0 ? (
                        <>
                          <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                          <span className="text-red-500">{dropOffRate.toFixed(1)}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-green-500">0%</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}