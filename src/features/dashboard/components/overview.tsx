import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from 'recharts'
import { DashboardDataType } from '@/schemas/adminSchemas'
import { formatCurrencyCompact } from '@/lib/currency'

interface OverviewProps {
  dashboardData?: DashboardDataType
}

// Sample monthly data - in a real app, this would come from the API
const monthlyData = [
  { name: 'Jan', revenue: 45000, transactions: 120 },
  { name: 'Feb', revenue: 52000, transactions: 145 },
  { name: 'Mar', revenue: 48000, transactions: 135 },
  { name: 'Apr', revenue: 61000, transactions: 180 },
  { name: 'May', revenue: 55000, transactions: 165 },
  { name: 'Jun', revenue: 67000, transactions: 200 },
]



export function Overview({ dashboardData }: OverviewProps) {
  // Create pie chart data from dashboard statistics
  const pieData = dashboardData?.users ? [
    {
      name: 'Active Users',
      value: dashboardData.users.activeCount,
      fill: '#34D399'
    },
    {
      name: 'Suspended Users', 
      value: dashboardData.users.suspendedCount,
      fill: '#F87171'
    },
    {
      name: 'Verified Users',
      value: dashboardData.users.verifiedCount,
      fill: '#60A5FA'
    },
    {
      name: 'Unverified Users',
      value: dashboardData.users.unverifiedCount,
      fill: '#FBBF24'
    }
  ] : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Revenue Chart */}
      <div className="min-h-0">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width='100%' height={200} className="min-h-[180px] sm:min-h-[200px]">
          <BarChart data={monthlyData}>
            <XAxis
              dataKey='name'
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrencyCompact(value)}
            />
            <Tooltip 
              formatter={(value) => [formatCurrencyCompact(Number(value)), 'Revenue']}
            />
            <Bar dataKey='revenue' radius={[4, 4, 0, 0]} fill='#34D399' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* User Distribution Pie Chart */}
      <div className="min-h-0">
        <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width='100%' height={200} className="min-h-[180px] sm:min-h-[200px]">
            <PieChart>
              <Pie
                data={pieData}
                cx='50%'
                cy='50%'
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey='value'
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Users']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
           <div className="flex items-center justify-center h-[200px] text-muted-foreground">
             <p>No user data available</p>
           </div>
         )}
      </div>
    </div>
  )
}
