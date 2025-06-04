import { createFileRoute } from '@tanstack/react-router'
import Wallet from '@/features/wallets'

export const Route = createFileRoute('/_authenticated/wallets/')({
  component: Wallet,
})
