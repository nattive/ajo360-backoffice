import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TransactionsTable } from './components/transactions-table'
import { TransactionFilters } from './components/transaction-filters'
import { useGetAllTransactions } from '@/hooks/api-hooks/useAdmin'
import { GetTransactionsParams } from '@/api/admin-api'

export function Transactions() {
  const [filters, setFilters] = useState<GetTransactionsParams>({
    page: 1,
    limit: 10,
  })

  const { data: transactionsResponse, isLoading, error } = useGetAllTransactions(filters)
  const transactions = transactionsResponse?.data ?? []
  const metadata = transactionsResponse?.metadata

  const handleFiltersChange = (newFilters: Partial<GetTransactionsParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  return (
    <>
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Transaction Management</h2>
            <p className='text-muted-foreground'>
              Monitor and manage all platform transactions
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          <TransactionFilters 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
          
          <TransactionsTable
            data={transactions}
            metadata={metadata}
            isLoading={isLoading}
            error={error}
            onPageChange={handlePageChange}
            currentPage={filters.page || 1}
          />
        </div>
      </Main>
    </>
  )
}