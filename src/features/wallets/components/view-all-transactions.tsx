import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import axios from '@/lib/axios'
import { Badge } from '@/components/ui/badge'

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

export function AllTransactions() {
  const [transactions, setTransactions] = useState<(Transaction & { user: User })[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAllTransactions() {
      setLoading(true)
      try {
        const res = await axios.get<Wallet[]>('https://api.myajo360.com/wallets/all-wallets')
        const wallets = res.data

        const allTransactions = wallets.flatMap(wallet =>
          (wallet.transactions || []).map(txn => ({
            ...txn,
            user: wallet.user,
          }))
        )

        const sorted = allTransactions.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        setTransactions(sorted)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllTransactions()
  }, [])

  if (loading) {
    return <p>Loading all transactions...</p>
  }

  if (!transactions.length) {
    return <p>No transactions found.</p>
  }

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
      {transactions.map(txn => {
        const initials = txn.user.fullName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()

        return (
          <div key={txn.id} className="flex flex-col gap-2 border-b pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                {txn.user.profilePicture ? (
                  <AvatarImage src={txn.user.profilePicture} alt={txn.user.fullName} />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{txn.user.fullName}</p>
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
                {Number(txn.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}{' '}
                {txn.currency}
              </p>
              <p>
                <strong>Narration:</strong> {txn.narration || 'N/A'}
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
