import { createFileRoute } from '@tanstack/react-router'
import { SavingDetailPage } from '@/features/admin-savings/saving-details-page'

export const Route = createFileRoute('/_authenticated/savings/$savingId')({
  component: SavingDetailPage,
})