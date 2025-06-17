import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Transaction {
  id: string
  amount: number
  type: 'credit' | 'debit'
  createdAt: string
  userId: string
  narration: string
  currency: string
  status: 'pending' | 'approved' | 'failed' | 'completed'
  reference: string
}

interface User {
  id: string
  fullName: string
  email: string
  profilePicture: string | null
}

interface Wallet {
  id: string
  user: User
  transactions: Transaction[]
}

export function RecentWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<(Transaction & { user: User })[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRecentWithdrawals() {
      setLoading(true)
      try {
        const res = await axios.get<Wallet[]>('https://api.myajo360.com/wallets/all-wallets')
        const wallets = res.data

        const allWithdrawals = wallets.flatMap(wallet =>
          (wallet.transactions || [])
            .filter(txn => txn.type === 'debit')
            .map(txn => ({
              ...txn,
              user: wallet.user,
            }))
        )

        const sorted = allWithdrawals.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        setWithdrawals(sorted.slice(0, 5))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch withdrawals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentWithdrawals()
  }, [])

  if (loading) return <p className="text-sm text-muted-foreground">Loading recent withdrawals...</p>
  if (!withdrawals.length) return <p className="text-sm text-muted-foreground">No recent withdrawals found.</p>

  return (
    <div className="space-y-4">
      {withdrawals.map(txn => {
        const initials = txn.user.fullName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()

        const statusClasses = {
          approved: 'bg-green-100 text-green-700',
          completed: 'bg-green-100 text-green-700',
          pending: 'bg-yellow-100 text-yellow-700',
          failed: 'bg-red-100 text-red-700',
        }

        return (
          <div
            key={txn.id}
            className="flex items-start gap-4 rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-900"
          >
            <Avatar className="h-12 w-12">
              {txn.user.profilePicture ? (
                <AvatarImage src={txn.user.profilePicture} alt={txn.user.fullName} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-base">{txn.user.fullName}</p>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    statusClasses[txn.status] || 'bg-gray-100 text-gray-700'
                  )}
                >
                  {txn.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{txn.user.email}</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-gray-700">Narration:</span>{' '}
                {txn.narration || 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-gray-700">Reference:</span>{' '}
                {txn.reference || 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-gray-700">Date:</span>{' '}
                {new Date(txn.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right font-semibold text-red-600 text-base min-w-[100px]">
              - ₦
              {Number(txn.amount).toLocaleString('en-NG', {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
