import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface Transaction {
  createdAt: string
  id: string
  amount: number
  date: string
  type: string // 'credit' or 'debit'
  status: string
  narration?: string
}

interface Wallet {
  id: string
  accountName: string
  userId: string
  availableBalance: string
  createdAt: string
  updatedAt: string
  isLocked: boolean
  status: string
  transactions?: Transaction[]
}

interface ViewTransactionsDialogProps {
  isOpen: boolean
  onClose: () => void
  walletId: string | null
}

export function ViewTransactionsDialog({
  isOpen,
  onClose,
  walletId,
}: ViewTransactionsDialogProps) {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const selectedWallet = wallets.find((w) => w.id === walletId)
  const userId = selectedWallet?.userId
  const userWallets = wallets.filter((w) => w.userId === userId)

  const combinedTransactions: Transaction[] = userWallets
    .flatMap((w) => w.transactions ?? [])
    .sort(
      (a, b) =>
        new Date(b.date || b.createdAt || '').getTime() -
        new Date(a.date || a.createdAt || '').getTime()
    )

  const filteredTransactions = combinedTransactions.filter((txn) => {
    const query = search.toLowerCase()
    return (
      txn.type.toLowerCase().includes(query) ||
      txn.status.toLowerCase().includes(query) ||
      txn.narration?.toLowerCase().includes(query)
    )
  })

  useEffect(() => {
    if (!isOpen) return

    const fetchWallets = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://api.myajo360.com/wallets/all-wallets'
        )
        setWallets(response.data?.wallets || response.data || [])
        setError(null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError('Failed to fetch wallets')
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWallets()
  }, [isOpen])

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side='bottom'
        className='h-[90vh] w-full max-w-full rounded-t-2xl bg-white p-0 shadow-xl'
      >
        {/* 🔷 Full-width header and balance section */}
        <div className='w-full border-b border-gray-300 bg-[#f3f4f6] px-6 pt-6 pb-4 text-center'>
          <SheetHeader>
            <SheetTitle className='text-3xl font-extrabold tracking-tight text-gray-800'>
              {selectedWallet?.accountName || 'Wallet'} Transaction History
            </SheetTitle>
          </SheetHeader>

          {selectedWallet && (
            <div className='mt-4'>
              <div className='text-sm text-gray-500 uppercase'>
                Current Balance
              </div>
              <div className='text-4xl font-black tracking-wide text-gray-800'>
                ₦{Number(selectedWallet.availableBalance).toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* 🔍 Search Input */}
        <div className='mt-4 px-6'>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by type, status or narration...'
            className='w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>

        {/* 📃 Transactions List */}
        <div className='mt-4 px-6'>
          {loading ? (
            <p className='animate-pulse text-sm text-gray-500'>
              Loading transactions...
            </p>
          ) : error ? (
            <p className='text-sm text-red-600'>{error}</p>
          ) : filteredTransactions.length > 0 ? (
            <ScrollArea className='h-[58vh] pr-2'>
              <div className='space-y-4 pb-4'>
                {filteredTransactions.map((txn) => {
                  const isCredit = txn.type.toLowerCase() === 'credit'
                  const txnDate = new Date(txn.date || txn.createdAt || '')
                  const day = txnDate.getDate()
                  const month = txnDate.toLocaleString('default', {
                    month: 'short',
                  })

                  return (
                    <div
                      key={txn.id}
                      className={`relative rounded-xl border-l-4 bg-white shadow-sm ${
                        isCredit ? 'border-green-500' : 'border-red-500'
                      } flex items-start gap-4 p-4 transition-all hover:shadow-md`}
                    >
                      {/* 📅 Date Block */}
                      <div className='w-12 shrink-0 text-center'>
                        <div className='text-xl leading-none font-bold text-gray-800'>
                          {day}
                        </div>
                        <div className='text-xs text-gray-500 uppercase'>
                          {month}
                        </div>
                      </div>

                      {/* 💳 Transaction Info */}
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <div className='text-sm font-semibold text-gray-700 capitalize'>
                            {txn.type}
                          </div>
                          <div
                            className={`text-sm font-bold ${
                              isCredit ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {isCredit ? '+' : '-'}₦
                            {Math.abs(Number(txn.amount)).toLocaleString()}
                          </div>
                        </div>
                        <div className='text-xs text-gray-400'>
                          Status: {txn.status}
                        </div>
                        {txn.narration && (
                          <div className='mt-1 text-xs text-gray-500 italic'>
                            {txn.narration}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          ) : (
            <p className='text-muted-foreground text-sm'>
              No matching transactions found.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
