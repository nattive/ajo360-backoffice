import { Loader2, PiggyBank, Wallet } from 'lucide-react'
import { useGetSavings } from '@/hooks/api-hooks/useSaving'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { SavingsDialogs } from './components/savings-dialogs'
import { SavingsPrimaryButtons } from './components/savings-primary-buttons'
import SavingsProvider from './context/savings-context'

export default function Savings() {
  const { data: savings, isLoading } = useGetSavings()

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    )
  }

  return (
    <SavingsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        {/* Overview heading */}
        <h1 className='mb-4 text-3xl font-bold'>Overview</h1>

        {/* Cards */}
        <div className='mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
          {/* Total Number of Savings */}
          <Card className='bg-indigo-50'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-indigo-900'>
                Total Savings Plan
              </CardTitle>
              <PiggyBank className='h-5 w-5 text-indigo-700' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-indigo-900'>
                {savings?.length}
              </div>
            </CardContent>
          </Card>

          {/* Total Saved */}
          <Card className='bg-yellow-50'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-yellow-900'>
                Total Auto Saved
              </CardTitle>
              <Wallet className='h-5 w-5 text-yellow-700' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-yellow-900'>
                {savings?.filter((saving: { config: { user_can_auto_save: unknown } }) => saving.config?.user_can_auto_save)
                  .length ?? 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Heading and description */}
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Savings Plan Management
            </h2>
            <p className='text-muted-foreground'>
              List of all savings plan. Includes successful and failed wallets with
              failure and control (edit, update)
            </p>
          </div>
          <SavingsPrimaryButtons />
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable data={savings ?? []} columns={columns} />
        </div>
      </Main>
      <SavingsDialogs />
    </SavingsProvider>
  )
}
