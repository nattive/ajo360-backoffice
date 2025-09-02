import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { WalletRequestProvider } from './context/wallet-request-context'
import { WalletRequestDialogs } from './components/wallet-request-dialogs'
import { useState, useCallback } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useGetAllWithdrawals, useBulkWithdrawalAction } from '@/hooks/api-hooks/useAdmin'

export default function WalletRequests() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const { data: withdrawals = [], isLoading: isLoadingWithdrawals } = useGetAllWithdrawals()
  const bulkActionMutation = useBulkWithdrawalAction()

  const handleBulkAction = useCallback(async (action: 'approve' | 'reject', reason?: string) => {
    if (selectedRows.length === 0) {
      toast.error('Please select at least one withdrawal to process')
      return
    }

    try {
      const payload = {
        withdrawalIds: selectedRows,
        action,
        reason: reason || (action === 'approve' ? 'Bulk approval for verified accounts' : 'Failed verification checks'),
        ...(action === 'approve' && { processorReference: `BULK_APPROVAL_REF_${Date.now()}` })
      }
      
      await bulkActionMutation.mutateAsync(payload)
      setSelectedRows([])
      
    } catch (error) {
       toast.error(`Error ${action}ing withdrawals: ${error instanceof Error ? error.message : 'Unknown error'}`)
     }
   }, [selectedRows, bulkActionMutation])

  return (
    <WalletRequestProvider>
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
              Wallet Requests
            </h2>
            <p className='text-muted-foreground'>
              Manage withdrawal requests with bulk approve/reject actions.
            </p>
          </div>

          <div className='flex flex-col gap-2 sm:flex-row'>
            {selectedRows.length > 0 && (
              <>
                <Button 
                  onClick={() => handleBulkAction('approve', 'Bulk approval for verified accounts')}
                  disabled={selectedRows.length === 0 || bulkActionMutation.isPending}
                  className='bg-green-600 hover:bg-green-700'
                >
                  {bulkActionMutation.isPending ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <CheckCircle className='mr-2 h-4 w-4' />
                  )}
                  Bulk Approve ({selectedRows.length})
                </Button>
                <Button 
                  onClick={() => handleBulkAction('reject', 'Failed verification checks')}
                  disabled={selectedRows.length === 0 || bulkActionMutation.isPending}
                  variant='destructive'
                >
                  {bulkActionMutation.isPending ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <XCircle className='mr-2 h-4 w-4' />
                  )}
                  Bulk Reject ({selectedRows.length})
                </Button>
              </>
            )}
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {isLoadingWithdrawals ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading withdrawals...</p>
            </div>
          </div>
        ) : (
          <DataTable
            data={withdrawals}
            columns={columns}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
          />
        )}
        </div>
      </Main>

      <WalletRequestDialogs />
    </WalletRequestProvider>
  )
}