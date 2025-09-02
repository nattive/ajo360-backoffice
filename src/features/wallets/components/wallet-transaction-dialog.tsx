import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Loader2 } from 'lucide-react'

import { TransactionType } from '@/schemas/adminSchemas'
import { formatCurrency, formatTransactionAmount } from '@/lib/currency'



interface ViewTransactionsDialogProps {
  isOpen: boolean
  onClose: () => void
  walletId: string | null
}

export function ViewTransactionsDialog({
  isOpen,
  onClose,
  walletId: _walletId,
}: ViewTransactionsDialogProps) {
  const [search, setSearch] = useState('')

  // Wallet transactions endpoint removed - no longer available
  const transactions: TransactionType[] = []
  const loading = false
  const error = null

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((txn: TransactionType) => {
      const query = search.toLowerCase()
      return (
        txn.type.toLowerCase().includes(query) ||
        txn.status.toLowerCase().includes(query) ||
        txn.description?.toLowerCase().includes(query)
      )
    })

    return filtered.sort(
      (a: TransactionType, b: TransactionType) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [transactions, search])

  const selectedWallet = transactions[0]?.wallet // Assuming wallet info comes with transactions

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
                {formatCurrency(selectedWallet?.balance || 0)}
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
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <p className='text-sm text-red-600'>Failed to load transactions. Please try again.</p>
          ) : filteredTransactions.length > 0 ? (
            <ScrollArea className='h-[58vh] pr-2'>
              <div className='space-y-4 pb-4'>
                {filteredTransactions.map((txn: TransactionType) => {
                  const isCredit = txn.type.toLowerCase() === 'credit'
                  const txnDate = new Date(txn.createdAt)
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
                            {formatTransactionAmount(Math.abs(Number(txn.amount)), isCredit ? 'credit' : 'debit')}
                          </div>
                        </div>
                        <div className='text-xs text-gray-400'>
                          Status: {txn.status}
                        </div>
                        {txn.description && (
                          <div className='mt-1 text-xs text-gray-500 italic'>
                            {txn.description}
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
