import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CheckCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

interface SystemStatsProps {
  systemStats: {
    isHealthy: boolean
    lastUpdated: string
  }
}

export function SystemStats({ systemStats }: SystemStatsProps) {
  const {
    isHealthy,
    lastUpdated
  } = systemStats

  const lastUpdatedDate = new Date(lastUpdated)
  const isRecent = (Date.now() - lastUpdatedDate.getTime()) < 5 * 60 * 1000 // Less than 5 minutes

  return (
    <div className="space-y-4">
      {/* System Health */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {/* System Status */}
        <Card className={`${isHealthy ? 'bg-green-50' : 'bg-red-50'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isHealthy ? 'text-green-900' : 'text-red-900'}`}>
              System Status
            </CardTitle>
            {isHealthy ? (
              <CheckCircle className="h-4 w-4 text-green-700" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-700" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isHealthy ? 'text-green-900' : 'text-red-900'}`}>
              {isHealthy ? 'Healthy' : 'Issues Detected'}
            </div>
            <p className={`text-xs ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
              {isHealthy ? 'All systems operational' : 'Requires attention'}
            </p>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <Card className={`${isRecent ? 'bg-blue-50' : 'bg-yellow-50'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isRecent ? 'text-blue-900' : 'text-yellow-900'}`}>
              Last Updated
            </CardTitle>
            <Activity className={`h-4 w-4 ${isRecent ? 'text-blue-700' : 'text-yellow-700'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-bold ${isRecent ? 'text-blue-900' : 'text-yellow-900'}`}>
              {format(lastUpdatedDate, 'MMM dd, HH:mm')}
            </div>
            <p className={`text-xs ${isRecent ? 'text-blue-600' : 'text-yellow-600'}`}>
              {isRecent ? 'Recently updated' : 'Update pending'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}