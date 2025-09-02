import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrencyCompact } from '@/lib/currency'
import { Activity, Clock, TrendingUp, BarChart3 } from 'lucide-react'

interface TransactionStatsProps {
  transactionStats: {
    totalAmount: number
    totalCount: number
    creditAmount: number
    creditCount: number
    debitAmount: number
    debitCount: number
  }
}

export function TransactionStats({ transactionStats }: TransactionStatsProps) {
  const {
    totalAmount,
    totalCount,
    creditAmount,
    creditCount,
    debitAmount,
    debitCount
  } = transactionStats

  const averageTransactionAmount = totalCount > 0 ? totalAmount / totalCount : 0
  // Mock data for missing variables - these should be calculated from actual data
  const pendingTransactions = 0
  const pendingRate = 0
  const totalTransactionVolume = totalAmount
  const transactionsThisMonth = totalCount
  const transactionVolumeThisMonth = totalAmount

  return (
    <div className="space-y-4">
      {/* Main Transaction Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Transactions */}
        <Card className="bg-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900">
              Total Transactions
            </CardTitle>
            <Activity className="h-4 w-4 text-slate-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Credit Transactions */}
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Credit Transactions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {creditCount.toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              {formatCurrencyCompact(creditAmount)} total
            </p>
          </CardContent>
        </Card>

        {/* Debit Transactions */}
        <Card className="bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900">
              Debit Transactions
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-red-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {debitCount.toLocaleString()}
            </div>
            <p className="text-xs text-red-600">
              {formatCurrencyCompact(debitAmount)} total
            </p>
          </CardContent>
        </Card>

        {/* Pending Transactions */}
        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {pendingTransactions.toLocaleString()}
            </div>
            <p className="text-xs text-yellow-600">
              {pendingRate.toFixed(1)}% pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Volume and Monthly Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Transaction Volume */}
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Volume
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrencyCompact(totalTransactionVolume)}
            </div>
          </CardContent>
        </Card>

        {/* Average Transaction Amount */}
        <Card className="bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Average Amount
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrencyCompact(averageTransactionAmount)}
            </div>
          </CardContent>
        </Card>

        {/* Transactions This Month */}
        <Card className="bg-indigo-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-900">
              This Month Count
            </CardTitle>
            <Activity className="h-4 w-4 text-indigo-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900">
              {transactionsThisMonth.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Volume This Month */}
        <Card className="bg-teal-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-900">
              This Month Volume
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-teal-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">
              {formatCurrencyCompact(transactionVolumeThisMonth)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}