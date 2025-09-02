import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrencyCompact } from '@/lib/currency'
import { TrendingUp, Calendar } from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

interface MonthlySavingsChartProps {
  monthlySavingsChart: Array<{
    name: string
    total: number
  }>
}

export function MonthlySavingsChart({ monthlySavingsChart }: MonthlySavingsChartProps) {
  // Calculate growth rate if we have multiple months
  const growthRate = monthlySavingsChart.length > 1 
    ? ((monthlySavingsChart[monthlySavingsChart.length - 1].total - monthlySavingsChart[0].total) / monthlySavingsChart[0].total) * 100
    : 0

  const totalSavings = monthlySavingsChart.reduce((sum, month) => sum + month.total, 0)
  const averageMonthlySavings = monthlySavingsChart.length > 0 
    ? totalSavings / monthlySavingsChart.length 
    : 0

  const currentMonthSavings = monthlySavingsChart[monthlySavingsChart.length - 1]?.total || 0

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean
    payload?: Array<{ value: number }>
    label?: string
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-blue-600">
            <span className="font-medium">Savings: </span>
            {formatCurrencyCompact(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Current Month */}
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Current Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatCurrencyCompact(currentMonthSavings)}
            </div>
            <p className="text-xs text-blue-600">
              {monthlySavingsChart[monthlySavingsChart.length - 1]?.name || 'No data'}
            </p>
          </CardContent>
        </Card>

        {/* Average Monthly */}
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Monthly Average
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {formatCurrencyCompact(averageMonthlySavings)}
            </div>
            <p className="text-xs text-green-600">
              across {monthlySavingsChart.length} month{monthlySavingsChart.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        {/* Growth Rate */}
        <Card className={`${growthRate >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${growthRate >= 0 ? 'text-emerald-900' : 'text-red-900'}`}>
              Growth Rate
            </CardTitle>
            <TrendingUp className={`h-4 w-4 ${growthRate >= 0 ? 'text-emerald-700' : 'text-red-700'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${growthRate >= 0 ? 'text-emerald-900' : 'text-red-900'}`}>
              {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </div>
            <p className={`text-xs ${growthRate >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {monthlySavingsChart.length > 1 ? 'vs first month' : 'Need more data'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Savings - Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlySavingsChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySavingsChart}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatCurrencyCompact(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="total" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-80"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No savings data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Trend - Line Chart</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlySavingsChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySavingsChart}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatCurrencyCompact(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No savings data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      {monthlySavingsChart.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium text-gray-900">Month</th>
                    <th className="text-right py-2 px-4 font-medium text-gray-900">Total Savings</th>
                    <th className="text-right py-2 px-4 font-medium text-gray-900">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySavingsChart.map((month, index) => {
                    const previousMonth = index > 0 ? monthlySavingsChart[index - 1] : null
                    const monthGrowth = previousMonth 
                      ? ((month.total - previousMonth.total) / previousMonth.total) * 100
                      : 0

                    return (
                      <tr key={month.name} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4 font-medium">{month.name}</td>
                        <td className="py-2 px-4 text-right font-mono">
                          {formatCurrencyCompact(month.total)}
                        </td>
                        <td className="py-2 px-4 text-right">
                          {index === 0 ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <span className={`font-medium ${
                              monthGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {monthGrowth >= 0 ? '+' : ''}{monthGrowth.toFixed(1)}%
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}