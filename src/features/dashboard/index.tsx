import { Link } from '@tanstack/react-router'
import { useGetUsers } from '@/hooks/api-hooks/useAuth'
import { useGetSavings } from '@/hooks/api-hooks/useSaving'
import { useGetUserWallet } from '@/hooks/api-hooks/useWallet'
import { useWalletsData } from '@/hooks/api-hooks/useWalletsData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'

export default function Dashboard() {
  const { data: wallets } = useGetUserWallet()
  const { data: users } = useGetUsers()
  const { data: savings } = useGetSavings()
  const { totalTransactions } = useWalletsData(true)

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
              <TabsTrigger value='overview'>Overview</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {/* Total Wallets */}
              <Link to='/wallets'>
                <Card className='cursor-pointer bg-emerald-50 transition-shadow hover:shadow-md'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-emerald-900'>
                      Total Wallets
                    </CardTitle>
                    <svg
                      className='h-4 w-4 text-emerald-700'
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
                    <div className='text-2xl font-bold text-emerald-900'>
                      {wallets?.length ?? 0}
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Total Users */}
              <Link to='/users'>
                <Card className='cursor-pointer bg-indigo-50 transition-shadow hover:shadow-md'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-indigo-900'>
                      Total Users
                    </CardTitle>
                    <svg
                      className='h-4 w-4 text-indigo-700'
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
                    <div className='text-2xl font-bold text-indigo-900'>
                      {users?.length ?? 0}
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Total Transactions */}
              <Link to='/wallets'>
                <Card className='cursor-pointer bg-yellow-50 transition-shadow hover:shadow-md'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-yellow-900'>
                      Total Transactions
                    </CardTitle>
                    <svg
                      className='h-4 w-4 text-yellow-700'
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
                    <div className='text-2xl font-bold text-yellow-900'>
                      {totalTransactions ?? 0}
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Total Savings Plan */}
              <Link to='/savings-plan'>
                <Card className='cursor-pointer bg-sky-50 transition-shadow hover:shadow-md'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium text-sky-900'>
                      Total Savings Plan
                    </CardTitle>
                    <svg
                      className='h-4 w-4 text-sky-700'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-sky-900'>
                      {savings?.length ?? 0}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-4'>
            <h1>Analytics</h1>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
