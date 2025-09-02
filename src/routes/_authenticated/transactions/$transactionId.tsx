import { createFileRoute } from '@tanstack/react-router'
import { TransactionDetail } from '@/features/transactions/transaction-detail'

export const Route = createFileRoute('/_authenticated/transactions/$transactionId')({ 
  component: () => <TransactionDetail />,
})