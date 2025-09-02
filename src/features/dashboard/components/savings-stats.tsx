import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrencyCompact } from '@/lib/currency'
import { PiggyBank, TrendingUp, Users, Building, User, Lock } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface SavingsStatsProps {
  savingsStats: {
    activeSavings: number
    ripeForWithdrawal: number
    totalSavings: number
    totalSavingsCount: number
    averageSavingsAmount: number
    groupSavingsTotal: number
    personalSavingsTotal: number
    businessSavingsTotal: number
    lockedSavingsTotal: number
  }
}

const COLORS = {
  group: '#8884d8',
  personal: '#82ca9d',
  business: '#ffc658',
  locked: '#ff7c7c'
}

export function SavingsStats({ savingsStats }: SavingsStatsProps) {
  const {
    activeSavings,
    ripeForWithdrawal,
    totalSavings,
    totalSavingsCount,
    averageSavingsAmount,
    groupSavingsTotal,
    personalSavingsTotal,
    businessSavingsTotal,
    lockedSavingsTotal
  } = savingsStats

  const withdrawalRate = totalSavings > 0 ? (ripeForWithdrawal / totalSavings * 100) : 0
  const activeRate = totalSavings > 0 ? (activeSavings / totalSavings * 100) : 0

  // Prepare data for pie chart
  const pieData = [
    { name: 'Group Savings', value: groupSavingsTotal, color: COLORS.group },
    { name: 'Personal Savings', value: personalSavingsTotal, color: COLORS.personal },
    { name: 'Business Savings', value: businessSavingsTotal, color: COLORS.business },
    { name: 'Locked Savings', value: lockedSavingsTotal, color: COLORS.locked }
  ].filter(item => item.value > 0)

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Savings */}
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Savings
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrencyCompact(totalSavings)}
            </div>
            <p className="text-xs text-blue-600">
              {totalSavingsCount} accounts
            </p>
          </CardContent>
        </Card>

        {/* Active Savings */}
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Active Savings
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {formatCurrencyCompact(activeSavings)}
            </div>
            <p className="text-xs text-green-600">
              {activeRate.toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        {/* Ripe for Withdrawal */}
        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">
              Ready to Withdraw
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {formatCurrencyCompact(ripeForWithdrawal)}
            </div>
            <p className="text-xs text-yellow-600">
              {withdrawalRate.toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        {/* Average Savings */}
        <Card className="bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Average Amount
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-purple-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrencyCompact(averageSavingsAmount)}
            </div>
            <p className="text-xs text-purple-600">
              per account
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Savings Breakdown */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Savings by Type Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Savings by Type</h3>
          <div className="grid gap-3">
            {/* Group Savings */}
            <Card className="bg-indigo-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-indigo-900">
                  Group Savings
                </CardTitle>
                <Users className="h-4 w-4 text-indigo-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-indigo-900">
                  {formatCurrencyCompact(groupSavingsTotal)}
                </div>
              </CardContent>
            </Card>

            {/* Personal Savings */}
            <Card className="bg-emerald-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-900">
                  Personal Savings
                </CardTitle>
                <User className="h-4 w-4 text-emerald-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-emerald-900">
                  {formatCurrencyCompact(personalSavingsTotal)}
                </div>
              </CardContent>
            </Card>

            {/* Business Savings */}
            <Card className="bg-amber-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-900">
                  Business Savings
                </CardTitle>
                <Building className="h-4 w-4 text-amber-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-amber-900">
                  {formatCurrencyCompact(businessSavingsTotal)}
                </div>
              </CardContent>
            </Card>

            {/* Locked Savings */}
            <Card className="bg-red-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-900">
                  Locked Savings
                </CardTitle>
                <Lock className="h-4 w-4 text-red-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-red-900">
                  {formatCurrencyCompact(lockedSavingsTotal)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatCurrencyCompact(value), 'Amount']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No savings data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}