import { useState } from 'react'
import { useAdmin } from '@/stores/adminStore'
import { ADMIN_PERMISSIONS } from '@/stores/adminStore'
import { useGetAdminDashboard } from '@/hooks/api-hooks/useAdmin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WithdrawalsManagement } from './components/withdrawals-management'

export default function AdminDashboard() {
  const { hasPermission } = useAdmin()
  const { data: dashboardData, isLoading, error } = useGetAdminDashboard()
  const [activeTab, setActiveTab] = useState('overview')

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-lg'>Loading admin dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-lg text-red-600'>Error loading dashboard data</div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Admin Dashboard</h1>
        <p className='text-muted-foreground'>
          Manage all aspects of the Ajo365 platform
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-4'
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          {hasPermission(ADMIN_PERMISSIONS.VIEW_WITHDRAWALS) && (
            <TabsTrigger value='withdrawals'>Withdrawals</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Users
                </CardTitle>
                <Badge variant='secondary'>Users</Badge>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {dashboardData?.userStats?.totalUsers || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  {dashboardData?.userStats?.activeUsers || 0} active users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Transactions
                </CardTitle>
                <Badge variant='secondary'>Transactions</Badge>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {dashboardData?.transactionStats?.totalTransactions || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  ₦
                  {(
                    dashboardData?.transactionStats?.totalAmount || 0
                  ).toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Savings
                </CardTitle>
                <Badge variant='secondary'>Savings</Badge>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {dashboardData?.savingsStats?.totalSavings || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  ₦
                  {(
                    dashboardData?.savingsStats?.totalInterest || 0
                  ).toLocaleString()}{' '}
                  interest
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Savings
                </CardTitle>
                <Badge variant='secondary'>Active</Badge>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {dashboardData?.savingsStats?.activeSavings || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Currently active savings plans
                </p>
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest platform activities and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='h-2 w-2 rounded-full bg-green-500'></div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>
                        New user registration
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        2 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>Withdrawal approved</p>
                      <p className='text-muted-foreground text-xs'>
                        5 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div className='h-2 w-2 rounded-full bg-yellow-500'></div>
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>
                        Interest calculation triggered
                      </p>
                      <p className='text-muted-foreground text-xs'>
                        10 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                {hasPermission(
                  ADMIN_PERMISSIONS.TRIGGER_INTEREST_CALCULATION
                ) && (
                  <Button variant='outline' className='w-full justify-start'>
                    Trigger Interest Calculation
                  </Button>
                )}
                {hasPermission(ADMIN_PERMISSIONS.TRIGGER_INTEREST_PAYOUT) && (
                  <Button variant='outline' className='w-full justify-start'>
                    Trigger Interest Payout
                  </Button>
                )}
                {hasPermission(ADMIN_PERMISSIONS.VIEW_WITHDRAWALS) && (
                  <Button variant='outline' className='w-full justify-start'>
                    Review Pending Withdrawals
                  </Button>
                )}
                {hasPermission(ADMIN_PERMISSIONS.CREATE_SAVINGS_PLANS) && (
                  <Button variant='outline' className='w-full justify-start'>
                    Create New Savings Plan
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {hasPermission(ADMIN_PERMISSIONS.VIEW_WITHDRAWALS) && (
          <TabsContent value='withdrawals'>
            <WithdrawalsManagement />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
