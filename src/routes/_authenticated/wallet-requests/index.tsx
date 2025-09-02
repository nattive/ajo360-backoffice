import { createFileRoute } from '@tanstack/react-router'
import WalletRequests from '@/features/wallet-requests'

export const Route = createFileRoute('/_authenticated/wallet-requests/')({
  component: WalletRequests,
})