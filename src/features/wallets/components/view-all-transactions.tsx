import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useGetAllTransactions } from '@/hooks/api-hooks/useAdmin'
import { TransactionType } from '@/schemas/adminSchemas'

export function AllTransactions() {
  const { data: transactionsResponse, isLoading } = useGetAllTransactions()
  
  const transactions = transactionsResponse?.data || []

  if (isLoading) {
    return <p className="text-center py-4">Loading transactions...</p>
  }

  if (!transactions.length) {
    return <p className="text-center py-4">No transactions found.</p>
  }

  const sorted = transactions.sort(
    (a: TransactionType, b: TransactionType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
      {sorted.map((txn: TransactionType) => {
        const fullName = `${txn.user.firstName} ${txn.user.lastName}`
        const initials = fullName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()

        return (
          <div key={txn.id} className="flex flex-col gap-2 border-b pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{fullName}</p>
                <p className="text-xs text-muted-foreground">{txn.user.email}</p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    txn.type === 'credit'
                      ? 'bg-green-100 text-green-700 border-green-300'
                      : 'bg-red-100 text-red-700 border-red-300'
                  }`}
                >
                  {txn.type.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="ml-12 text-sm text-muted-foreground space-y-1">
              <p>
                <strong>Amount:</strong>{' '}
                {txn.type === 'credit' ? '+' : '-'}₦
                {Number(txn.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </p>
              <p>
                <strong>Narration:</strong> {txn.description || 'N/A'}
              </p>
              <p>
                <strong>Date:</strong> {new Date(txn.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
