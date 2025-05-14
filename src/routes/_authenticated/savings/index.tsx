import Savings from '@/features/savings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/savings/')({
  component: Savings,
})
