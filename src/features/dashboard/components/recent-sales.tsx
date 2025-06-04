import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import axios from '@/lib/axios'

interface Transaction {
  id: string
  amount: number
  type: 'credit' | 'debit'
  createdAt: string
  userId: string
  narration: string
  currency: string
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

export function RecentSales() {
  const [transactions, setTransactions] = useState<(Transaction & { user: User })[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRecentTransactions() {
      setLoading(true)
      try {
        const res = await axios.get<Wallet[]>('https://api.myajo360.com/wallets/all-wallets') 
        const wallets = res.data

        // Flatten transactions across all wallets
        const allTransactions = wallets.flatMap(wallet =>
          (wallet.transactions || []).map(txn => ({
            ...txn,
            user: wallet.user,
          }))
        )

        // Sort by date (descending)
        const sorted = allTransactions.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        // Take only latest 5 if more
        const latest = sorted.slice(0, 5)
        setTransactions(latest)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentTransactions()
  }, [])

  if (loading) {
    return <p>Loading recent transactions...</p>
  }

  if (!transactions.length) {
    return <p>No recent transactions found.</p>
  }

  return (
    <div className="space-y-8">
      {transactions.map(txn => {
        const initials = txn.user.fullName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()

        return (
          <div key={txn.id} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              {txn.user.profilePicture ? (
                <AvatarImage src={txn.user.profilePicture} alt={txn.user.fullName} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>

            <div className="flex flex-1 flex-wrap items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm leading-none font-medium">{txn.user.fullName}</p>
                <p className="text-muted-foreground text-sm">{txn.user.email}</p>
              </div>
              <div className="font-medium">
                {txn.type === 'credit' ? '+' : '-'}
                ₦{Number(txn.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
