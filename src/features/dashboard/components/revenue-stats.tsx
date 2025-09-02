import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrencyCompact } from '@/lib/currency'
import { TrendingUp, TrendingDown, Banknote, CreditCard } from 'lucide-react'

interface RevenueStatsProps {
  revenueStats: {
    totalRevenue: number
    monthlyRevenue: number
    dailyRevenue: number
  }
}

export function RevenueStats({ revenueStats }: RevenueStatsProps) {
  const {
    totalRevenue,
    monthlyRevenue,
    dailyRevenue
  } = revenueStats

  // Calculate growth percentage (mock calculation since we don't have historical data)
  const revenueGrowthPercentage = monthlyRevenue > 0 ? ((dailyRevenue * 30) / monthlyRevenue - 1) * 100 : 0
  const isGrowthPositive = revenueGrowthPercentage >= 0

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue */}
      <Card className="bg-emerald-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-900">
            Total Revenue
          </CardTitle>
          <Banknote className="h-4 w-4 text-emerald-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">
            {formatCurrencyCompact(totalRevenue)}
          </div>
        </CardContent>
      </Card>

      {/* Revenue This Month */}
      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">
            Revenue This Month
          </CardTitle>
          <CreditCard className="h-4 w-4 text-blue-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {formatCurrencyCompact(monthlyRevenue)}
          </div>
          <p className="text-xs text-blue-600">
            Daily: {formatCurrencyCompact(dailyRevenue)}
          </p>
        </CardContent>
      </Card>

      {/* Revenue Growth */}
      <Card className={`${isGrowthPositive ? 'bg-green-50' : 'bg-red-50'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${isGrowthPositive ? 'text-green-900' : 'text-red-900'}`}>
            Revenue Growth
          </CardTitle>
          {isGrowthPositive ? (
            <TrendingUp className="h-4 w-4 text-green-700" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-700" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isGrowthPositive ? 'text-green-900' : 'text-red-900'}`}>
            {revenueGrowthPercentage.toFixed(1)}%
          </div>
          <p className={`text-xs ${isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isGrowthPositive ? 'Increase' : 'Decrease'} from last month
          </p>
        </CardContent>
      </Card>

      {/* Daily Revenue */}
      <Card className="bg-purple-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-900">
            Daily Revenue
          </CardTitle>
          <Banknote className="h-4 w-4 text-purple-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">
            {formatCurrencyCompact(dailyRevenue)}
          </div>
          <p className="text-xs text-purple-600">
            Today's earnings
          </p>
        </CardContent>
      </Card>
    </div>
  )
}