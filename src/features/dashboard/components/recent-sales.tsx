import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useGetAllTransactions } from '@/hooks/api-hooks/useAdmin'
import { TransactionType } from '@/schemas/adminSchemas'
import { formatCurrency } from '@/lib/currency'

export function RecentSales() {
  const { data: transactionsResponse, isLoading } = useGetAllTransactions()
  
  const transactions = transactionsResponse?.data || []

  if (isLoading) {
    return <p>Loading recent transactions...</p>
  }

  if (!transactions.length) {
    return <p>No recent transactions found.</p>
  }

  return (
    <div className="space-y-8">
      {transactions.slice(0, 5).map((txn: TransactionType) => {
        const fullName = `${txn.user.firstName} ${txn.user.lastName}`
        const initials = fullName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()

        return (
          <div key={txn.id} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex flex-1 flex-wrap items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm leading-none font-medium">{fullName}</p>
                <p className="text-muted-foreground text-sm">{txn.user.email}</p>
              </div>
              <div className="font-medium">
                {txn.type === 'credit' ? '+' : '-'}
                {formatCurrency(txn.amount)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
