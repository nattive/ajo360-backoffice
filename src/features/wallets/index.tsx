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
import { AllTransactions } from './components/view-all-transactions'
import { WalletDialogs } from './components/wallet-dialogs'
import { WalletPrimaryButtons } from './components/wallet-primary-buttons'
import { WalletProvider } from './context/wallet-context'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useGetWallets } from '@/hooks/api-hooks/useWallet'
import { useState, useCallback } from 'react'
import { GetWalletsParams } from '@/api/wallet-api'

export default function Wallet() {
  const [params, setParams] = useState<GetWalletsParams>({
    page: 1,
    limit: 20,
  })
  
  const { data: walletsData, isLoading, error } = useGetWallets(params)
  const wallets = walletsData?.data || []
  const totalCount = walletsData?.totalCount || 0
  
  const handleParamsChange = useCallback((newParams: Partial<GetWalletsParams>) => {
    setParams(prev => ({ ...prev, ...newParams }))
  }, [])

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
        <div className='mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Wallet Management
            </h2>
            <p className='text-muted-foreground'>
              List of all wallets. Includes successful and failed wallets with
              failure reasons.
            </p>
          </div>

          <div className='flex flex-col gap-2 sm:flex-row'>
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
          {isLoading ? (
            <div className='flex h-64 items-center justify-center text-muted-foreground'>
              <p>Loading wallets...</p>
            </div>
          ) : error ? (
            <div className='flex h-64 items-center justify-center text-muted-foreground'>
              <p>Error loading wallets: {error.message}</p>
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={wallets} 
              totalCount={totalCount}
              params={params}
              onParamsChange={handleParamsChange}
            />
          )}
        </div>
      </Main>

      <WalletDialogs />
    </WalletProvider>
  )
}
