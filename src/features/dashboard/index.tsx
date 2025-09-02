import { useGetAdminDashboard } from '@/hooks/api-hooks/useAdmin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { RevenueStats } from './components/revenue-stats'
import { UserStats } from './components/user-stats'
import { TransactionStats } from './components/transaction-stats'
import { SystemStats } from './components/system-stats'
import { SavingsStats } from './components/savings-stats'
import { UserFunnelChart } from './components/user-funnel-chart'
import { MonthlySavingsChart } from './components/monthly-savings-chart'
import { WithdrawalStats } from './components/withdrawal-stats'

// Mock data for components not in the actual dashboard API
const mockUserFunnelData = [
  { stage: 'Visitors', users: 10000, conversionRate: 100 },
  { stage: 'Sign-ups', users: 2500, conversionRate: 25 },
  { stage: 'Verified', users: 2000, conversionRate: 20 },
  { stage: 'First Deposit', users: 1500, conversionRate: 15 },
  { stage: 'Active Savers', users: 1200, conversionRate: 12 },
  { stage: 'Premium Users', users: 800, conversionRate: 8 }
]

const mockMonthlySavingsData = [
  { month: 'Jan', amount: 45000, count: 120 },
  { month: 'Feb', amount: 52000, count: 145 },
  { month: 'Mar', amount: 48000, count: 135 },
  { month: 'Apr', amount: 61000, count: 180 },
  { month: 'May', amount: 55000, count: 165 },
  { month: 'Jun', amount: 67000, count: 200 }
]

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useGetAdminDashboard()

  if (isLoading) {
    return (
      <>
        <Header>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='flex items-center justify-center h-64'>
            <div className='text-lg'>Loading dashboard...</div>
          </div>
        </Main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='flex items-center justify-center h-64'>
            <div className='text-lg text-red-600'>Error loading dashboard data</div>
          </div>
        </Main>
      </>
    )
  }

  return (
    <>
      {/* Top Heading */}
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* Main */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview' className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'>Overview</TabsTrigger>
              <TabsTrigger value='revenue' className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'>Revenue</TabsTrigger>
              <TabsTrigger value='users'>Users</TabsTrigger>
              <TabsTrigger value='transactions'>Transactions</TabsTrigger>
              <TabsTrigger value='savings'>Savings</TabsTrigger>
              <TabsTrigger value='system'>System</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Revenue
                  </CardTitle>
                  <svg
                    className='h-4 w-4 text-muted-foreground'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${dashboardData?.revenue?.totalRevenue?.toLocaleString() || '0'}</div>
                  <p className='text-xs text-muted-foreground'>
                    Monthly: ${dashboardData?.revenue?.monthlyRevenue?.toLocaleString() || '0'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
                  <svg
                    className='h-4 w-4 text-muted-foreground'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M16 3.13a4 4 0 0 1 0 7.75M8 3.13a4 4 0 0 0 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{dashboardData?.users?.totalCount?.toLocaleString() || '0'}</div>
                  <p className='text-xs text-muted-foreground'>
                    {dashboardData?.users?.verifiedCount || 0} verified users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Transactions
                  </CardTitle>
                  <svg
                    className='h-4 w-4 text-muted-foreground'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{dashboardData?.transactions?.totalCount?.toLocaleString() || '0'}</div>
                  <p className='text-xs text-muted-foreground'>
                    ${dashboardData?.transactions?.totalAmount?.toLocaleString() || '0'} total volume
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Active Savings</CardTitle>
                  <svg
                    className='h-4 w-4 text-muted-foreground'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5Z' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>${dashboardData?.savings?.totalAmount?.toLocaleString() || '0'}</div>
                  <p className='text-xs text-muted-foreground'>
                    {dashboardData?.savings?.totalCount || 0} total savings
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <div className='col-span-4'>
                <UserFunnelChart data={mockUserFunnelData} />
              </div>
              <div className='col-span-3'>
                <Overview />
              </div>
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <div className='col-span-4'>
                <RecentSales />
              </div>
              <div className='col-span-3'>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-8'>
                      <div className='flex items-center'>
                        <div className='ml-4 space-y-1'>
                          <p className='text-sm font-medium leading-none'>
                            System running smoothly
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            All services operational
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='revenue' className='space-y-4'>
            {dashboardData?.revenue && (
              <RevenueStats revenueStats={dashboardData.revenue} />
            )}
          </TabsContent>

          <TabsContent value='users' className='space-y-4'>
            {dashboardData?.users && (
              <UserStats userStats={dashboardData.users} />
            )}
          </TabsContent>

          <TabsContent value='transactions' className='space-y-4'>
            {dashboardData?.transactions && (
              <TransactionStats transactionStats={dashboardData.transactions} />
            )}
          </TabsContent>

          <TabsContent value='savings' className='space-y-4'>
            <div className='grid gap-4'>
              {dashboardData?.savings && (
                <SavingsStats savingsStats={{
                  activeSavings: dashboardData.savings.activeAmount,
                  ripeForWithdrawal: dashboardData.savings.completedAmount,
                  totalSavings: dashboardData.savings.totalAmount,
                  totalSavingsCount: dashboardData.savings.totalCount,
                  averageSavingsAmount: dashboardData.savings.totalCount > 0 ? dashboardData.savings.totalAmount / dashboardData.savings.totalCount : 0,
                  groupSavingsTotal: 0,
                  personalSavingsTotal: dashboardData.savings.activeAmount,
                  businessSavingsTotal: 0,
                  lockedSavingsTotal: dashboardData.savings.completedAmount
                }} />
              )}
              <MonthlySavingsChart monthlySavingsChart={mockMonthlySavingsData.map(item => ({ name: item.month, total: item.amount }))} />
            </div>
            {dashboardData?.withdrawals && (
               <WithdrawalStats 
                 withdrawalStats={{
                   count: dashboardData.withdrawals.totalCount,
                   totalAmount: dashboardData.withdrawals.totalAmount,
                   recentWithdrawals: []
                 }}
               />
             )}
          </TabsContent>

          <TabsContent value='system' className='space-y-4'>
            {dashboardData?.systemStatus && (
              <SystemStats systemStats={dashboardData.systemStatus} />
            )}
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
