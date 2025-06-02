import { createFileRoute } from '@tanstack/react-router'
import Savings from '@/features/savings-plan'

export const Route = createFileRoute('/_authenticated/savings-plan/')({
  component: Savings,
})

