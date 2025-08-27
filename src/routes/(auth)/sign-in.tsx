import { createFileRoute } from '@tanstack/react-router'
import AdminSignIn from '@/features/auth/admin-sign-in'

export const Route = createFileRoute('/(auth)/sign-in')({
  component: AdminSignIn,
})
