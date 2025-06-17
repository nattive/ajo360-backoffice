import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { VerifyOtpForm } from '@/features/auth/otp/components/verify-otp'

export const Route = createFileRoute('/(auth)/verify-otp')({
  // Validate that 'email' is passed as a query param and is a valid email
  validateSearch: z.object({
    email: z.string().email(),
  }),
  component: VerifyOtpForm,
})

