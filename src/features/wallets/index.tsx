import { Loader2 } from 'lucide-react'
import { useGetUserWallet } from '@/hooks/api-hooks/useWallet'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { AllTransactions } from './components/view-all-transactions'
import { WalletDialogs } from './components/wallet-dialogs'
import { WalletPrimaryButtons } from './components/wallet-primary-buttons'
import { WalletProvider } from './context/wallet-context'

export default function Wallet() {
  const { data: wallets, isLoading } = useGetUserWallet()

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    )
  }

  return (
    <WalletProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Wallet Management
            </h2>
            <p className='text-muted-foreground'>
              List of all wallets. Includes successful and failed wallets with
              failure reasons.
            </p>
          </div>

          <div className='flex gap-2'>
            <WalletPrimaryButtons />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' className='shadow-sm'>
                  View All Transactions
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-full overflow-y-auto border-l bg-white px-6 py-6 sm:max-w-3xl dark:bg-[#1e1e2f]'
              >
                <SheetHeader className='mb-6'>
                  <SheetTitle className='text-2xl font-bold'>
                    All Transactions
                  </SheetTitle>
                  <SheetDescription>
                    This is a list of all transactions performed by all users on
                    the platform.
                  </SheetDescription>
                </SheetHeader>

                <div className='space-y-6'>
                  <AllTransactions />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable data={wallets ?? []} columns={columns} />
        </div>
      </Main>

      <WalletDialogs />
    </WalletProvider>
  )
}
