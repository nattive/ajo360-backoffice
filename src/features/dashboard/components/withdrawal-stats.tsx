import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrencyCompact } from '@/lib/currency'
import { ArrowDownCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

interface WithdrawalStatsProps {
  withdrawalStats: {
    count: number
    totalAmount: number
    recentWithdrawals: Array<{
      id: string
      amount: number
      status: 'pending' | 'completed' | 'failed'
      createdAt: string
      userId: string
      userName?: string
    }>
  }
}

export function WithdrawalStats({ withdrawalStats }: WithdrawalStatsProps) {
  const { count, totalAmount, recentWithdrawals } = withdrawalStats
  const averageWithdrawal = count > 0 ? totalAmount / count : 0

  // Group recent withdrawals by status
  const pendingWithdrawals = recentWithdrawals.filter(w => w.status === 'pending')
  const completedWithdrawals = recentWithdrawals.filter(w => w.status === 'completed')
  const failedWithdrawals = recentWithdrawals.filter(w => w.status === 'failed')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'failed':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Withdrawals */}
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Withdrawals
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {count.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Total Amount */}
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Total Amount
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {formatCurrencyCompact(totalAmount)}
            </div>
          </CardContent>
        </Card>

        {/* Average Withdrawal */}
        <Card className="bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Average Amount
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-purple-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrencyCompact(averageWithdrawal)}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Recent Activity
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {recentWithdrawals.length}
            </div>
            <p className="text-xs text-orange-600">
              recent withdrawals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Pending */}
        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {pendingWithdrawals.length}
            </div>
            <p className="text-xs text-yellow-600">
              awaiting processing
            </p>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {completedWithdrawals.length}
            </div>
            <p className="text-xs text-green-600">
              successfully processed
            </p>
          </CardContent>
        </Card>

        {/* Failed */}
        <Card className="bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900">
              Failed
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {failedWithdrawals.length}
            </div>
            <p className="text-xs text-red-600">
              processing failed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Withdrawals List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>
          {recentWithdrawals.length > 0 ? (
            <div className="space-y-3">
              {recentWithdrawals.slice(0, 10).map((withdrawal) => (
                <div 
                  key={withdrawal.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(withdrawal.status)}
                    <div>
                      <div className="font-medium text-sm">
                        {withdrawal.userName || `User ${withdrawal.userId.slice(0, 8)}...`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(new Date(withdrawal.createdAt), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold">
                        {formatCurrencyCompact(withdrawal.amount)}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(withdrawal.status)}`}>
                        {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentWithdrawals.length > 10 && (
                <div className="text-center py-2">
                  <span className="text-sm text-gray-500">
                    Showing 10 of {recentWithdrawals.length} recent withdrawals
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ArrowDownCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No recent withdrawals</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}